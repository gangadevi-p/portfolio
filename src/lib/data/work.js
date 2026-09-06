/**
 * Projects grid (light band — see ProjectsSection.svelte).
 *
 * Each card is a logo on the left + title / blurb / date pill on the right.
 * Drop a square-ish logo in /static/img/work/ (PNG or SVG) and point `logo`
 * at it. Until the file exists the card shows a monogram fallback.
 *
 * `href`  — optional. A path starting with "/" opens in-page as a case study;
 *           any other URL opens in a new tab. Omit it and the pill is static.
 * `size`  — 'lg' makes a taller bento tile; anything else is the short tile.
 *           Order the list so each column gets one tall + one short.
 * `framed` — optional. Wraps the logo in a white, rounded "app icon" tile.
 * `slug` + `bespoke` — only for projects that have their own /work/<slug> route.
 */
export const work = [
	{
		title: 'Student App',
		logo: '/img/work/kiet.png',
		blurb: 'Real-world application, live on the Play Store.',
		period: 'Jan 2024 – April 2024',
		href: '/work/kiet-student-app',
		slug: 'kiet-student-app',
		bespoke: true
	},
	{
		title: 'CueUp',
		logo: '/img/work/cueup.png',
		blurb: 'A relationship between landlords and tenants.',
		period: 'Apr 2026 – Jun 2026',
		href: '',
		size: 'lg'
	},
	{
		title: 'Athera',
		logo: '/img/work/athera.png',
		blurb: 'E-commerce web app selling furniture.',
		period: 'Apr 2026 – Jun 2026',
		href: '',
		size: 'lg'
	},
	{
		title: 'Fitbit',
		logo: '/img/work/fitbit.png',
		blurb: 'Real-world application, live on the Play Store.',
		period: 'Jan 2024 – April 2024',
		href: ''
	}
];
