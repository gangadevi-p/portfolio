<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$motion/gsap.js';
	import { setLenis } from '$motion/smoothscroll.js';
	import CustomCursor from '$components/CustomCursor.svelte';
	import SiteFooter from '$components/SiteFooter.svelte';

	let { children } = $props();

	onMount(() => {
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

<main>
	{@render children()}
</main>

<SiteFooter />
