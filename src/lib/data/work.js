/**
 * Projects grid (light band — see ProjectsSection.svelte).
 *
 * Each card has a logo, title, short description, and duration.
 * Drop a square-ish logo in /static/img/work/ (PNG or SVG) and point `logo`
 * at it. Until the file exists the card shows a monogram fallback.
 *
 * `href`  — optional. A path starting with "/" opens in-page as a case study;
 *           any other URL opens in a new tab. Omit it and the pill is static.
 * `size`  — 'lg' makes a taller bento tile; anything else is the short tile.
 *           Order the list so each column gets one tall + one short.
 * `logoHeight` — optional. Fixes the logo's height in px (width follows).
 * `logoName` — optional. Writes the name beside the logo.
 * `heading` — optional. Replaces the title text shown under the logo.
 * `framed` — optional. Wraps the logo in a white, rounded "app icon" tile.
 * `slug` + `bespoke` — only for projects that have their own /work/<slug> route.
 */
export const work = [
	{
		title: 'Relay',
		logo: '/img/CueUp/logo.png',
		logoHeight: 32,
		logoName: 'Relay',
		heading: 'Rent & Repair',
		blurb: 'A calmer, clearer experience that helps landlords and tenants manage their rental relationship.',
		period: '2 months',
		href: '/work/cueup',
		slug: 'cueup',
		bespoke: true
	},
	{
		title: 'Student App',
		logo: '/img/KIET/kiet%20logo.png',
		blurb: 'A student companion app for academic updates, attendance, and campus essentials—live on Google Play.',
		period: '4 months',
		href: '/work/kiet-student-app',
		slug: 'kiet-student-app',
		bespoke: true
	},
	{
		title: 'Athera',
		logo: '/img/work/athera.png',
		logoHeight: 32,
		logoName: 'Athera',
		heading: 'Premium furniture',
		blurb: 'A furniture-shopping web app designed to make browsing, choosing, and buying feel effortless.',
		period: 'Building',
		href: ''
	}
];
