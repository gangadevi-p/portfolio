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
 * `outcome` — optional. One-line result shown in bold under the blurb.
 * `slug` + `bespoke` — only for projects that have their own /work/<slug> route.
 */
export const work = [
	{
		title: 'Relay',
		logo: '/img/CueUp/logo.png',
		darkLogo: '/img/CueUp/dark%20theme%20logo.png',
		logoHeight: 32,
		logoName: 'Relay',
		heading: 'Rent & Repair',
		outcome: 'Rent and repairs in one shared view',
		period: '4 months',
		href: '/work/relay',
		slug: 'relay',
		bespoke: true
	},
	{
		title: 'Student App',
		logo: '/img/KIET/kiet%20logo.png',
		darkLogo: '/kiet/Kietdarkthemelogo.png',
		logoVariant: 'kiet',
		outcome: 'Live on Google Play · 6,061 acquisitions',
		period: '4 months',
		href: '/work/kiet-student-app',
		slug: 'kiet-student-app',
		bespoke: true
	},
	{
		title: 'Athera',
		logo: '/img/work/athera.png',
		darkLogo: '/img/AtheraDarkthemelogo.png',
		logoHeight: 32,
		logoName: 'Athera',
		heading: 'Premium furniture',
		outcome: 'Designed by me, built with Claude',
		period: 'Live prototype',
		href: 'https://gangadevi-p.github.io/athera/',
		openInNewTab: false,
		hoverLabel: 'Open Athera'
	},
	{
		title: "Designer's Tool-Kit",
		hideLogo: true,
		subheading: 'Digital Notes',
		outcome: 'We design what others use. This is what we use to design.',
		period: 'Live reference',
		href: 'https://gangadevi-p.github.io/toolkit/',
		openInNewTab: false,
		hoverLabel: 'Open Toolkit'
	}
];
