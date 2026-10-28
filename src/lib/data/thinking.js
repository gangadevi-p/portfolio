/**
 * "Product Thinking" — feature concepts for apps people already use.
 *
 * Each entry is one card in ThinkingSection.svelte and links to its own
 * /work/<slug> page. Keep `problem` to one sentence; the card is a teaser.
 * `preview` picks the little illustration on the card ('threads' or 'pickup').
 * `tone` colours the app label: its text and background.
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
		preview: 'threads',
		tone: { ink: '#008069', bg: '#e7f6f1' }
	},
	{
		title: 'Spot your ride in a crowd',
		app: 'Uber',
		problem: 'At a busy metro exit every auto looks the same, and the driver can’t tell which person booked the ride.',
		idea: 'A real photo of your vehicle for riders, and a photo of the pickup spot for drivers.',
		period: 'Oct 2026 · Concept',
		href: '/work/uber-pickup',
		preview: 'pickup',
		tone: { ink: '#ffffff', bg: '#000000' }
	}
];
