<script>
	/**
	 * "Also me" photo collage — six photos in a bento of different tile shapes
	 * (wide, tall, square), each tile cut to suit its photo instead of one
	 * shared crop.
	 *
	 * Tiles rise in one after another as they scroll into view. On a pointer
	 * each tile tilts a little toward it, the photo drifts the other way for
	 * depth, a soft light follows, and a caption slides up. On phones the
	 * collage becomes two columns that keep each photo's own proportions.
	 */
	import { gallery } from '$data/also-me.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import { reveal } from '$motion/reveal.js';

	/* where each tile sits on the 12-column desktop grid, and its shape on a phone */
	const slots = [
		{ area: 'sky', ratio: '16 / 9' },
		{ area: 'swan', ratio: '1 / 1' },
		{ area: 'gym', ratio: '3 / 4' },
		{ area: 'me', ratio: '1 / 1' },
		{ area: 'cat', ratio: '3 / 4' },
		{ area: 'pen', ratio: '4 / 7' }
	];
	const photos = gallery.slice(0, slots.length);

	/** tilt toward the pointer; everything is driven by CSS variables */
	function tilt(node) {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (!matchMedia('(hover: hover)').matches) return;

		const move = (event) => {
			const box = node.getBoundingClientRect();
			const x = (event.clientX - box.left) / box.width - 0.5;
			const y = (event.clientY - box.top) / box.height - 0.5;
			node.style.setProperty('--ry', `${x * 9}deg`);
			node.style.setProperty('--rx', `${y * -9}deg`);
			node.style.setProperty('--mx', `${x * -14}px`);
			node.style.setProperty('--my', `${y * -14}px`);
			node.style.setProperty('--lx', `${(x + 0.5) * 100}%`);
			node.style.setProperty('--ly', `${(y + 0.5) * 100}%`);
		};
		const leave = () => {
			for (const name of ['--ry', '--rx', '--mx', '--my']) node.style.removeProperty(name);
		};
		node.addEventListener('pointermove', move);
		node.addEventListener('pointerleave', leave);
		return {
			destroy() {
				node.removeEventListener('pointermove', move);
				node.removeEventListener('pointerleave', leave);
			}
		};
	}
</script>

<div class="holder">
<div class="collage">
	{#each photos as photo, i (photo.src)}
		<figure
			class="tile"
			style="grid-area: {slots[i].area}; --ratio: {slots[i].ratio}"
			use:reveal={{ delay: i * 0.07, y: 28, scale: 0.95 }}
			use:cursorLabel={photo.label ?? ''}
		>
			<div class="card" use:tilt>
				<img
					src={photo.src}
					alt={photo.alt}
					style="object-position: {photo.position ?? 'center'}"
					loading="lazy"
					decoding="async"
					draggable="false"
				/>
				<span class="light"></span>
				{#if photo.caption}<figcaption>{photo.caption}</figcaption>{/if}
			</div>
		</figure>
	{/each}
</div>
</div>

<style>
	/* the box the collage measures itself against */
	.holder {
		margin-top: clamp(2.5rem, 5vw, 4rem);
		container-type: inline-size;
	}
	.collage {
		--gap: clamp(10px, 1.4cqw, 16px);
		/* one column's width: the grid's rows are a little taller than that */
		--col: calc((100cqw - 11 * var(--gap)) / 12);
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		grid-auto-rows: calc(var(--col) * 1.08);
		grid-template-areas:
			'sky sky sky sky sky sky sky pen pen pen gym gym'
			'sky sky sky sky sky sky sky pen pen pen gym gym'
			'sky sky sky sky sky sky sky pen pen pen gym gym'
			'sky sky sky sky sky sky sky pen pen pen cat cat'
			'swan swan swan me me me me pen pen pen cat cat'
			'swan swan swan me me me me pen pen pen cat cat';
		gap: var(--gap);
	}
	.tile {
		margin: 0;
		min-width: 0;
		min-height: 0;
	}
	.card {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: clamp(14px, 1.8cqw, 24px);
		background: var(--c-surface-subtle);
		box-shadow:
			0 1px 2px rgb(29 29 31 / 8%),
			0 14px 30px -16px rgb(29 29 31 / 38%);
		transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
		transition:
			transform 0.45s var(--ease-out),
			box-shadow 0.45s var(--ease-out);
		will-change: transform;
	}
	.card:hover {
		box-shadow:
			0 2px 4px rgb(29 29 31 / 10%),
			0 30px 54px -18px rgb(29 29 31 / 46%);
	}
	/* the photo is a little larger than the tile so it can drift for depth */
	.card img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		scale: 1.08;
		translate: var(--mx, 0) var(--my, 0);
		transition:
			translate 0.45s var(--ease-out),
			scale 0.7s var(--ease-out);
		user-select: none;
	}
	.card:hover img {
		scale: 1.14;
	}
	/* a soft light that follows the pointer */
	.light {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle at var(--lx, 50%) var(--ly, 30%),
			rgb(255 255 255 / 26%),
			transparent 55%
		);
		opacity: 0;
		transition: opacity 0.4s var(--ease-out);
		pointer-events: none;
	}
	.card:hover .light {
		opacity: 1;
	}
	/* bottom shade + caption, so the tag reads on any photo */
	.card::after {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 42%;
		background: linear-gradient(transparent, rgb(0 0 0 / 38%));
		opacity: 0;
		transition: opacity 0.4s var(--ease-out);
		pointer-events: none;
	}
	figcaption {
		position: absolute;
		left: clamp(10px, 1.3cqw, 16px);
		bottom: clamp(10px, 1.3cqw, 16px);
		z-index: 1;
		padding: 6px 12px;
		border-radius: 999px;
		background: rgb(255 255 255 / 88%);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		color: #1d1d1f;
		font-size: 0.8rem;
		font-weight: 600;
		line-height: 1;
		white-space: nowrap;
		opacity: 0;
		translate: 0 10px;
		transition:
			opacity 0.4s var(--ease-out),
			translate 0.45s var(--ease-out);
	}
	.card:hover::after {
		opacity: 1;
	}
	.card:hover figcaption {
		opacity: 1;
		translate: 0 0;
	}

	/* touch has no hover: the captions are simply there */
	@media (hover: none) {
		.card::after {
			opacity: 1;
		}
		figcaption {
			opacity: 1;
			translate: 0 0;
		}
	}

	/* phones: two columns that keep each photo's own proportions */
	@media (max-width: 760px) {
		.collage {
			display: block;
			columns: 2;
			column-gap: var(--gap);
		}
		.tile {
			margin-bottom: var(--gap);
			break-inside: avoid;
			aspect-ratio: var(--ratio);
		}
		/* the wide shot runs the full width; the rest fall into two columns */
		.tile:first-child {
			column-span: all;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.card,
		.card img,
		.light,
		figcaption,
		.card::after {
			transition: none;
		}
	}
</style>
