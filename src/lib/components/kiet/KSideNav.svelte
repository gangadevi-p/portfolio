<script>
	import { onMount } from 'svelte';
	import { scrollToId } from '$motion/smoothscroll.js';

	let { sections = [], back = null } = $props();
	let active = $state(sections[0]?.id ?? '');

	onMount(() => {
		let raf = 0;
		const scan = () => {
			raf = 0;
			const line = 140; // px from the top of the viewport
			let current = sections[0]?.id ?? '';
			for (const s of sections) {
				const el = document.getElementById(s.id);
				if (el && el.getBoundingClientRect().top - line <= 0) current = s.id;
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

<nav class="sidenav" aria-label="Case study sections">
	{#if back}
		<a class="back" href={back.href}>← {back.label}</a>
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
	.sidenav {
		position: fixed;
		left: 0;
		top: 40%;
		translate: 0 -50%;
		z-index: 30;
		padding: 1rem 1rem 1rem 1.75rem;
		font-family: 'Poppins', system-ui, sans-serif;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}
	a {
		display: block;
		padding: 0.24rem 0;
		color: #a2a2ac;
		font-size: 0.82rem;
		font-weight: 600;
		line-height: 1.2;
		white-space: nowrap;
		transition: color 0.2s ease;
	}
	a:hover,
	a:focus-visible {
		color: #55555f;
		outline: none;
	}
	.active a {
		color: var(--k-orange, #f15a24);
	}

	.back {
		color: var(--k-ink-strong, #2c2c2c);
		font-weight: 700;
		margin-bottom: 0.9rem;
		padding-bottom: 0.9rem;
		border-bottom: 1px solid var(--k-rule, #e7e9f2);
	}
	.back:hover {
		color: var(--k-orange, #f15a24);
	}

	@media (max-width: 1200px) {
		.sidenav {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		a {
			transition: none;
		}
	}
</style>
