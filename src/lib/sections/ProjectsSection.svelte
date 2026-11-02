<script>
	import { work } from '$data/work.js';
	import Container from '$components/Container.svelte';
	import WorkCard from '$components/WorkCard.svelte';
	import { reveal } from '$motion/reveal.js';

</script>

<section id="projects" class="section">
	<Container class="wide-container">
		<h2 class="title" use:reveal>Projects</h2>

		<div class="grid">
			{#each work as item, index (item.title)}
				<WorkCard {item} {index} />
			{/each}
		</div>
	</Container>
</section>

<style>
	.section {
		padding-block: 40px;
		/* horizontal inset moved here (off the Container) so the section's
		   visible width matches the hero frame's — see HeroSection. */
		padding-inline: var(--pad-x);
		/* light band — the rest of the page is dark, so opt back into light ink */
		background: var(--c-bg);
		color: var(--c-ink);
	}
	.section :global(.wide-container) {
		padding-inline: 0;
	}
	.title {
		font-size: var(--fs-h2);
		font-weight: 700;
		letter-spacing: -0.045em;
		margin-bottom: 32px;
	}
	.grid {
		display: grid;
		/* 2 × 2 — wide tiles give the mockups room to read */
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 24px;
		align-items: stretch;
	}
	@media (max-width: 720px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}
</style>
