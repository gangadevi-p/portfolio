<script>
	/** Outlined rounded-pill node for the IA / flow diagrams. */
	let { tone = 'dark', solid = false, children } = $props();
</script>

<span class="node" class:solid style="--c: var(--t-{tone}); --cbg: var(--t-{tone}-bg);">
	{@render children?.()}
</span>

<style>
	.node {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 0.5em 1em;
		border-radius: 999px;
		border: 2px solid var(--c);
		background: #fff;
		color: #454545;
		font-size: 0.86rem;
		font-weight: 600;
		line-height: 1.2;
	}
	.solid {
		background: var(--c);
		border-color: var(--c);
		color: #fff;
	}
</style>
