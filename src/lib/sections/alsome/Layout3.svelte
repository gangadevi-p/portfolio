<script>
	/**
	 * Layout 3 — the third "Also me" row.
	 * Same build as Layout 2: images share one height, keep their natural widths,
	 * fixed 40px gap. It fills its container, which the section sizes to the same
	 * 65% width as Layout 2.
	 */
	import { layout3 } from '$data/also-me.js';
</script>

<div class="layout3" aria-label="Personal gallery — row 3">
	{#each layout3 as image (image.src)}
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
	.layout3 {
		display: flex;
		align-items: flex-start;
		gap: 24px; /* fixed horizontal space between every image */
		width: 100%; /* the section constrains this to 65% of the row */
	}
	.layout3 img {
		flex-basis: 0; /* grow purely by the ratio above → equal heights */
		min-width: 0;
		width: 100%;
		height: auto;
		display: block;
		object-fit: cover;
	}
</style>
