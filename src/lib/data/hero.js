/**
 * Hero section content.
 *
 * `icons`: floating app badges.
 *   x / y   – % position inside the hero stage (0–100)
 *   size    – rendered width in px
 *   depth   – how strongly it reacts to the pointer (0 = static, 0.2 = lively)
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
		{ name: 'Figma', src: '/icons/figma.svg', x: 57, y: 44, size: 58, depth: 0.12 },
		{ name: 'Adobe XD', src: '/icons/xd.svg', x: 64, y: 55, size: 60, depth: 0.07 },
		{ name: 'Spark', src: '/icons/asterisk.svg', x: 48, y: 49, size: 50, depth: 0.16 },
		{ name: 'Notion', src: '/icons/notion.svg', x: 44, y: 66, size: 50, depth: 0.09 },
		{ name: 'ChatGPT', src: '/icons/chatgpt.svg', x: 38, y: 80, size: 54, depth: 0.05 },
		{ name: 'Framer', src: '/icons/framer.svg', x: 52, y: 82, size: 50, depth: 0.13 }
	]
};
