/**
 * Hero section content.
 *
 * `icons`: floating app badges.
 *   x / y   – % position inside the hero stage (0–100)
 *   size    – rendered width in px
 *   depth   – how strongly it reacts to the pointer (0 = static, 0.2 = lively)
 *   z       – optional stacking order; set above 6 to sit in front of the photo
 *
 * Swap the files in /static/icons and /static/img with your exported assets;
 * keep the same names or update the paths here.
 */

export const hero = {
	kicker: 'Hi, I am designer',
	name: 'Gangadevi',
	photo: {
		src: '/img/portrait.png', // transparent grayscale cut-out
		alt: 'Gangadevi, smiling, in a floral top',
		label: "That's me"
	},
	speech: {
		title: 'What do I do?',
		lines: ['I care more about user experience.', 'I care more about user experience.']
	},
	icons: [
		{ name: 'Coffee', src: '/icons/coffee.png', x: 38, y: 56, size: 58, depth: 0.12 },
		{ name: 'Dumbbell', src: '/icons/dumbell.png', x: 27, y: 55, size: 50, depth: 0.1 },
		{ name: 'Figma', src: '/icons/figma.png', x: 50, y: 63, size: 58, depth: 0.12 },
		{ name: 'Claude', src: '/icons/claude.png', x: 40, y: 71, size: 52, depth: 0.16 },
		{ name: 'Adobe XD', src: '/icons/xd.png', x: 51, y: 74, size: 60, depth: 0.07 },
		{ name: 'Notion', src: '/icons/notion.png', x: 35, y: 83, size: 48, depth: 0.09 },
		{ name: 'ChatGPT', src: '/icons/chatgpt.png', x: 33, y: 93, size: 52, depth: 0.05 },
		{ name: 'Canva', src: '/icons/canva.png', x: 46, y: 91, size: 54, depth: 0.13 },
		{ name: 'Codex', src: '/icons/codex.png', x: 50, y: 52, size: 62, depth: 0.11, z: 7 }
	]
};
