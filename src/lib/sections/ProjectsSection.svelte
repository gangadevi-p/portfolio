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
		background: #eef1f6;
		color: #241a16;
		--c-ink: #241a16;
		--c-ink-soft: #8a8480;
		--c-line: rgba(36, 26, 22, 0.14);
		--c-cursor: #241a16;
		--c-cursor-ink: #f7f5f0;
	}
	.title {
		font-size: clamp(1.5rem, 3.5vw, 2.25rem);
		font-weight: 800;
		letter-spacing: -0.02em;
		margin-bottom: clamp(2rem, 5vw, 3.5rem);
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
