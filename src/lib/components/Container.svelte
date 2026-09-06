<script>
	/** Centered max-width wrapper used by every section. */
	let { as = 'div', class: klass = '', children, ...rest } = $props();
</script>

<svelte:element this={as} class="container {klass}" {...rest}>
	{@render children?.()}
</svelte:element>

<style>
	.container {
		width: 100%;
		max-width: var(--maxw);
		margin-inline: auto;
		padding-inline: var(--pad-x);
	}
</style>
