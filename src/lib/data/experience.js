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
		tag: 'Freelance',
		logo: '/img/experience/manino.png',
		points: [
			'Audited an existing messy app',
			'Researched Reddit for real pain points',
			'Cut 200+ tags to 20',
			'Simplified core expense and spending flows',
			'Reduced steps in everyday actions',
			'Proposed new Goals and Budgets features',
			'Defined logic for each feature',
			'Scoped work to UX only'
		],
		period: '',
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
