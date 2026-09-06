import { error } from '@sveltejs/kit';
import { work } from '$data/work.js';

export const prerender = true;

/** Tell the static adapter which slugs to build — skip ones with a bespoke route. */
export function entries() {
	return work.filter((w) => !w.bespoke).map((w) => ({ slug: w.slug }));
}

export function load({ params }) {
	const item = work.find((w) => w.slug === params.slug && !w.bespoke);
	if (!item) throw error(404, 'Project not found');
	return { item };
}
