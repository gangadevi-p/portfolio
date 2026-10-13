/**
 * Global site data — identity + navigation.
 * @typedef {{ label: string, href: string }} NavLink
 */

export const site = {
	name: 'Gangadevi',
	role: 'Product & UX Designer',
	location: 'Bengaluru',
	email: 'gangadevi.ponna@gmail.com',
	/** Public address of the live site (no trailing slash). Link-preview images need an absolute URL, so set this once it's deployed. */
	url: '',
	description:
		'Product & UX designer in Bengaluru. Live on Google Play: KIET Student App. Open to internships and entry-level roles.',
	socials: [
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/pgangadevi/' },
		{ label: 'Behance', href: 'https://www.behance.net/gangadevip12' },
		{ label: 'Medium', href: 'https://medium.com/@Gangadevi12' }
	]
};

/** @type {NavLink[]} */
export const nav = [
	{ label: 'Me', href: '#me' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Experience', href: '#experience' },
	{ label: 'Play', href: '#play' },
	{ label: 'Also me', href: '#also-me' }
];

/**
 * Kept for compatibility — the "Also me" link now lives inside the nav pill
 * with everything else, Apple-style, rather than as a separate button.
 * @type {NavLink}
 */
export const navCta = { label: 'Also me', href: '#also-me' };
