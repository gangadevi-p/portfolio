import { redirect } from '@sveltejs/kit';

// The page used to live at /work/food-compare — keep old links working.
export const prerender = true;

export function load() {
	redirect(308, '/projects/food-compare/');
}
