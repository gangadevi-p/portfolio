<script>
	import { work } from '$data/work.js';
	import Container from '$components/Container.svelte';
	import WorkCard from '$components/WorkCard.svelte';
	import { reveal } from '$motion/reveal.js';

</script>

<section id="projects" class="section">
	<Container>
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
		/* light band — the rest of the page is dark, so opt back into light ink */
		background: #ffffff;
		color: #1d1d1f;
		--c-ink: #1d1d1f;
		--c-ink-soft: #6e6e73;
		--c-line: #d2d2d7;
		--c-cursor: #1d1d1f;
		--c-cursor-ink: #ffffff;
	}
	.title {
		font-size: var(--fs-h2);
		font-weight: 700;
		letter-spacing: -0.045em;
		margin-bottom: 36px;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(1rem, 2vw, 1.75rem);
		align-items: stretch;
	}
	@media (max-width: 1024px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 560px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
