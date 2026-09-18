<script>
	import { nav, site } from '$data/site.js';
	import NavButton from './NavButton.svelte';
	import { navigation } from '$motion/navigation.svelte.js';
	import { base } from '$app/paths';
	import PortfolioAssistant from './PortfolioAssistant.svelte';
	import { page } from '$app/state';
	let onHome = $derived(page.route.id === '/');
	/** `label` keeps the two copies of this nav (hero + sticky) distinct to AT. */
	let { label = 'Primary', centered = true } = $props();
</script>

<nav class="nav" class:centered aria-label={label}>
	<a class="brand" href={`${base}/#me`}>
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

	<!-- Main sections share a centered pill. -->
	<ul class="pill">
		{#each nav as link (link.label)}
			<li>
				<NavButton
					href={`${base}/${link.href}`}
					label={link.label}
					wide={link.label === 'Me'}
					selected={onHome && link.label === navigation.active}
					onclick={() => (navigation.active = link.label)}
				/>
			</li>
		{/each}
	</ul>
	<div class="nav-actions">
		<PortfolioAssistant placement="nav" />
	</div>
</nav>

<style>
	.nav {
		position: relative;
		z-index: 13;
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
		font-weight: 600;
	}
	.pin {
		display: inline-flex;
	}
	.nav.centered {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
	}
	.centered .brand {
		justify-self: start;
	}
	.centered .pill {
		grid-column: 2;
		justify-self: center;
	}
	.nav-actions {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		justify-self: end;
	}
	/* the single pill that holds the whole menu */
	.pill {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		align-items: center;
		gap: 0.15rem;
		list-style: none;
		margin: 0;
		padding: 0.3rem;
		border: 1px solid rgb(0 0 0 / 8%);
		border-radius: 999px;
		background: rgb(255 255 255 / 72%);
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 80%),
			0 6px 20px rgb(0 0 0 / 6%);
		backdrop-filter: blur(16px) saturate(120%);
		-webkit-backdrop-filter: blur(16px) saturate(120%);
	}
	.pill::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background: linear-gradient(112deg, rgb(255 255 255 / 40%), transparent 45%);
	}
	.pill > li {
		position: relative;
		z-index: 1;
	}
	@media (max-width: 900px) {
		.nav.centered {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.75rem;
		}
		.centered .pill {
			grid-column: 1 / -1;
			grid-row: 2;
			max-width: 100%;
			justify-content: center;
		}
		.nav-actions {
			grid-column: 2;
			grid-row: 1;
		}
	}

	@media (max-width: 560px) {
		.nav {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}
		.pill {
			flex-wrap: wrap;
			row-gap: 0.15rem;
		}

	}
</style>
