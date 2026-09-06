import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Static site — every route is prerendered to plain HTML/CSS/JS.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		alias: {
			$components: 'src/lib/components',
			$sections: 'src/lib/sections',
			$data: 'src/lib/data',
			$motion: 'src/lib/motion'
		},
		prerender: {
			// in-page anchors are resolved at runtime by the smooth-scroller
			handleMissingId: 'warn'
		}
	}
};

export default config;
