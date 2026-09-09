/**
 * Global site data — identity + navigation.
 * @typedef {{ label: string, href: string }} NavLink
 */

export const site = {
	name: 'Gangadevi',
	role: 'Product & UX Designer',
	location: 'Bengaluru',
	email: 'hello@gangadevi.design',
	socials: [
		{ label: 'Dribbble', href: 'https://dribbble.com/' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/' },
		{ label: 'Read.cv', href: 'https://read.cv/' }
	]
};

/** @type {NavLink[]} */
export const nav = [
	{ label: 'Me', href: '#me' },
	{ label: 'Work', href: '#work' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Resume', href: '#resume' },
	{ label: 'I Play', href: '#playground' },
	{ label: 'Also me', href: '#resume' }
];

/**
 * Kept for compatibility — the "Also me" link now lives inside the nav pill
 * with everything else, Apple-style, rather than as a separate button.
 * @type {NavLink}
 */
export const navCta = { label: 'Also me', href: '#resume' };
