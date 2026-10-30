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
 * `preview` — optional mockup at the top of the card, on a soft `tone` panel
 *   (leave `tone` out and the mockup sits straight on the card, no panel):
 *   { kind: 'phones', shots: [front, back], tone } — two app screens in phone frames
 *   { kind: 'screens', shots: [front, back], backdrop | tone, trim? } — two app screens, zoomed in
 *     and cropped by the panel inside CSS phone frames (zooms further on hover). `trim` is the
 *     share of the width to cut off every side when the export has a phone frame baked in.
 *   { kind: 'athera' | 'toolkit', backdrop }   — an animated brand loop
 *     (components/athera/AtheraReel.svelte, components/toolkit/ToolkitReel.svelte);
 *     `backdrop` is any CSS background in the site's own palette and, unlike
 *     `tone`, stays the same in dark mode
 */
export const work = [
	{
		title: 'Relay',
		logo: '/img/CueUp/logo.png',
		darkLogo: '/img/CueUp/dark%20theme%20logo.png',
		logoHeight: 32,
		logoName: 'Relay',
		heading: 'Rent & Repair',
		outcome: 'Landlords and tenants chase rent and repairs over calls and chats. Relay gives both one shared view.',
		period: 'Jun 2026 – Aug 2026',
		preview: {
			kind: 'screens',
			// the tenant's and the landlord's home screens, shown up close, at their original export size
			shots: ['/Relay/TenantHome.png', '/Relay/LandlordHome.png'],
			// the app's pale blue-grey, lit from the top; a backdrop, so it stays put in dark mode
			backdrop: 'radial-gradient(90% 85% at 50% 0%, #f0f5fc 0%, #d3e2f4 55%, #b7cfeb 100%)'
		},
		href: '/work/relay',
		slug: 'relay',
		bespoke: true
	},
	{
		title: 'Student App',
		logo: '/img/KIET/kiet%20logo.png',
		darkLogo: '/kiet/Kietdarkthemelogo.png',
		logoVariant: 'kiet',
		logoHeight: 28,
		outcome: 'Students missed updates scattered across WhatsApp, PDFs and sites. One app now holds it all.',
		period: 'Feb 2026 – Mar 2026',
		preview: {
			kind: 'screens',
			shots: ['/img/KIET/Home%20so.avif', '/img/KIET/Projects%20So.avif'],
			// these exports have a phone frame baked in (4.64% of the width on every side);
			// it is trimmed so they sit in the same zoomed frame as Relay's bare screens
			trim: 0.0464,
			tone: '#fcebe0'
		},
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
		outcome: 'Premium furniture is a big, permanent purchase. Athera makes renting it calm and effortless.',
		period: 'Sep 2026 · 2 weeks',
		preview: {
			kind: 'athera',
			// the hero's warm spotlight on walnut
			backdrop: 'radial-gradient(110% 90% at 50% 75%, #a68c75 0%, #6e5848 45%, #3b2f27 100%)'
		},
		href: 'https://gangadevi-p.github.io/athera/',
		openInNewTab: false,
		hoverLabel: 'Open Athera'
	},
	{
		title: "Designer's Tool-Kit",
		hideLogo: true,
		subheading: 'Digital Notes',
		outcome: 'Design references get scattered across tabs and notes. The Tool-Kit keeps them in one saveable place.',
		period: 'Oct 2026 · 2 weeks',
		preview: {
			kind: 'toolkit',
			// the app's black canvas, a faint dot grid and a soft top light
			backdrop:
				'radial-gradient(rgb(255 255 255 / 8%) 1px, transparent 1.2px) 0 0 / 14px 14px, radial-gradient(90% 80% at 50% 0%, #2b2b2e 0%, #0b0b0c 65%)'
		},
		href: 'https://gangadevi-p.github.io/toolkit/',
		openInNewTab: false,
		hoverLabel: 'Open Toolkit'
	}
];
