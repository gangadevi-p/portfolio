<script>
	import { onMount } from 'svelte';

	let dark = $state(false);

	function setTheme(next) {
		dark = next;
		document.documentElement.classList.toggle('dark', next);
		document.documentElement.dataset.theme = next ? 'dark' : 'light';
		try {
			localStorage.setItem('portfolio-theme', next ? 'dark' : 'light');
		} catch {
			/* The visual theme still works when storage is unavailable. */
		}
		window.dispatchEvent(new Event('portfolio-theme-change'));
	}

	onMount(() => {
		let saved = null;
		try {
			saved = localStorage.getItem('portfolio-theme');
		} catch {
			/* Private browsing can deny storage access. */
		}
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		setTheme(saved ? saved === 'dark' : prefersDark);

		const sync = () => (dark = document.documentElement.dataset.theme === 'dark');
		window.addEventListener('portfolio-theme-change', sync);
		return () => window.removeEventListener('portfolio-theme-change', sync);
	});
</script>

<button
	class="theme-toggle"
	type="button"
	aria-pressed={dark}
	aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
	title={dark ? 'Light theme' : 'Dark theme'}
	onclick={() => setTheme(!dark)}
>
	<svg class="sun" viewBox="0 0 24 24" aria-hidden="true">
		<circle cx="12" cy="12" r="3.25" />
		<path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.72 5.28l-1.42 1.42M6.7 17.3l-1.42 1.42M18.72 18.72 17.3 17.3M6.7 6.7 5.28 5.28" />
	</svg>
	<svg class="moon" viewBox="0 0 24 24" aria-hidden="true">
		<path d="M20.4 15.1A8.5 8.5 0 0 1 8.9 3.6 8.5 8.5 0 1 0 20.4 15.1Z" />
	</svg>
</button>

<style>
	.theme-toggle {
		position: relative;
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		padding: 0;
		border: 1px solid rgb(0 0 0 / 8%);
		border-radius: 50%;
		background: rgb(255 255 255 / 72%);
		color: #1d1d1f;
		box-shadow: 0 4px 14px rgb(0 0 0 / 6%);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
	}
	.theme-toggle:hover { transform: scale(1.06); }
	.theme-toggle:focus-visible { outline: 2px solid var(--c-accent); outline-offset: 3px; }
	svg {
		position: absolute;
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 1.8;
		transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
	}
	.moon { opacity: 0; transform: rotate(-35deg) scale(0.65); }
	:global(html:is(.dark, [data-theme='dark'])) .sun { opacity: 0; transform: rotate(35deg) scale(0.65); }
	:global(html:is(.dark, [data-theme='dark'])) .moon { opacity: 1; transform: rotate(0) scale(1); }
	:global(html:is(.dark, [data-theme='dark'])) .theme-toggle {
		border-color: rgb(255 255 255 / 16%);
		background: #2c2c2e;
		color: #f5f5f7;
		box-shadow: none;
	}
</style>
