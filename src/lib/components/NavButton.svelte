<script>
	let { href, label, selected = false, wide = false, onclick } = $props();
</script>

<a {href} {onclick} class:wide aria-current={selected ? 'location' : undefined}>{label}</a>

<style>
	a {
		display: grid;
		place-items: center;
		min-height: 44px;
		padding: 0.4rem 0.95rem 0.45rem;
		border-radius: 999px;
		white-space: nowrap;
		transition:
			background var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}
	a:hover {
		background: #1d1d1f;
		color: #fff;
	}
	:global(html.dark) a:hover {
		background: #f5f5f7;
		color: #1d1d1f;
	}
	a.wide {
		padding-inline: 1.65rem;
	}
	a[aria-current] {
		background: var(--c-coffee);
		color: #fff;
	}
	@media (max-width: 560px) {
		a {
			padding: 0.3rem 0.7rem;
			font-size: var(--fs-small);
		}
		a.wide {
			padding-inline: 1.25rem;
		}
	}
</style>
