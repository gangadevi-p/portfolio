/**
 * Work / case-study grid. Add or remove entries freely.
 * `cover` points at /static/img/*, swap with your exports.
 */
export const work = [
	{
		slug: 'kiet-student-app',
		title: 'KIET Student App',
		year: '2024',
		role: 'Product Designer',
		summary: 'One app for everything at KIET campus — announcements, academics and student services.',
		cover: '/kiet/hero-phone-home.png',
		tags: ['Mobile', 'Android', '0 → 1'],
		bespoke: true // has its own route at /work/kiet-student-app
	},
	{
		slug: 'retail-dashboard',
		title: 'Shelf — Retail Analytics',
		year: '2024',
		role: 'Product Designer',
		summary: 'A calmer dashboard for store managers on the floor.',
		cover: '/img/work-2.svg',
		tags: ['Web', 'Data Viz']
	},
	{
		slug: 'healthcare-portal',
		title: 'Cura — Patient Portal',
		year: '2024',
		role: 'UX Designer',
		summary: 'Booking, records and reminders without the anxiety.',
		cover: '/img/work-3.svg',
		tags: ['Web', 'Accessibility']
	},
	{
		slug: 'travel-brand',
		title: 'Long Way — Travel Brand',
		year: '2023',
		role: 'Designer',
		summary: 'Identity and booking flow for a slow-travel startup.',
		cover: '/img/work-4.svg',
		tags: ['Brand', 'Mobile']
	}
];
