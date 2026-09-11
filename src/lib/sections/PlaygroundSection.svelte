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

	</Container>
</section>

<style>
	.section {
		padding-block: 40px;
		background: #f5f5f7;
		color: #1d1d1f;
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
		background: #1d1d1f;
		color: #fff;
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
		border-radius: 28px;
		box-shadow: 0 12px 32px rgb(0 0 0 / 8%);
		overflow: hidden;
		background: transparent;
	}
	.video img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 28px;
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
