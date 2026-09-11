<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$motion/gsap.js';
	import { setLenis } from '$motion/smoothscroll.js';
	import CustomCursor from '$components/CustomCursor.svelte';
	import StickyNav from '$components/StickyNav.svelte';
	import SiteFooter from '$components/SiteFooter.svelte';
	import { page } from '$app/state';

	let { children } = $props();
	const compactFooterPaths = new Set(['/work/geekbull/', '/work/adm-education-society/']);
	let compactFooter = $derived(compactFooterPaths.has(page.url.pathname));
	let pageSource = $derived(
		page.route.id === '/' ? 'src/routes/+page.svelte' : `src/routes${page.route.id}/+page.svelte`
	);
	let DevFileOverlay = $state();

	onMount(() => {
		if (import.meta.env.DEV) {
			import('$components/DevFileOverlay.svelte').then(({ default: component }) => {
				DevFileOverlay = component;
			});
		}

		if (prefersReducedMotion()) return;

		let lenis;
		let frame;
		let cancelled = false;

		Promise.all([import('lenis'), import('$motion/gsap.js').then((m) => m.loadGsap())]).then(
			([{ default: Lenis }, { ScrollTrigger }]) => {
				if (cancelled) return;
				lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
				setLenis(lenis);
				// keep scroll-triggered reveals in sync with the smooth scroller
				lenis.on('scroll', ScrollTrigger.update);
				const raf = (time) => {
					lenis.raf(time);
					frame = requestAnimationFrame(raf);
				};
				frame = requestAnimationFrame(raf);
			}
		);

		return () => {
			cancelled = true;
			if (frame) cancelAnimationFrame(frame);
			lenis?.destroy();
			setLenis(null);
		};
	});
</script>

<svelte:head>
	<title>Gangadevi — Product & UX Designer</title>
	<meta
		name="description"
		content="Portfolio of Gangadevi, a product and UX designer based in Bengaluru."
	/>
</svelte:head>

<CustomCursor />
<StickyNav />

<main data-dev-page-source={import.meta.env.DEV ? pageSource : undefined}>
	{@render children()}
</main>

<SiteFooter compact={compactFooter} />

{#if DevFileOverlay}
	<DevFileOverlay />
{/if}
