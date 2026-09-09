<script>
	let { href, label, selected = false, wide = false, onclick } = $props();
</script>

<a {href} {onclick} class:wide aria-current={selected ? 'location' : undefined}>{label}</a>

<style>
	a {
		display: block;
		padding: 0.4rem 0.95rem 0.45rem;
		border-radius: 999px;
		white-space: nowrap;
		transition:
			background var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}
	a:hover {
		background: color-mix(in srgb, var(--c-ink) 12%, transparent);
	}
	a.wide {
		padding-inline: 1.4rem;
	}
	a[aria-current] {
		background: var(--c-coffee);
		color: #fff;
	}
	@media (max-width: 560px) {
		a {
			padding: 0.3rem 0.7rem 0.35rem;
			font-size: var(--fs-small);
		}
		a.wide {
			padding-inline: 1.1rem;
		}
	}
</style>
