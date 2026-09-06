<script>
	import { nav, site } from '$data/site.js';
	let { active = 'ME' } = $props();
</script>

<nav class="nav" aria-label="Primary">
	<a class="brand" href="#me">
		<span class="pin" aria-hidden="true">
			<svg viewBox="0 0 24 24" width="16" height="16">
				<path
					fill="var(--c-accent)"
					d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
				/>
			</svg>
		</span>
		<span>{site.location}</span>
	</a>

	<ul class="links">
		{#each nav as link (link.href)}
			<li>
				<a href={link.href} aria-current={link.label === active ? 'page' : undefined}>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		font-weight: 600;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-weight: 700;
	}
	.pin {
		display: inline-flex;
	}
	.links {
		display: flex;
		gap: clamp(0.9rem, 2.5vw, 1.8rem);
		list-style: none;
		padding: 0;
	}
	.links a {
		position: relative;
		padding-block: 0.25rem;
	}
	.links a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform var(--dur-fast) var(--ease-out);
	}
	.links a:hover::after,
	.links a[aria-current='page']::after {
		transform: scaleX(1);
	}

	@media (max-width: 560px) {
		.nav {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}
	}
</style>
