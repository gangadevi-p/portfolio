/**
 * chat-render.js — turns one assistant reply into renderable segments for
 * PortfolioAssistant.svelte: sanitized markdown HTML, and any ```chart
 * fenced blocks the model used to visualize numbers (see ChartBlock.svelte).
 *
 * Markdown parsing (marked) is safe to run on the server too, but sanitizing
 * needs a real DOM, so on the server (only ever rendering the hardcoded,
 * trusted welcome message) it's skipped.
 */
import { marked } from 'marked';
import DOMPurify from 'dompurify';

marked.setOptions({ breaks: true, gfm: true });

const ALLOWED_TAGS = [
	'p', 'br', 'strong', 'b', 'em', 'i', 'a', 'ul', 'ol', 'li', 'code', 'pre', 'blockquote', 'h4', 'hr'
];
const ALLOWED_ATTR = ['href', 'title'];

/** Only usable in the browser (needs a real DOM); the server only ever
 *  renders the hardcoded, trusted welcome message, so it can skip this. */
const purify = typeof window !== 'undefined' ? DOMPurify : null;
purify?.addHook('afterSanitizeAttributes', (node) => {
	if (node.tagName === 'A') {
		node.setAttribute('target', '_blank');
		node.setAttribute('rel', 'noopener noreferrer');
	}
});

function toSafeHtml(markdownText) {
	const raw = marked.parse(markdownText);
	if (!purify) return { type: 'html', html: raw };
	return { type: 'html', html: purify.sanitize(raw, { ALLOWED_TAGS, ALLOWED_ATTR }) };
}

const CHART_TYPES = new Set(['bar', 'donut']);

/** Parse and validate a fenced ```chart block's JSON body. Returns null if unusable. */
function parseChartSpec(raw) {
	let data;
	try {
		data = JSON.parse(raw);
	} catch {
		return null;
	}
	if (!data || !CHART_TYPES.has(data.type)) return null;
	if (!Array.isArray(data.labels) || !Array.isArray(data.values)) return null;
	if (data.labels.length === 0 || data.labels.length !== data.values.length) return null;

	const labels = data.labels.slice(0, 8).map((l) => String(l).slice(0, 40));
	const values = data.values.slice(0, 8).map(Number);
	if (values.some((v) => !Number.isFinite(v) || v < 0)) return null;
	if (values.every((v) => v === 0)) return null;

	return {
		type: data.type,
		title: typeof data.title === 'string' ? data.title.slice(0, 80) : '',
		unit: typeof data.unit === 'string' ? data.unit.slice(0, 12) : '',
		labels,
		values
	};
}

const CHART_BLOCK_RE = /```chart\s*\n([\s\S]*?)```/g;

/**
 * Split a reply into an ordered list of { type: 'html', html } and
 * { type: 'chart', spec } segments.
 */
export function parseMessageSegments(text) {
	const segments = [];
	let lastIndex = 0;
	let match;

	CHART_BLOCK_RE.lastIndex = 0;
	while ((match = CHART_BLOCK_RE.exec(text))) {
		const before = text.slice(lastIndex, match.index);
		if (before.trim()) segments.push(toSafeHtml(before));

		const spec = parseChartSpec(match[1]);
		segments.push(spec ? { type: 'chart', spec } : toSafeHtml(match[0]));

		lastIndex = CHART_BLOCK_RE.lastIndex;
	}

	const rest = text.slice(lastIndex);
	if (rest.trim() || segments.length === 0) segments.push(toSafeHtml(rest));

	return segments;
}
