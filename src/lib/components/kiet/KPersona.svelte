<script>
	let { roll, name, branch, photo, pains = [], goals = [], goalLabel = 'Goal', flip = false } = $props();
</script>

<article class="persona" class:flip>
	<div class="card">
		<div class="id">
			<b>{roll}</b>
			<span>{name}</span>
			<span>{branch}</span>
		</div>
		<img src={photo} alt={name} loading="lazy" />
	</div>

	<div class="detail">
		<h4>Pain points</h4>
		<ul>
			{#each pains as p}<li>{p}</li>{/each}
		</ul>
		<h4>{goalLabel}</h4>
		<ul>
			{#each goals as g}<li>{g}</li>{/each}
		</ul>
	</div>
</article>

<style>
	.persona {
		display: grid;
		grid-template-columns: 260px 1fr;
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: start;
	}
	.persona.flip {
		grid-template-columns: 1fr 260px;
	}
	.persona.flip .card {
		order: 2;
	}

	.card {
		position: relative;
		aspect-ratio: 3 / 3.5;
		background: var(--k-orange);
		border-radius: 16px;
		overflow: hidden;
		box-shadow: var(--k-shadow-lift);
	}
	.id {
		position: absolute;
		inset: 1.1rem 1.1rem auto;
		z-index: 2;
		color: #fff;
		line-height: 1.35;
	}
	.id b {
		font-size: 1.15rem;
		font-weight: 800;
		letter-spacing: -0.01em;
	}
	.id span {
		display: block;
		font-size: 0.92rem;
		font-weight: 500;
		opacity: 0.95;
	}
	.card img {
		position: absolute;
		bottom: 0;
		left: 50%;
		translate: -50% 0;
		width: 108%;
		max-width: none;
		object-fit: contain;
		object-position: bottom;
	}

	.detail h4 {
		font-size: 1rem;
		font-weight: 800;
		color: var(--k-orange);
		margin: 0 0 0.5rem;
	}
	.detail h4:not(:first-child) {
		margin-top: 1.4rem;
	}
	.detail ul {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 0.35rem;
	}
	.detail li {
		position: relative;
		padding-left: 1.1rem;
		color: #5c5c5c;
	}
	.detail li::before {
		content: '•';
		position: absolute;
		left: 0.2rem;
		color: var(--k-ink-soft);
	}

	@media (max-width: 720px) {
		.persona,
		.persona.flip {
			grid-template-columns: 1fr;
		}
		.persona.flip .card {
			order: 0;
		}
		.card {
			max-width: 260px;
		}
	}
</style>
