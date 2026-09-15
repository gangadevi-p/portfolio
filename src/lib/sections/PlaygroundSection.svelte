<script>
	import Container from '$components/Container.svelte';
	import SectionHeading from '$components/SectionHeading.svelte';
	import { reveal } from '$motion/reveal.js';
</script>

<section class="section">
	<Container>
		<div class="section-head">
			<SectionHeading id="playground" title="I Play" />
			<span class="tool">Figma</span>
		</div>

		<div class="videos" use:reveal>
			<div class="video">
				<img src="/files/heartbloom-lossless.avif" alt="Heartbloom interaction preview" loading="lazy" />
			</div>
			<div class="video video--contain">
				<img src="/files/progress.gif" alt="Progress interaction preview" loading="lazy" />
			</div>
			<div class="video video--slider">
				<img src="/files/slider.gif" alt="Slider interaction preview" loading="lazy" />
			</div>
		</div>

	</Container>
</section>

<style>
	.section {
		padding-block: 40px;
		background: #f5f5f7;
		color: #1d1d1f;
	}
	/* Match the Work Experience and Projects heading alignment. */
	.section :global(#playground) {
		text-align: left;
		align-items: flex-start;
	}
	.section-head {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		margin-bottom: 32px;
	}
	.section-head :global(.heading) {
		grid-column: 1;
		margin-bottom: 0;
	}
	.tool {
		grid-column: 2;
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
		display: grid;
		grid-template-columns: auto auto minmax(0, 1fr);
		gap: 24px;
		align-items: stretch;
	}
	.video {
		height: clamp(88px, 9.5vw, 136px);
		min-width: 0;
		background: transparent;
	}
	.video img {
		display: block;
		width: 100%;
		height: 100%;
	}
	/* Each animation uses the same height. The square progress GIF stays compact
	   while the wide slider receives the remaining space instead of being
	   compressed into a square tile. */
	.videos .video {
		aspect-ratio: 348 / 244;
	}
	.videos .video--contain { aspect-ratio: 1; }
	.videos .video--slider { aspect-ratio: auto; }
	.videos .video img {
		object-fit: cover;
	}
	/* the progress clip is square — contain it so the circle stays whole
	   inside the shared tile size instead of being cropped top and bottom */
	.videos .video--contain img,
	.videos .video--slider img {
		object-fit: contain;
	}
	@media (max-width: 720px) {
		.videos {
			grid-template-columns: 1fr;
			gap: 16px;
		}
		.video {
			height: auto;
		}
		.videos .video,
		.videos .video--contain,
		.videos .video--slider {
			aspect-ratio: 348 / 244;
		}
	}
</style>
