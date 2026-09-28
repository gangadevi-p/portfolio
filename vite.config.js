import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		watch: {
			// don't trigger dev reloads when `npm run build` writes output
			ignored: ['**/build/**', '**/.svelte-kit/**']
		}
	}
});
