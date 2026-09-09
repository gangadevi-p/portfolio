<script>
	import KNode from './KNode.svelte';
	import { revealScale } from '$motion/reveal.js';
	let { spine = [], branches = [], quickActions = [] } = $props();
</script>

<div class="flow" use:revealScale>
	<div class="scroll">
		<!-- spine -->
		<div class="chain spine">
			{#each spine as step, i}
				{#if i > 0}<span class="arw" aria-hidden="true">→</span>{/if}
				<KNode tone={step.tone} solid={step.tone === 'orange'}>{step.label}</KNode>
			{/each}
		</div>

		<p class="from">from <b>Home</b></p>

		{#each branches as b}
			{#if b.steps.length > 1}
				<div class="chain">
					{#each b.steps as s, i}
						{#if i > 0}<span class="arw" aria-hidden="true">→</span>{/if}
						<KNode tone={b.tone} solid={s === 'End'}>{s}</KNode>
					{/each}
				</div>
			{/if}
		{/each}

		<!-- quick actions expand -->
		<div class="qa">
			<div class="qa-head"><KNode tone="orange" solid>Quick actions</KNode></div>
			<div class="qa-rows">
				{#each quickActions as q}
					<div class="chain">
						{#each q.steps as s, i}
							{#if i > 0}<span class="arw" aria-hidden="true">→</span>{/if}
							<KNode tone={q.tone} solid={s === 'End'}>{s}</KNode>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.scroll {
		overflow-x: auto;
		padding-bottom: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.chain {
		display: flex;
		align-items: center;
		gap: 0;
		width: max-content;
	}
	.spine {
		margin-bottom: 0.5rem;
	}
	.arw {
		position: relative;
		width: 2rem;
		height: 2px;
		margin-inline: -1px;
		background: currentColor;
		color: var(--k-ink-soft);
		font-size: 0;
		flex: none;
	}
	.arw::after {
		content: '';
		position: absolute;
		right: -1px;
		top: 50%;
		translate: 0 -50%;
		border-block: 5px solid transparent;
		border-left: 7px solid currentColor;
	}
	.from {
		font-size: 0.9rem;
		color: var(--k-ink-soft);
	}
	.from b {
		color: var(--k-orange);
	}
	.qa {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		width: max-content;
		padding: 1rem;
		border: 2px dashed var(--t-orange);
		border-radius: 16px;
	}
	.qa-head {
		padding-top: 0.35rem;
	}
	.qa-rows {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}
</style>
