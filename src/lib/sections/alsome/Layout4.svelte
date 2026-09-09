<script>
	/**
	 * Layout 4 — a vertical column beside Layout 2 + Layout 3.
	 * Two images stacked (pencil portrait on top, hug illustration below) with a
	 * fixed 40px gap. The column stretches to the full height of the Layout 2/3
	 * block, and the pencil image is given more of that height than the other.
	 */
	import { layout4 } from '$data/also-me.js';
</script>

<div class="layout4" aria-label="Personal gallery — column">
	{#each layout4 as image (image.src)}
		<img
			class={image.size}
			src={image.src}
			alt={image.alt}
			loading="lazy"
			decoding="async"
		/>
	{/each}
</div>

<style>
	.layout4 {
		display: flex;
		flex-direction: column;
		gap: 24px; /* fixed vertical space between the two images */
		flex: 1 1 0; /* fill the width left of Layout 2 & 3 */
		min-width: 0;
		min-height: 0;
		align-self: stretch; /* match the height of the Layout 2/3 column */
		overflow: hidden;
	}
	.layout4 img {
		width: 100%;
		/* unitless basis is a *definite* 0, so the two images don't push the
		   column past the Layout 2/3 height — they just share it by flex-grow */
		flex-grow: 0;
		flex-shrink: 1;
		flex-basis: 0;
		min-height: 0;
		display: block;
	}
	/* pencil portrait — the larger of the two */
	.layout4 img.big {
		flex-grow: 1.8;
		object-fit: cover;
		object-position: center top;
	}
	/* hug illustration — smaller, and it has its own whitespace so keep it whole */
	.layout4 img.small {
		flex-grow: 1;
		object-fit: contain;
	}
</style>
