<script>
	import { onMount } from 'svelte';

	let theme = $state('light');
	let transitionTimer;

	onMount(() => {
		theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
	});

	function toggleTheme() {
		const nextTheme = theme === 'dark' ? 'light' : 'dark';
		const root = document.documentElement;
		const directionClass = nextTheme === 'light' ? 'theme-to-light' : 'theme-to-dark';
		const applyTheme = () => {
			theme = nextTheme;
			root.dataset.theme = nextTheme;
		};

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (document.startViewTransition && !reducedMotion) {
			root.classList.add(directionClass);
			const transition = document.startViewTransition(applyTheme);
			transition.finished.finally(() => root.classList.remove(directionClass));
			return;
		}

		root.classList.add('theme-switching');
		requestAnimationFrame(applyTheme);
		clearTimeout(transitionTimer);
		transitionTimer = window.setTimeout(() => root.classList.remove('theme-switching'), 320);
	}
</script>

<button
	class="theme-toggle"
	type="button"
	aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
	aria-pressed={theme === 'dark'}
	onclick={toggleTheme}
>
	<span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
	<span class="sr-only">Switch to {theme === 'dark' ? 'light' : 'dark'} theme</span>
</button>

<style>
	.theme-toggle {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		padding: 0;
		border: 1px solid var(--c-line);
		border-radius: 50%;
		background: var(--c-surface);
		box-shadow: none;
		color: var(--c-ink);
		cursor: pointer;
		font-size: 1.25rem;
		line-height: 1;
		transition: transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out);
	}
	.theme-toggle:hover { transform: translateY(-2px); background: var(--c-surface-subtle); }
	.theme-toggle:focus-visible { outline: 3px solid var(--c-accent); outline-offset: 3px; }
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
