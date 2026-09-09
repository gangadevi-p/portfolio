<script>
	/**
	 * User persona — a photo tile (the wave crest and name tag are baked into
	 * that image) next to coded context/behaviour/pain-point/goal blocks. The
	 * outer wrapper is NOT filled; each block is its own white card. Everything
	 * but the headshot is real text, so it reads and reflows like the rest of
	 * the case study.
	 *
	 * The two columns are equal width. `variant` picks which blocks stack where:
	 *  - 'landlord': photo + context (with property status folded in) on the
	 *    left, the three lists stacked on the right.
	 *  - 'tenant': context + behaviours + pain points on the left, the photo and
	 *    goals on the right.
	 */
	import { revealScale } from '$motion/reveal.js';

	let {
		variant = 'landlord',
		photo,
		context,
		stats = null,
		behaviours = [],
		painPoints = [],
		goals = []
	} = $props();
</script>

{#snippet card()}
	<div class="card" use:revealScale>
		<img src={photo.src} alt={photo.alt} loading="lazy" />
	</div>
{/snippet}

{#snippet contextBlock()}
	<div class="block">
		<h3>Context</h3>
		<p>{context}</p>

		{#if stats}
			<h3 class="props-head">Property Status:</h3>
			<div class="stats">
				{#each stats as s (s.label)}
					<div class="stat">
						<b style="color:{s.color}">{s.n}</b>
						<span>{s.label}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet behavioursBlock()}
	<div class="block">
		<h3>Current Behaviours</h3>
		<ul>
			{#each behaviours as b (b)}<li>{b}</li>{/each}
		</ul>
	</div>
{/snippet}

{#snippet painBlock()}
	<div class="block">
		<h3>Pain Points</h3>
		<ul>
			{#each painPoints as p (p)}<li>{p}</li>{/each}
		</ul>
	</div>
{/snippet}

{#snippet goalsBlock()}
	<div class="block">
		<h3>Goals</h3>
		<ul>
			{#each goals as g (g)}<li>{g}</li>{/each}
		</ul>
	</div>
{/snippet}

<div class="persona" class:tenant={variant === 'tenant'}>
	{#if variant === 'tenant'}
		<div class="col">
			{@render contextBlock()}
			{@render behavioursBlock()}
			{@render painBlock()}
		</div>
		<div class="col">
			{@render card()}
			{@render goalsBlock()}
		</div>
	{:else}
		<div class="col">
			{@render card()}
			{@render contextBlock()}
		</div>
		<div class="col">
			{@render behavioursBlock()}
			{@render painBlock()}
			{@render goalsBlock()}
		</div>
	{/if}
</div>

<style>
	/* equal columns; the wrapper itself is unfilled — each block is a card */
	.persona {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 30px 44px;
		align-items: start;
	}
	.col {
		display: flex;
		flex-direction: column;
		gap: 30px;
		min-width: 0;
	}

	/* Spread the stacked blocks so the two columns line up top and bottom
	   instead of leaving a ragged gap at the bottom.
	   - landlord: only the text column (Behaviours / Pain Points / Goals)
	   - tenant: both columns, so the photo+Goals side tracks the text side */
	.persona:not(.tenant) .col:last-child,
	.persona.tenant .col {
		align-self: stretch;
		justify-content: space-between;
	}
	/* tighten the gaps between the stacked cards so a column comes down to the
	   height of its photo-bearing partner instead of leaving a big spread */
	.persona:not(.tenant) .col:last-child,
	.persona.tenant .col {
		gap: 14px;
	}

	/* each Context / Behaviours / Pain Points / Goals block = one white card */
	.block {
		background: var(--cu-card);
		border-radius: var(--cu-radius-sm);
		box-shadow: var(--cu-shadow);
		padding: 26px 28px;
	}

	/* ---------- photo card ---------- */
	/* the persona images already carry the wave crest and name tag, so the
	   card just sizes the asset to the column */
	.card img {
		display: block;
		width: 100%;
		height: auto;
	}

	/* ---------- text blocks ---------- */
	.block h3 {
		font-size: 18px;
		font-weight: 700;
		color: #1e2a3a;
		margin-bottom: 14px;
	}
	.block .props-head {
		margin-top: 16px;
		margin-bottom: 10px;
	}
	.block p {
		font-size: 16px;
		line-height: 1.6;
		color: var(--cu-ink-soft);
	}
	.block ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.block li {
		position: relative;
		padding-left: 16px;
		font-size: 16px;
		line-height: 1.5;
		color: var(--cu-ink-soft);
	}
	.block li::before {
		content: '•';
		position: absolute;
		left: 2px;
		color: #9aa1ab;
	}

	/* ---------- property status chips ---------- */
	.stats {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
	.stat {
		flex: 1;
		min-width: 90px;
		border-radius: 14px;
		padding: 0 8px;
		text-align: center;
	}
	.stat b {
		display: block;
		font-size: 18px;
		font-weight: 700;
		line-height: 1.2;
	}
	.stat span {
		font-size: 16px;
		font-weight: 500;
		color: var(--cu-ink-soft);
	}

	@media (max-width: 760px) {
		.persona,
		.persona.tenant {
			grid-template-columns: 1fr;
		}
		.persona.tenant .col:first-child {
			order: 2;
		}
	}
</style>
