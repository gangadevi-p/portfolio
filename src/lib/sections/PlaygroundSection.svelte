<script>
	import Container from '$components/Container.svelte';
	import SectionHeading from '$components/SectionHeading.svelte';
	import { reveal } from '$motion/reveal.js';
</script>

<section class="section">
	<Container class="wide-container">
		<div class="section-head">
			<SectionHeading id="playground" title="I Play" />
			<span class="tool">Figma</span>
		</div>

		<div class="card" use:reveal>
		<div class="shot">
			<img src="/files/Todomockup.png" alt="Gani's Work Space to-do app mockup" width="1236" height="848" loading="lazy" />
			<div class="shot-crop">
				<img src="/files/Todocode.png" alt="TaskCreator.jsx source code for the to-do app" width="1289" height="1280" loading="lazy" />
			</div>
		</div>

		<div class="videos">
			<div class="anims">
				<div class="anim">
					<img src="/files/heartbloom-lossless.avif" alt="Heartbloom interaction preview" loading="lazy" />
				</div>
				<div class="anim">
					<img src="/files/progress.gif" alt="Progress interaction preview" loading="lazy" />
				</div>
			</div>
			<img class="vector" src="/img/vector.png" alt="Bézier vector editing of a lowercase g" width="1155" height="1362" loading="lazy" />
			<div class="vector-note">
				<h3 class="note-heading">Have a look</h3>
				<p>We know how hard it is to find the perfect typeface for your next project. I am here to help you.</p>
			</div>
		</div>
		</div>

	</Container>
</section>

<style>
	.section {
		padding-block: 40px;
		/* horizontal inset moved here (off the Container) so the section's
		   visible width matches the hero frame's — see WorkExperienceSection. */
		padding-inline: var(--pad-x);
		background: var(--c-bg);
		color: var(--c-ink);
	}
	.section :global(.wide-container) {
		padding-inline: 0;
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
		background: var(--c-surface-strong);
		color: var(--c-ink-inverse);
		font-size: var(--fs-small);
		font-weight: 600;
		line-height: 1;
		padding: 0.7rem 1.25rem;
		border-radius: 999px;
	}
	/* standalone mockup row — the to-do mockup and its code sit above the
	   animation strip at one shared height, left-aligned, leaving open space
	   to the right */
	/* one raised card holds the whole playground, like the project and work cards;
	   rows are centred inside it */
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
		background: var(--c-surface);
		border-radius: 24px;
		padding: 24px;
		box-shadow:
			0 14px 34px rgb(29 29 31 / 8%),
			0 2px 5px rgb(29 29 31 / 4%);
	}
	.shot {
		justify-content: center;
		--shot-h: clamp(200px, 26vw, 380px);
		display: flex;
		gap: 24px;
	}
	.shot > img {
		display: block;
		height: var(--shot-h);
		width: auto;
		border-radius: 10px;
	}
	/* the code screenshot is zoomed to a 940×630 px window starting at y=650
	   (the TaskCreator doc comment + onCreate component body, lines 19–39) —
	   the imports above and the empty right edge are cropped away.
	   margin-top % resolves against the crop's width, hence the 650/940. */
	.shot-crop {
		height: var(--shot-h);
		aspect-ratio: 940 / 630;
		overflow: hidden;
		border-radius: 10px;
		flex-shrink: 0;
	}
	.shot-crop img {
		display: block;
		width: calc(100% * 1289 / 940);
		max-width: none;
		height: auto;
		margin-top: calc(-100% * 650 / 940);
	}
	/* second row — the vector image matches the mockup/code height; the two
	   animations stack in a column beside it, sharing that same height */
	.videos {
		--shot-h: clamp(200px, 26vw, 380px);
		display: flex;
		justify-content: flex-start;
		align-self: flex-start;
		gap: 24px;
	}
	.vector {
		display: block;
		height: var(--shot-h);
		width: auto;
		border-radius: 10px;
	}
	.vector-note {
		align-self: flex-start;
		max-width: 32ch;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		gap: 16px;
	}
	.vector-note p {
		margin: 0;
		font-size: var(--fs-lead);
		line-height: 1.4;
		color: var(--c-ink);
	}
	/* filled pill heading — same fill as the "Figma" tag in the section head */
	.note-heading {
		margin: 0;
		display: inline-flex;
		align-items: center;
		background: var(--c-surface-strong);
		color: var(--c-ink-inverse);
		font-size: var(--fs-small);
		font-weight: 600;
		line-height: 1;
		padding: 0.7rem 1.25rem;
		border-radius: 999px;
	}
	.anims {
		display: flex;
		flex-direction: column;
		gap: 24px;
		height: var(--shot-h);
		/* two stacked 348:244 tiles — width follows the tile height */
		width: calc((var(--shot-h) - 24px) / 2 * 348 / 244);
		flex-shrink: 0;
	}
	.anim {
		flex: 1;
		min-height: 0;
	}
	.anim img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
	}
	@media (max-width: 720px) {
		.card {
			padding: 16px;
			gap: 16px;
		}
		.shot {
			flex-direction: column;
			gap: 16px;
		}
		.shot > img {
			width: 100%;
			height: auto;
		}
		.shot-crop {
			width: 100%;
			height: auto;
		}
		.videos {
			flex-direction: column;
			gap: 16px;
		}
		.vector {
			width: 100%;
			height: auto;
		}
		.vector-note {
			max-width: none;
		}
		.anims {
			height: auto;
		}
	}
</style>
