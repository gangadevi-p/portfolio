/**
 * Work-experience cards (dark section — see WorkExperienceSection.svelte).
 *
 * Drop a square company logo in /static/img/experience/ (PNG or SVG) and point
 * `logo` at it. Until the file exists, the card shows a monogram fallback.
 *
 * Each card renders either `points` (a short list) or `blurb` (a sentence).
 * `href` is optional — when set, the date pill becomes an outbound link.
 */
export const experience = [
	{
		company: 'Manino',
		role: 'Product Designer',
		logo: '/img/experience/manino.png',
		blurb: 'Designed end-to-end product — flows, visuals, UX and problem solving.',
		period: 'May 2026 – July 2026',
		href: ''
	},
	{
		company: 'Geekbull',
		role: 'UIUX Design Intern',
		logo: '/img/experience/geekbull.png',
		points: ['HRMS Platform', 'Pixer data', 'Chatbot'],
		period: 'Nov 2024 – Feb 2025',
		href: ''
	},
	{
		company: 'ADM Education Society',
		role: 'Graphic Design Intern',
		logo: '/img/experience/adm.png',
		blurb: 'Social-media poster designing for their organization.',
		period: 'May 2024 – June 2024',
		href: ''
	}
];
