<script>
	/**
	 * A regular grid of work shots, used by the /work/* gallery pages.
	 *
	 * `cell`  — the target width of one image, in px. Cells never grow past it;
	 *           they shrink instead once the container is narrower.
	 * `cols`  — how many per row on desktop (collapses to one on small screens).
	 * `ratio` — aspect-ratio of the sources, so the grid holds its shape while
	 *           the images are still lazy-loading.
	 */
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';

	let { items = [], cell = 500, cols = 2, ratio = '1' } = $props();
</script>

<div class="grid" style="--cell: {cell}px; --cols: {cols}; --ratio: {ratio};">
	{#each items as item, i (item.src)}
		<figure class="shot" use:reveal={{ delay: (i % cols) * 0.06 }}>
			<img
				src={item.src}
				alt={item.alt}
				loading="lazy"
				decoding="async"
				use:cursorLabel={item.title}
			/>
			{#if item.title}<figcaption>{item.title}</figcaption>{/if}
		</figure>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		/* `minmax(0, …)` lets a cell shrink rather than overflow once the
		   container is narrower than cols × cell + gaps */
		grid-template-columns: repeat(var(--cols), minmax(0, var(--cell)));
		justify-content: center;
		gap: clamp(1.25rem, 3vw, 2.5rem);
	}

	.shot img {
		width: 100%;
		height: auto;
		aspect-ratio: var(--ratio);
		object-fit: cover;
		border-radius: 18px;
		border: 1px solid var(--c-line);
		background: var(--c-surface);
	}
	figcaption {
		margin-top: 0.85rem;
		font-weight: 600;
	}

	@media (max-width: 700px) {
		.grid {
			grid-template-columns: minmax(0, var(--cell));
		}
	}
</style>
