<script>
	import { work } from '$data/work.js';
	import Container from '$components/Container.svelte';
	import SectionHeading from '$components/SectionHeading.svelte';
	import WorkCard from '$components/WorkCard.svelte';
</script>

<section class="section">
	<Container>
		<SectionHeading id="projects" kicker="Selected" title="Projects" />
		<div class="grid">
			{#each work as item, i (item.slug)}
				<WorkCard {item} index={i} />
			{/each}
		</div>
	</Container>
</section>

<style>
	.section {
		padding-block: clamp(3rem, 9vw, 7rem);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem);
		row-gap: clamp(2.5rem, 7vw, 5rem);
		/* 3D stage for the scroll-driven card tilt */
		perspective: 1500px;
		perspective-origin: 50% 45%;
	}
	@media (max-width: 640px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.grid {
			perspective: none;
		}
	}
</style>
