<script>
	import { onMount } from 'svelte';
	import { scrollToId } from '$motion/smoothscroll.js';

	let { sections = [], back = null } = $props();
	let active = $state(sections[0]?.id ?? '');

	onMount(() => {
		let raf = 0;
		const scan = () => {
			raf = 0;
			const marker = window.innerHeight * 0.35;
			let current = sections[0]?.id ?? '';
			for (const s of sections) {
				const el = document.getElementById(s.id);
				if (el && el.getBoundingClientRect().top <= marker) current = s.id;
			}
			active = current;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(scan);
		};

		scan();
		addEventListener('scroll', onScroll, { passive: true });
		addEventListener('resize', onScroll, { passive: true });
		return () => {
			removeEventListener('scroll', onScroll);
			removeEventListener('resize', onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	});

	function go(e, id) {
		e.preventDefault();
		active = id;
		scrollToId(id);
	}
</script>

<nav class="toc" aria-label="Case study sections">
	{#if back}
		<a class="back" href={back.href}>
			<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
				<path
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19 12H5m0 0 6-6m-6 6 6 6"
				/>
			</svg>
			Back
		</a>
	{/if}
	<ul>
		{#each sections as s (s.id)}
			<li class:active={active === s.id}>
				<a href={'#' + s.id} onclick={(e) => go(e, s.id)}>{s.label}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.toc {
		position: fixed;
		left: 27px;
		top: 72px;
		width: 210px;
		max-height: calc(100dvh - 260px);
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width: none;
		z-index: 40;
		padding-right: 12px;
		font-family: 'Poppins', system-ui, sans-serif;
	}
	.toc::-webkit-scrollbar {
		display: none;
	}

	.back {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		margin: 0 0 12px 11px;
		font-size: 15px;
		font-weight: 600;
		color: var(--k-ink-strong, #2c2c2c);
	}
	.back:hover,
	.back:focus-visible {
		color: var(--c-coffee, #3a221d);
		outline: none;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 2px;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	li {
		font-size: 16px;
		line-height: 1.5;
	}
	li a {
		display: inline-flex;
		align-items: center;
		padding: 6px 14px;
		border-radius: 50px;
		color: #6b7480;
		font-weight: 500;
		white-space: nowrap;
		transition:
			background 0.18s ease,
			color 0.18s ease,
			font-weight 0.18s ease;
	}
	li:not(.active) a:hover,
	li:not(.active) a:focus-visible {
		background: color-mix(in srgb, var(--k-ink, #4c4c4c) 12%, transparent);
		color: var(--k-ink-strong, #2c2c2c);
		font-weight: 600;
		outline: none;
	}
	li.active a,
	li.active a:hover,
	li.active a:focus-visible {
		background: #000;
		color: #fff;
		font-weight: 600;
	}

	@media (max-width: 1200px) {
		.toc {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		li a {
			transition: none;
		}
	}
</style>
