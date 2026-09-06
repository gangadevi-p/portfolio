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
	{ label: 'ME', href: '#me' },
	{ label: 'Work', href: '#work' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Resume', href: '#resume' }
];
