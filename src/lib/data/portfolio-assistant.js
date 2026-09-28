/**
 * portfolio-assistant.js — the adapter behind the on-site "Portfolio guide".
 *
 * The real answers now come from /api/chat — a server route that calls an
 * LLM with tools over the portfolio's own data (see
 * src/lib/server/chat-tools.js). `getPortfolioAnswer` below is kept only as
 * an offline fallback for when that request fails (no key configured,
 * network error, etc.), so the widget still says something useful.
 */
import { knowledge, fallback } from './profile.js';

export const assistantWelcome =
	"Hi — I’m Gangadevi’s portfolio guide. Ask me about her design approach, skills, selected work, experience, or whether she’s a fit for your team.";

export const assistantPrompts = [
	'Who is she as a designer?',
	'What’s her design process?',
	'What are her strongest skills?',
	'Tell me about her work',
	'Why hire Gangadevi?'
];

/** Mirrors MAX_USER_MESSAGES in src/routes/api/chat/+server.js. */
export const MAX_USER_MESSAGES = 35;

/**
 * Send the full conversation so far (including the new user turn) to the
 * LLM-backed endpoint and return its reply.
 * @param {{role: 'user'|'assistant', content: string}[]} history
 * @returns {Promise<string>}
 */
export async function askPortfolioAssistant(history) {
	const res = await fetch('/api/chat', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ messages: history })
	});

	const data = await res.json().catch(() => ({}));

	if (res.status === 429) {
		const err = new Error(data.message || `You've reached the ${MAX_USER_MESSAGES}-message limit.`);
		err.limitReached = true;
		throw err;
	}
	if (!res.ok) {
		throw new Error(data.message || 'Request failed');
	}
	return data.reply;
}

/** words too common to carry meaning when scoring a question */
const STOP_WORDS = new Set([
	'the', 'a', 'an', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'to', 'of',
	'in', 'on', 'for', 'and', 'or', 'her', 'his', 'she', 'he', 'they', 'them',
	'i', 'you', 'we', 'me', 'my', 'your', 'their', 'about', 'tell', 'give', 'show',
	'what', 'whats', 'can', 'could', 'would', 'please', 'with', 'as', 'at', 'by',
	'from', 'more', 'some', 'any', 'this', 'that', 'these', 'those', 'it', 'be',
	'how', 'why', 'who', 'when', 'where', 'which', 'am', 'so', 'if', 'not', 'know',
	'gangadevi', 'gangadevis', 'she', 'hers'
]);

/** "What are HER skills?" → ["what","skills"] → "what" is a stop word → ["skills"] */
function tokenize(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, ' ')
		.split(/\s+/)
		.filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

/** true when the two words are equal ignoring a trailing plural "s" on either */
function sameWord(a, b) {
	if (a === b) return true;
	if (a.length > 3 && a.replace(/s$/, '') === b) return true;
	if (b.length > 3 && b.replace(/s$/, '') === a) return true;
	return false;
}

/**
 * Score every knowledge entry against the question and return the best answer.
 *  - an exact (plural-insensitive) tag hit is worth 3
 *  - a longer-word substring hit either direction is worth 1
 * A best score below 3 means no tag actually matched → the fallback, which
 * still points the visitor somewhere useful.
 */
export function getPortfolioAnswer(question) {
	const words = tokenize(String(question || ''));
	if (words.length === 0) return fallback;

	let best = null;
	let bestScore = 0;

	for (const entry of knowledge) {
		let score = 0;
		for (const word of words) {
			if (entry.tags.some((tag) => sameWord(tag, word))) {
				score += 3;
			} else if (
				word.length >= 4 &&
				entry.tags.some((tag) => tag.length >= 4 && (tag.includes(word) || word.includes(tag)))
			) {
				score += 1;
			}
		}
		if (score > bestScore) {
			bestScore = score;
			best = entry;
		}
	}

	return bestScore >= 3 ? best.text : fallback;
}
