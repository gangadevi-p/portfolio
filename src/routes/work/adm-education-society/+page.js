import { redirect } from '@sveltejs/kit';

// The case study used to live at /work/adm-education-society — keep old links working.
export const prerender = true;

export function load() {
	redirect(308, '/work/adm-educational-welfare-society/');
}
