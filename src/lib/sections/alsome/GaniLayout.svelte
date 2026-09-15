<script>
	/**
	 * "Also me" gallery — three rows, each the same total occupied width as the
	 * top row. Every row still lays out at one shared height (equal heights
	 * within itself, images unstretched/uncropped) — but rows with a smaller or
	 * larger combined ratio+gap footprint than the top row get their own height
	 * solved for algebraically, so `rowWidth = height * sumRatio + gaps` comes
	 * out equal for all three rows without ever exceeding the top row's width.
	 */
	import { row1, row2, row3 } from '$data/also-me.js';

	const rows = [row1, row2, row3];

	const footprint = (row) => ({
		sumRatio: row.reduce((sum, img) => sum + img.ratio, 0),
		gaps: row.length - 1
	});
	const base = footprint(row1);

	// height_i = (base.sumRatio / sumRatio_i) * baseHeight + ((base.gaps - gaps_i) * 24 / sumRatio_i)
	const coefficients = rows.map((row) => {
		const { sumRatio, gaps } = footprint(row);
		return {
			k1: base.sumRatio / sumRatio,
			k2: ((base.gaps - gaps) * 24) / sumRatio
		};
	});
</script>

<div class="gani-layout" aria-label="Personal gallery">
	{#each rows as row, i (i)}
		<div class="row" style="--k1: {coefficients[i].k1}; --k2: {coefficients[i].k2}px">
			{#each row as image (image.src)}
				<img
					src={image.src}
					alt={image.alt}
					style="aspect-ratio: {image.ratio}; --image-rotation: {image.rotation ?? 0}deg; object-position: {image.position ?? 'center'}"
					loading="lazy"
					decoding="async"
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
	.gani-layout {
		--row-h-base: clamp(140px, 19vw, 260px);
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		gap: 24px;
		width: 100%;
	}
	.row img {
		height: calc(var(--k1, 1) * var(--row-h-base) + var(--k2, 0px));
		width: auto;
		display: block;
		object-fit: cover; /* only the intentionally-cropped images (custom `position`) lose any edge */
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
		.gani-layout {
			--row-h-base: clamp(110px, 26vw, 160px);
		}
	}
</style>
