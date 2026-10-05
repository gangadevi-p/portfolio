<script>
	/**
	 * "Also me" photo grid — six framed photos in 3 columns × 2 rows below the copy.
	 *
	 * Every photo sits in the same even white frame, cropped to a shared
	 * landscape tile, each at its own slight tilt; hovering straightens it.
	 * On phones it drops to 2 columns.
	 */
	import { gallery } from '$data/also-me.js';

	const tilts = [3, -4, 4, -2, 5, -4];
	const photos = gallery.slice(0, tilts.length);
</script>

<div class="gani-layout">
	{#each photos as photo, i (photo.src)}
		<figure class="frame" style="--tilt: {tilts[i]}deg">
			<img
				src={photo.src}
				alt={photo.alt}
				style="object-position: {photo.position ?? 'center'}"
				loading="lazy"
				decoding="async"
			/>
		</figure>
	{/each}
</div>

<style>
	.gani-layout {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(14px, 1.8vw, 24px);
		align-items: start;
		margin-top: clamp(2.5rem, 5vw, 4rem);
	}
	.frame {
		margin: 0;
		padding: 8px;
		background: #ffffff;
		border-radius: 6px;
		box-shadow:
			0 1px 2px rgb(0 0 0 / 12%),
			0 12px 26px -12px rgb(0 0 0 / 34%);
		rotate: var(--tilt);
		transition:
			rotate var(--dur-med) var(--ease-out),
			scale var(--dur-med) var(--ease-out),
			box-shadow var(--dur-med) var(--ease-out);
	}
	.frame:hover {
		position: relative;
		z-index: 2;
		rotate: 0deg;
		scale: 1.05;
		box-shadow:
			0 2px 4px rgb(0 0 0 / 14%),
			0 24px 44px -14px rgb(0 0 0 / 42%);
	}
	.frame img {
		display: block;
		width: 100%;
		aspect-ratio: 7 / 5;
		object-fit: cover;
		border-radius: 2px;
	}
	@media (max-width: 760px) {
		.gani-layout {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.frame {
			padding: 6px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.frame {
			transition: none;
		}
		.frame:hover {
			rotate: var(--tilt);
			scale: 1;
		}
	}
</style>
