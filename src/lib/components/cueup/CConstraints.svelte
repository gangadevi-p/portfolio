<script>
	/** Constraints: four cards, each a tinted icon tile over a coloured title. */
	import { revealScale } from '$motion/reveal.js';

	let { items = [] } = $props();
</script>

<div class="grid">
	{#each items as c (c.title)}
		<article class="card cu-card t-{c.tone}" use:revealScale>
			<span class="tile"><img src={c.icon} alt="" loading="lazy" /></span>
			<h3>{c.title}</h3>
			<p>{c.text}</p>
		</article>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
		/* every card matches the tallest one in the row */
		align-items: stretch;
	}
	.card {
		padding: 18px 16px 26px;
		border-radius: var(--cu-radius-sm);
	}
	.tile {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 62px;
		height: 62px;
		border-radius: 14px;
		background: var(--tint);
		margin-bottom: 24px;
	}
	.tile img {
		width: 40px;
		height: 40px;
		object-fit: contain;
	}
	h3 {
		font-size: 18px;
		font-weight: 700;
		color: var(--ink);
		margin-bottom: 16px;
	}
	p {
		font-size: 16px;
		line-height: 1.5;
		color: var(--cu-ink-soft);
	}

	.t-violet {
		--ink: #8b5cf6;
		--tint: #ede9fe;
	}
	.t-pink {
		--ink: #db2777;
		--tint: #fce7f0;
	}
	.t-amber {
		--ink: #92400e;
		--tint: #fdf3e3;
	}
	.t-emerald {
		--ink: #059669;
		--tint: #e7f6ee;
	}
</style>
