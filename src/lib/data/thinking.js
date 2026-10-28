/**
 * "Product Thinking" — feature concepts for apps people already use.
 *
 * Each entry is one card in ThinkingSection.svelte and links to its own
 * /work/<slug> page. Keep `problem` to one sentence; the card is a teaser.
 * `preview` picks the little illustration on the card ('threads' for now).
 */
export const thinkingIntro = 'Problems I notice in apps I use every day, and how I’d fix them.';

export const concepts = [
	{
		title: 'Threads for group chats',
		app: 'WhatsApp',
		problem: 'In a 50-person group, a trip plan, match talk and a birthday gift all get mixed up in one stream.',
		idea: 'Optional, Reddit-style reply threads that collapse to a reply count.',
		period: 'Oct 2026 · Concept',
		href: '/work/whatsapp-threads',
		preview: 'threads'
	}
];
