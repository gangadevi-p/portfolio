import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Node server — every page is still prerendered to plain HTML/CSS/JS,
		// but a Node server is needed to run the /api/chat endpoint (it calls
		// OpenAI with a server-only key, which a static host can't do).
		adapter: adapter(),
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
