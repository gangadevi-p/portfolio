<script>
	/** The fact strip under the overview: six labelled columns in one card. */
	import { revealScale } from '$motion/reveal.js';

	let { facts = [] } = $props();
</script>

<dl class="facts cu-card" style="--n:{facts.length}" use:revealScale>
	{#each facts as f (f.label)}
		<div class="fact">
			<dt>{f.label}</dt>
			{#if f.tools}
				<dd class="tools">
					{#each f.tools as t (t.alt)}
						<img src={t.src} alt={t.alt} class:round={t.round} loading="lazy" />
					{/each}
				</dd>
			{:else}
				{#each f.values as v (v)}
					<dd>{v}</dd>
				{/each}
			{/if}
		</div>
	{/each}
</dl>

<style>
	.facts {
		display: grid;
		/* column widths measured off the deck: name, audience, focus, dates, tools, role */
		grid-template-columns: 95px 177px 132px 181px 147px 1fr;
		gap: 0;
		width: 1020px;
		margin: 0;
		padding: 30px 30px 36px;
	}
	dt {
		font-size: 18px;
		font-weight: 700;
		color: #1e2a3a;
		margin-bottom: 20px;
		white-space: nowrap;
	}
	dd {
		margin: 0 0 18px;
		font-size: 16px;
		line-height: 1.4;
		color: var(--cu-ink-soft);
		padding-right: 16px;
	}
	dd:last-child {
		margin-bottom: 0;
	}
	.tools {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.tools img {
		width: 30px;
		height: 30px;
		object-fit: contain;
	}
	/* the Figma export carries square white corners — clip them back */
	.tools img.round {
		border-radius: 24%;
	}
</style>
