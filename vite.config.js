import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';

/**
 * Adds a source marker to the outermost native element in every Svelte component
 * while Vite is serving the site. DevFileOverlay reads these markers to render
 * the filename labels without changing the production output.
 */
function devSourceLabels() {
	let enabled = false;

	return {
		name: 'dev-source-labels',
		enforce: 'pre',
		configResolved(config) {
			enabled = config.command === 'serve';
		},
		transform(code, id) {
			if (!enabled || !id.endsWith('.svelte') || id.includes('node_modules')) return null;

			const relativeFile = path.relative(process.cwd(), id).replaceAll('\\', '/');
			if (relativeFile === 'src/lib/components/DevFileOverlay.svelte') return null;

			// Ignore non-rendering blocks before looking for the component's root.
			const searchable = code.replace(
				/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<svelte:head\b[^>]*>[\s\S]*?<\/svelte:head>/g,
				(match) => ' '.repeat(match.length)
			);
			const match = /<svelte:element\b|<(?!\/|!|\?|svelte:)([a-z][\w:-]*)(?=[\s/>])/i.exec(searchable);
			if (!match) return null;

			const insertion = match.index + match[0].length;
			return {
				code: `${code.slice(0, insertion)} data-dev-source="${relativeFile}"${code.slice(insertion)}`,
				map: null
			};
		}
	};
}

export default defineConfig({
	plugins: [devSourceLabels(), sveltekit()],
	server: {
		watch: {
			// don't trigger dev reloads when `npm run build` writes output
			ignored: ['**/build/**', '**/.svelte-kit/**']
		}
	}
});
