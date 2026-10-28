/**
 * Résumé — the /resume page is built from this, and its download button
 * serves `resumeUrl`. Keep it in step with the PDF whenever either changes.
 *
 * `points` may use <b> for the odd figure worth spotting at a glance.
 * `href`   — optional. A path starting with "/" opens a case study on this
 *            site; any other URL opens in a new tab.
 * `logo`   — optional. Without one the entry shows a monogram tile.
 */
export const resume = {
	/** the original PDF */
	resumeUrl: '/files/GangadeviCv.pdf',
	/** filename the browser saves it as */
	fileName: 'Gangadevi-P-Resume.pdf',
	/** the résumé page on this site */
	pageUrl: '/resume/',

	name: 'Gangadevi P',
	role: ['UX Designer', 'Product Designer'],
	photo: '/img/portrait.avif',
	contact: [
		{ key: 'Location', value: 'Bengaluru, India' },
		{ key: 'Mail', value: 'gangadevi.ponna@gmail.com', href: 'mailto:gangadevi.ponna@gmail.com' },
		{ key: 'Phone', value: '+91 91823 31239', href: 'tel:+919182331239' },
		{ key: 'LinkedIn', value: 'in/pgangadevi', href: 'https://www.linkedin.com/in/pgangadevi/' },
		{ key: 'Portfolio', value: 'gangadevi.in', href: 'https://gangadevi.in/' }
	],

	projects: [
		{
			name: 'KIET Student App',
			role: 'Product Designer · Android',
			period: 'Feb 2026 – Mar 2026',
			href: '/work/kiet-student-app',
			logo: '/img/KIET/kiet%20logo.png',
			points: [
				'Designed a centralized student platform integrating announcements, attendance, academics, and campus services.',
				'Simplified everyday tasks and introduced transparent permission-request tracking.',
				'Collaborated with an Android developer from design to launch, reaching <b>6,061+ users</b> and approximately 1.8K monthly users.'
			]
		},
		{
			name: 'Relay',
			role: 'Rent & Repair',
			period: 'Jun 2026 – Aug 2026',
			href: '/work/relay',
			logo: '/img/CueUp/logo.png',
			points: [
				'Designed an end-to-end landlord–tenant platform to simplify rent tracking, payment verification, and maintenance coordination.',
				'Created user flows and interfaces for both roles, introducing clear payment statuses, repair ownership, and progress tracking to reduce communication gaps.'
			]
		},
		{
			name: 'Athera',
			role: 'Premium Furniture',
			period: 'Sep 2026 · 2 weeks',
			href: 'https://gangadevi-p.github.io/athera/',
			logo: '/img/work/athera.png',
			points: [
				'Designed a premium furniture e-commerce experience focused on product discovery, visual hierarchy, and intuitive navigation.',
				'Developed an interactive web prototype using Claude to demonstrate the shopping experience beyond static designs.'
			]
		},
		{
			name: "Designer's Tool-Kit",
			role: 'Web resource',
			period: 'Oct 2026 · 2 weeks',
			href: 'https://gangadevi-p.github.io/toolkit/',
			points: [
				'Designed and published a web-based design resource that organizes essential references and learning materials in one place.',
				'Focused on information architecture, readability, and intuitive navigation for quick access to useful content.'
			]
		}
	],

	/** shown as "Design: …" in the Skills block */
	skills: [
		'UI/UX Design',
		'Information Architecture',
		'Interaction Design',
		'User Research',
		'Competitive Analysis',
		'User Flows',
		'Wireframing',
		'Prototyping',
		'Usability Testing',
		'Visual Hierarchy',
		'Typography',
		'Design Systems',
		'Accessibility'
	],

	tools: ['Figma', 'FigJam', 'Illustrator', 'Rive', 'Claude', 'Notion'],

	education: [
		{
			school: 'KIET Institutions',
			logo: '/img/KIET/kiet%20logo.png',
			detail: 'B.Tech, CSE (Cyber Security) · JNTUK University',
			period: 'Nov 2021 – May 2025'
		},
		{
			school: 'Swamy Vivekananda Jr College',
			detail: 'Intermediate, MPC',
			period: 'Jun 2019 – Apr 2021'
		}
	]
};
