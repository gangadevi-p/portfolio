<script>
	/**
	 * "Also me" gallery — three independent rows (2 / 4 / 5 images). Each row
	 * sizes itself purely from its images' own ratios, so the top row ends up a
	 * different height than the two below it with no special-casing needed.
	 */
	import { row1, row2, row3 } from '$data/also-me.js';

	const rows = [row1, row2, row3];
</script>

<div class="gani-layout" aria-label="Personal gallery">
	{#each rows as row, i (i)}
		<div class="row">
			{#each row as image (image.src)}
				<img
					src={image.src}
					alt={image.alt}
					style="flex-grow: {image.ratio}; aspect-ratio: {image.ratio}; --image-rotation: {image.rotation ?? 0}deg"
					loading="lazy"
					decoding="async"
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
	.gani-layout {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;
	}
	.row {
		display: flex;
		align-items: flex-start;
		gap: 24px;
		width: 100%;
	}
	/* The top row has only two images, so filling the full width would make it
	   noticeably taller than the rows below. Narrowing it (rather than cropping
	   either image) brings its height down while keeping both images — and
	   each other — uncropped and exactly matched in height. */
	.row:first-child {
		width: 76%;
	}
	.row img {
		flex-basis: 0; /* grow purely by the ratio above → equal heights within the row */
		min-width: 0;
		width: 100%;
		height: auto;
		display: block;
		object-fit: cover; /* the box's aspect-ratio matches the image, so nothing is cropped */
		rotate: var(--image-rotation);
		border-radius: 20px;
		transition:
			transform var(--dur-med) var(--ease-out),
			filter var(--dur-med) var(--ease-out);
	}
	.row img:hover {
		transform: scale(1.02);
		filter: brightness(1.04) saturate(1.05);
	}
	@media (prefers-reduced-motion: reduce) {
		.row img,
		.row img:hover {
			transform: none;
			filter: none;
			transition: none;
		}
	}
	@media (max-width: 760px) {
		.row,
		.row:first-child {
			width: 100%;
			flex-wrap: wrap;
		}
		.row img {
			flex-basis: calc(50% - 12px);
			flex-grow: 0;
			width: calc(50% - 12px);
		}
	}
</style>
