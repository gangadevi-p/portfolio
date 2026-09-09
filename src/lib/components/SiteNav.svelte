<script>
	import { nav, site } from '$data/site.js';
	import NavButton from './NavButton.svelte';
	import { navigation } from '$motion/navigation.svelte.js';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	let onHome = $derived(page.url.pathname === `${base}/`);
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

	<!-- Main sections share a centered pill; Resume sits opposite the location. -->
	<ul class="pill">
		{#each nav.filter((link) => link.label !== 'Resume') as link (link.label)}
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
	<div class="resume">
		<NavButton
			href={`${base}/#resume`}
			label="Resume"
			selected={onHome && navigation.active === 'Resume'}
			onclick={() => (navigation.active = 'Resume')}
		/>
	</div>
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
	.resume {
		justify-self: end;
		border: 1.5px solid var(--c-line);
		border-radius: 999px;
	}

	/* the single pill that holds the whole menu */
	.pill {
		display: flex;
		align-items: center;
		gap: 0.15rem;
		list-style: none;
		margin: 0;
		padding: 0.3rem;
		border: 1.5px solid var(--c-line);
		border-radius: 999px;
		background: color-mix(in srgb, var(--c-ink) 6%, transparent);
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
		.resume {
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
