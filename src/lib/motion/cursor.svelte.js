/**
 * Shared custom-cursor state + a `use:cursorLabel` action.
 *
 *   <a use:cursorLabel={'Nudge — Fintech App'}> … </a>
 *
 * The <CustomCursor> component (mounted once in the layout) reads `cursor.label`
 * and shows the orange dot / labelled pill. On touch / coarse pointers the
 * component bails out and the native cursor is left alone.
 */

class Cursor {
	/** current hover label, '' when not over a tagged element */
	label = $state('');
	/** optional visual variant, e.g. 'view' | 'link' */
	variant = $state('');

	setLabel(text, variant = '') {
		this.label = text ?? '';
		this.variant = variant;
	}
	clear(text) {
		// only clear if we're still the active label (guards fast enter/leave)
		if (text === undefined || this.label === text) {
			this.label = '';
			this.variant = '';
		}
	}
}

export const cursor = new Cursor();

/**
 * Svelte action. Accepts a string, or `{ label, variant }`.
 * @param {HTMLElement} node
 * @param {string | { label: string, variant?: string }} param
 */
export function cursorLabel(node, param) {
	let { label, variant } = normalise(param);

	const enter = () => cursor.setLabel(label, variant);
	const leave = () => cursor.clear(label);

	node.addEventListener('pointerenter', enter);
	node.addEventListener('pointerleave', leave);
	node.addEventListener('pointerdown', leave); // don't trail a pill through a click

	return {
		update(next) {
			const prev = label;
			({ label, variant } = normalise(next));
			if (cursor.label === prev) cursor.setLabel(label, variant);
		},
		destroy() {
			node.removeEventListener('pointerenter', enter);
			node.removeEventListener('pointerleave', leave);
			node.removeEventListener('pointerdown', leave);
			cursor.clear(label);
		}
	};
}

function normalise(param) {
	if (typeof param === 'string') return { label: param, variant: '' };
	return { label: param?.label ?? '', variant: param?.variant ?? '' };
}
