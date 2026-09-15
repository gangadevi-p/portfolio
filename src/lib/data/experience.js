/**
 * Work-experience cards (dark section — see WorkExperienceSection.svelte).
 *
 * Drop a square company logo in /static/img/experience/ (PNG or SVG) and point
 * `logo` at it. Until the file exists, the card shows a monogram fallback.
 *
 * Each card renders either `points` (a short list) or `blurb` (a sentence).
 * `href` is optional — when set, the date pill becomes a link. A path starting
 * with "/" opens in-page; any other URL opens in a new tab.
 */
export const experience = [
	{
		company: 'Manino',
		role: 'Product & UX Designer',
		project: '(Expense Tracker)',
		summary: 'Focused on core UX flows and experience.',
		status: 'Under development',
		logo: '/img/experience/manino.png',
		points: [
			'Simplified complex findings into clear insights',
			'Streamlined expense-adding flow, cutting friction',
			'Cut 239 tags to 21 for simpler categorization',
			'Built clean, scalable information architecture',
			'Prioritized core needs, trimmed the rest'
		],
		period: 'May 2026 – July 2026',
		href: ''
	},
	{
		company: 'Geekbull Consultancy — Hyderabad (Onsite)',
		role: 'UIUX Design Intern',
		logo: '/img/experience/geekbull-hd.png',
		points: ['HRMS Platform', 'Pixer data', 'Chatbot'],
		period: 'Nov 2024 – Feb 2025',
		href: '/work/geekbull'
	},
	{
		company: 'ADM Educational Welfare Society (Remote)',
		role: 'Graphic Design Intern',
		logo: '/img/experience/adm-clean.png',
		blurb: 'Social-media poster designing for their organization.',
		period: 'May 2024 – June 2024',
		href: '/work/adm-education-society'
	}
];
