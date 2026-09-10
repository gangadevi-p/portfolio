<script>
	/**
	 * Layout 2 — the second "Also me" row.
	 * Same idea as Layout 1: images share one height, keep their own (natural)
	 * widths, with a fixed 40px gap. It fills its container's width; the section
	 * sizes that container to 65% and puts Layout 4 in the remaining space.
	 *
	 * Each image's flex-grow is set to its natural width/height ratio, so with a
	 * zero flex-basis the row splits proportionally and every image ends up the
	 * same height.
	 */
	import { layout2 } from '$data/also-me.js';
</script>

<div class="layout2" aria-label="Personal gallery — row 2">
	{#each layout2 as image (image.src)}
		<img
			src={image.src}
			alt={image.alt}
			style="flex-grow: {image.ratio}; aspect-ratio: {image.ratio}"
			loading="lazy"
			decoding="async"
		/>
	{/each}
</div>

<style>
	.layout2 {
		display: flex;
		align-items: flex-start;
		gap: 20px; /* fixed horizontal space between every image */
		width: 100%; /* the section constrains this to 65% of the row */
	}
	.layout2 img {
		flex-basis: 0; /* grow purely by the ratio above → equal heights */
		min-width: 0;
		width: 100%;
		height: auto;
		display: block;
		object-fit: cover; /* aspect-ratio box == natural ratio, so nothing is cropped */
	}
</style>
