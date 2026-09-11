/**
 * Global site data — identity + navigation.
 * @typedef {{ label: string, href: string }} NavLink
 */

export const site = {
	name: 'Gangadevi',
	role: 'Product & UX Designer',
	location: 'Bengaluru',
	email: 'gangadevi.ponna@gmail.com',
	socials: [
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/pgangadevi/' },
		{ label: 'Behance', href: 'https://www.behance.net/gangadevip12' },
		{ label: 'Medium', href: 'https://medium.com/@Gangadevi12' }
	]
};

/** @type {NavLink[]} */
export const nav = [
	{ label: 'Me', href: '#me' },
	{ label: 'Work', href: '#work' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'I Play', href: '#playground' },
	{ label: 'Also me', href: '#also-me' }
];

/**
 * Kept for compatibility — the "Also me" link now lives inside the nav pill
 * with everything else, Apple-style, rather than as a separate button.
 * @type {NavLink}
 */
export const navCta = { label: 'Also me', href: '#also-me' };
