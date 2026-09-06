<script>
	import { reveal } from '$motion/reveal.js';
	import { tilt3d } from '$motion/scene3d.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	let { item, index = 0 } = $props();
</script>

<article class="card" use:reveal={{ delay: (index % 2) * 0.08 }}>
	<div class="card-3d" use:tilt3d>
		<a
			class="cover"
			href={`/work/${item.slug}`}
			aria-label={item.title}
			use:cursorLabel={{ label: item.title, variant: 'view' }}
		>
			<img src={item.cover} alt="" loading="lazy" />
			<span class="sheen" aria-hidden="true"></span>
		</a>
		<div class="meta">
			<h3>{item.title}</h3>
			<p class="summary">{item.summary}</p>
			<p class="line">
				<span>{item.role}</span>
				<span>{item.year}</span>
			</p>
			<ul class="tags">
				{#each item.tags as tag}<li>{tag}</li>{/each}
			</ul>
		</div>
	</div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
	}

	/* scroll-driven 3D layer — transform + opacity are written by `use:tilt3d` */
	.card-3d {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		transform-style: preserve-3d;
		will-change: transform, opacity;
	}

	.cover {
		position: relative;
		display: block;
		overflow: hidden;
		border-radius: var(--radius-card);
		border: 1.5px solid var(--c-ink);
		aspect-ratio: 4 / 3;
		transition:
			box-shadow 0.45s var(--ease-out),
			border-color 0.45s var(--ease-out);
	}
	.cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: scale var(--dur-med) var(--ease-out);
	}
	.cover:hover img {
		scale: 1.04;
	}
	/* moving highlight that sweeps across while the card is the active one */
	.sheen {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			105deg,
			transparent 30%,
			rgba(255, 255, 255, 0.35) 48%,
			transparent 66%
		);
		transform: translateX(-120%);
		opacity: 0;
		pointer-events: none;
	}

	/* `.is-active` is toggled from JS (scene3d), so mark it :global */
	.card-3d:global(.is-active) .cover {
		border-color: var(--c-accent);
		box-shadow: 0 26px 55px -20px rgba(var(--c-ink-rgb), 0.45);
	}
	.card-3d:global(.is-active) .sheen {
		opacity: 1;
		transform: translateX(120%);
		transition:
			transform 0.9s var(--ease-out),
			opacity 0.3s ease;
	}

	h3 {
		font-size: 1.25rem;
		font-weight: 700;
	}
	.summary {
		color: var(--c-ink-soft);
		margin-top: 0.25rem;
	}
	.line {
		display: flex;
		justify-content: space-between;
		font-size: var(--fs-small);
		color: var(--c-ink-soft);
		margin-top: 0.6rem;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		list-style: none;
		padding: 0;
		margin-top: 0.75rem;
	}
	.tags li {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		padding: 0.25rem 0.55rem;
		border: 1px solid var(--c-line);
		border-radius: 999px;
	}

	@media (prefers-reduced-motion: reduce) {
		.sheen {
			display: none;
		}
	}
</style>
