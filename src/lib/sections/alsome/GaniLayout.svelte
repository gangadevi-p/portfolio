<script>
	/**
	 * "Also me" layout — an L of framed photos wrapping the intro copy.
	 *
	 *   ┌──────────────────────┐ ┌──┐
	 *   │  heading + story     │ │  │   right column: 2 photos
	 *   │  (children)          │ │  │
	 *   └──────────────────────┘ │  │
	 *   ┌──┐ ┌──┐ ┌──┐           ├──┤   corner photo
	 *   └──┘ └──┘ └──┘           └──┘   bottom row: 3 photos
	 *
	 * Every photo sits in the same even white frame, cropped to a shared
	 * landscape tile, each at its own slight tilt; hovering straightens it.
	 * On narrow screens the copy stacks on top and photos flow in two columns.
	 */
	import { gallery } from '$data/also-me.js';

	let { children } = $props();

	// 2 down the right, the corner, then 3 along the bottom (right → left).
	const slots = [
		{ col: 4, row: 1 },
		{ col: 4, row: 2 },
		{ col: 4, row: 3 },
		{ col: 3, row: 3 },
		{ col: 2, row: 3 },
		{ col: 1, row: 3 }
	];
	const tilts = [3, -4, 4, -2, 5, -4];
	const photos = gallery.slice(0, slots.length);
</script>

<div class="gani-layout">
	<div class="copy">
		{@render children?.()}
	</div>

	{#each photos as photo, i (photo.src)}
		<figure
			class="frame"
			style="--col: {slots[i].col}; --row: {slots[i].row}; --tilt: {tilts[i]}deg"
		>
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
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(16px, 2.2vw, 28px);
		align-items: start;
	}
	.copy {
		grid-column: 1 / 4;
		grid-row: 1 / 3;
		align-self: center;
		padding-right: clamp(0px, 3vw, 48px);
	}
	.frame {
		grid-column: var(--col);
		grid-row: var(--row);
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
		.copy {
			grid-column: 1 / -1;
			grid-row: auto;
			padding-right: 0;
			margin-bottom: 8px;
		}
		.frame {
			grid-column: auto;
			grid-row: auto;
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
