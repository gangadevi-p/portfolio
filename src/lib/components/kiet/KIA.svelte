<script>
	import KNode from './KNode.svelte';
	import { revealScale } from '$motion/reveal.js';
	let { groups = [] } = $props();
</script>

<div class="ia" use:revealScale>
	{#each groups as g (g.root)}
		<div class="tree" style="--c: var(--t-{g.tone});">
			<div class="root"><KNode tone={g.tone}>{g.root}</KNode></div>
			<div class="stem" aria-hidden="true"></div>

			{#if g.grid}
				<div class="grid">
					{#each g.grid as item}
						<KNode tone={g.tone}>{item}</KNode>
					{/each}
				</div>
			{:else}
				<ul class="children">
					{#each g.children as c}
						<li><KNode tone={g.tone}>{c}</KNode></li>
					{/each}
				</ul>
			{/if}
		</div>
	{/each}
</div>

<style>
	.ia {
		display: flex;
		flex-wrap: wrap;
		gap: clamp(1.5rem, 4vw, 2.75rem) clamp(1.25rem, 3vw, 2.25rem);
		align-items: flex-start;
	}
	.tree {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
	.stem {
		width: 2px;
		height: 22px;
		background: var(--c);
		opacity: 0.5;
	}
	.children {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
		align-items: center;
	}
	.children li {
		position: relative;
	}
	.children li + li::before {
		content: '';
		position: absolute;
		top: -0.55rem;
		left: 50%;
		width: 2px;
		height: 0.55rem;
		background: var(--c);
		opacity: 0.5;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.55rem;
		padding: 0.9rem;
		border: 2px solid var(--c);
		border-radius: 16px;
	}
</style>
