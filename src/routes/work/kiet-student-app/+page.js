import { redirect } from '@sveltejs/kit';

// The case study used to live at /work/kiet-student-app — keep old links working.
export const prerender = true;

export function load() {
	redirect(308, '/projects/kiet-student-app/');
}
