<script>
	import Container from '$components/Container.svelte';
	import SectionHeading from '$components/SectionHeading.svelte';
	import { reveal } from '$motion/reveal.js';
</script>

<section class="section">
	<Container>
		<div class="section-head">
			<SectionHeading id="playground" kicker="More" title="I Play" />
			<span class="tool">Figma</span>
		</div>

		<div class="videos" use:reveal>
			<div class="video">
				<img src="/files/heartbloom-lossless.avif" alt="Heartbloom interaction preview" loading="lazy" />
			</div>
			<div class="video video--contain">
				<img src="/files/progress.gif" alt="Progress interaction preview" loading="lazy" />
			</div>
		</div>

		<div class="video video--wide video--narrow" use:reveal>
			<img src="/files/slider.gif" alt="Slider interaction preview" loading="lazy" />
		</div>

		<div class="video video--wide video--narrow video--flat" use:reveal>
			<img src="/files/navigation-web.avif" alt="Navigation interaction preview" loading="lazy" />
		</div>
	</Container>

	<!-- Knocks the near-black (#1e1e1e) backing baked into the navigation clip
	     out to full transparency with a hard luminance threshold, so only the
	     dark frame disappears. Every pixel above the threshold — the white UI
	     and its hover/CTA states — passes through completely untouched, unlike
	     a contrast() filter which flattens those subtle tonal differences. -->
	<svg class="filter-defs" width="0" height="0" aria-hidden="true" focusable="false">
		<filter id="pg-knockout" color-interpolation-filters="sRGB">
			<feColorMatrix
				type="matrix"
				values="0 0 0 0 0
				        0 0 0 0 0
				        0 0 0 0 0
				        0.2126 0.7152 0.0722 0 0"
				result="lum"
			/>
			<feComponentTransfer in="lum" result="mask">
				<feFuncA type="discrete" tableValues="0 1 1 1 1" />
			</feComponentTransfer>
			<feGaussianBlur in="mask" stdDeviation="0.4" result="softmask" />
			<feComposite in="SourceGraphic" in2="softmask" operator="in" />
		</filter>
	</svg>
</section>

<style>
	.section {
		padding-block: 40px;
	}
	/* centre the heading to match the centred media stack below it */
	.section :global(#playground) {
		text-align: center;
		align-items: center;
	}
	.section-head {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		margin-bottom: clamp(1.5rem, 4vw, 3rem);
	}
	.section-head :global(.heading) {
		grid-column: 2;
		margin-bottom: 0;
	}
	.tool {
		grid-column: 3;
		justify-self: end;
		display: inline-flex;
		align-items: center;
		background: #fff;
		color: #1c1c1c;
		font-size: var(--fs-small);
		font-weight: 600;
		line-height: 1;
		padding: 0.7rem 1.25rem;
		border-radius: 999px;
	}
	.videos {
		display: flex;
		gap: 12px;
		align-items: stretch;
		/* hold the row narrower than the container so the two tiles read
		   smaller; they still share one width via flex: 1 1 0 */
		max-width: 560px;
		margin-inline: auto;
	}
	.video {
		flex: 1 1 0;
		min-width: 0;
		border-radius: 24px;
		overflow: hidden;
		background: transparent;
	}
	.video img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 24px;
	}
	/* keep the two tiles in this row identical in width and height,
	   cropping to fill rather than letterboxing the differing aspect ratios */
	.videos .video {
		aspect-ratio: 348 / 244;
	}
	.videos .video img {
		height: 100%;
		object-fit: cover;
	}
	/* the progress clip is square — contain it so the circle stays whole
	   inside the shared tile size instead of being cropped top and bottom */
	.videos .video--contain img {
		object-fit: contain;
	}
	.video--wide {
		margin-top: 24px;
	}
	/* hold the slider to the same width as the two tiles above it */
	.video--narrow {
		max-width: 560px;
		margin-inline: auto;
	}
	.filter-defs {
		position: absolute;
		width: 0;
		height: 0;
		pointer-events: none;
	}
	/* drop only the baked-in dark backing of the navigation clip (see the
	   #pg-knockout filter markup) so the panel reads as if it were
	   transparent, without touching the UI or its hover states */
	.video--flat img {
		filter: url(#pg-knockout);
	}
	@media (max-width: 720px) {
		.section-head {
			grid-template-columns: 1fr auto;
		}
		.section-head :global(.heading) {
			grid-column: 1;
		}
		.tool {
			grid-column: 2;
		}
		.videos {
			flex-direction: column;
		}
	}
</style>
