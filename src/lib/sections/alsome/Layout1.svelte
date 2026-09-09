<script>
	/**
	 * Layout 1 — the first "Also me" row.
	 * A horizontal strip of images: they share one height, keep their own
	 * proportions, sit 40px apart, and together fill the full row width (which
	 * matches the Layout 2 / 3 / 4 row below).
	 *
	 * Each image's flex-grow is its natural width/height ratio; with a zero
	 * flex-basis the row splits proportionally and every image ends the same
	 * height, while `aspect-ratio` keeps the box correct before the image loads.
	 */
	import { layout1 } from '$data/also-me.js';
</script>

<div class="layout1" aria-label="Personal gallery — row 1">
	{#each layout1 as image (image.src)}
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
	.layout1 {
		display: flex;
		align-items: flex-start;
		gap: 24px; /* fixed horizontal space between every image */
		width: 100%;
	}
	.layout1 img {
		flex-basis: 0; /* grow purely by the ratio above → equal heights */
		min-width: 0;
		width: 100%;
		height: auto;
		display: block;
		object-fit: cover;
	}
</style>
