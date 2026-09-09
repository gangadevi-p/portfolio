<script>
	import { work } from '$data/work.js';
	import Container from '$components/Container.svelte';
	import WorkCard from '$components/WorkCard.svelte';
	import { reveal } from '$motion/reveal.js';

	/* two independent columns so cards stagger like the reference */
	const left = work.filter((_, i) => i % 2 === 0);
	const right = work.filter((_, i) => i % 2 === 1);
</script>

<section id="projects" class="section">
	<Container>
		<h2 class="title" use:reveal>Projects</h2>

		<div class="cols">
			<div class="col">
				{#each left as item, i (item.title)}
					<WorkCard {item} index={i * 2} />
				{/each}
			</div>
			<div class="col">
				{#each right as item, i (item.title)}
					<WorkCard {item} index={i * 2 + 1} />
				{/each}
			</div>
		</div>
	</Container>
</section>

<style>
	.section {
		padding-block: clamp(3.5rem, 10vw, 8rem);
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
	.cols {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(1.25rem, 3vw, 2rem);
		align-items: start;
	}
	.col {
		display: flex;
		flex-direction: column;
		gap: clamp(1.25rem, 3vw, 2rem);
	}
	@media (max-width: 760px) {
		.cols {
			grid-template-columns: 1fr;
		}
	}
</style>
