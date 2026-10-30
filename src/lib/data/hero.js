/**
 * Hero section content.
 *
 * `icons`: floating app badges.
 *   x / y   – % position inside the hero stage (0–100)
 *   size    – rendered width in px
 *   depth   – how strongly it reacts to the pointer (0 = static, 0.2 = lively)
 *   z       – optional stacking order; set above 6 to sit in front of the photo
 *   trim    – the image's transparent margin around the artwork, as a fraction
 *             of its size: [top, right, bottom, left]. The Tools folder packs
 *             icons by their visible edges using it — re-measure on swapping art.
 *
 * Swap the files in /static/icons and /static/img with your exported assets;
 * keep the same names or update the paths here.
 */

export const hero = {
	kicker: 'Hi, I am',
	role: 'Aspiring Product & UX Designer',
	name: 'Gangadevi',
	photo: {
		src: '/img/portrait.avif', // transparent grayscale cut-out
		alt: 'Gangadevi, smiling, in a floral top',
		label: 'Me'
	},
	speech: {
		title: 'What do I do?',
		lines: ['I care more about user experience.', 'I care more about user experience.']
	},
	icons: [
		// Tools folder rows, left to right: Figma, Claude, Notion on top; Adobe XD,
		// Codex at the bottom
		{ name: 'Figma', src: '/icons/figma.png', x: 50, y: 63, size: 58, depth: 0.12, trim: [0.01, 0.19, 0.015, 0.12] },
		{ name: 'Claude', src: '/icons/claude.png', x: 40, y: 71, size: 52, depth: 0.16, trim: [0.03, 0.045, 0, 0.02] },
		{ name: 'Notion', src: '/icons/notion.png', x: 35, y: 83, size: 48, depth: 0.09, trim: [0.1, 0.095, 0.045, 0.095] },
		{ name: 'Adobe XD', src: '/icons/xd.png', x: 51, y: 74, size: 60, depth: 0.07, trim: [0.065, 0.065, 0.065, 0.065] },
		{ name: 'Codex', src: '/icons/codex.avif', x: 50, y: 52, size: 62, depth: 0.11, z: 7, trim: [0.09, 0.1, 0.09, 0.1] }
	]
};
