import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		// transform the heavy pages up front so the first click on a case study
		// doesn't wait for the dev server to compile it
		warmup: {
			clientFiles: [
				'./src/routes/+layout.svelte',
				'./src/routes/work/**/+page.svelte',
				'./src/lib/components/cueup/*.svelte',
				'./src/lib/components/kiet/*.svelte'
			]
		},
		watch: {
			// don't trigger dev reloads when `npm run build` writes output
			ignored: ['**/build/**', '**/.svelte-kit/**']
		}
	}
});
