<script>
	import { projects } from '$data/projects.js';
	import Container from '$components/Container.svelte';
	import SectionHeading from '$components/SectionHeading.svelte';
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
</script>

<section class="section">
	<Container>
		<SectionHeading id="playground" kicker="More" title="Playground" />

		<ul class="list">
			{#each projects as p, i (p.title)}
				<li use:reveal={{ y: 20, delay: (i % 3) * 0.05 }}>
					<a
						href={p.href}
						target="_blank"
						rel="noreferrer"
						use:cursorLabel={{ label: p.title, variant: 'link' }}
					>
						<span class="title">{p.title}</span>
						<span class="note">{p.note}</span>
						<span class="year">{p.year}</span>
						<span class="arrow" aria-hidden="true">↗</span>
					</a>
				</li>
			{/each}
		</ul>
	</Container>
</section>

<style>
	.section {
		padding-block: clamp(3rem, 9vw, 7rem);
	}
	.list {
		list-style: none;
		padding: 0;
		border-top: 1px solid var(--c-line);
	}
	.list li {
		border-bottom: 1px solid var(--c-line);
	}
	.list a {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr) auto auto;
		align-items: baseline;
		gap: 1.5rem;
		padding: 1.4rem 0;
		transition:
			padding-inline var(--dur-fast) var(--ease-out),
			background var(--dur-fast) var(--ease-out);
	}
	.list a:hover {
		padding-inline: 0.75rem;
		/* the indent alone was easy to miss — lift the row and its dimmed
		   secondary text so the whole line reads as the thing being hovered */
		background: rgba(var(--c-ink-rgb), 0.05);
	}
	.title {
		font-weight: 700;
	}
	.note,
	.year {
		color: var(--c-ink-soft);
		font-size: var(--fs-small);
		transition: color var(--dur-fast) var(--ease-out);
	}
	.list a:hover .note,
	.list a:hover .year {
		color: var(--c-ink);
	}
	.arrow {
		color: var(--c-accent);
	}
	@media (max-width: 640px) {
		.list a {
			grid-template-columns: 1fr auto;
			gap: 0.35rem 1rem;
		}
		.note {
			grid-column: 1 / -1;
			order: 3;
		}
	}
</style>
