<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { prefersReducedMotion } from '$motion/gsap.js';
	import { setLenis } from '$motion/smoothscroll.js';
	import CustomCursor from '$components/CustomCursor.svelte';
	import StickyNav from '$components/StickyNav.svelte';
	import SiteFooter from '$components/SiteFooter.svelte';
	import { page } from '$app/state';

	let { children } = $props();
	const compactFooterPaths = new Set(['/work/geekbull/', '/work/adm-education-society/']);
	let compactFooter = $derived(compactFooterPaths.has(page.url.pathname));
	let homeFooter = $derived(page.route.id === '/');
	let homeRoute = $derived(page.route.id === '/');

	function createPageOverlay() {
		const overlay = document.createElement('div');
		overlay.className = 'page-transition-overlay';
		document.body.append(overlay);
		return overlay;
	}

	function runFallbackTransition(navigation, returnsHome) {
		return new Promise((resolve) => {
			const overlay = createPageOverlay();
			const timing = { duration: 520, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)', fill: 'forwards' };

			if (returnsHome) {
				resolve();
				setTimeout(() =>
					overlay.animate(
						[
							{ clipPath: 'circle(160% at 50% 100%)' },
							{ clipPath: 'circle(0% at 50% 100%)' }
						],
						timing
					).finished.finally(() => overlay.remove()),
					40
				);
				return;
			}

			overlay
				.animate(
					[
						{ clipPath: 'circle(0% at 50% 100%)' },
						{ clipPath: 'circle(160% at 50% 100%)' }
					],
					timing
				)
				.finished.then(() => {
					resolve();
					return new Promise((finish) => setTimeout(finish, 80));
				})
				.then(() => overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: 'ease-out', fill: 'forwards' }).finished)
				.finally(() => overlay.remove());
		});
	}

	onNavigate((navigation) => {
		const opensSubpage = navigation.type === 'link' && navigation.to?.route.id && navigation.to.route.id !== '/';
		const returnsHome = navigation.to?.url.pathname === '/' && navigation.from?.url.pathname !== '/';
		if ((!opensSubpage && !returnsHome) || prefersReducedMotion()) return;
		if (!document.startViewTransition) return runFallbackTransition(navigation, returnsHome);

		return new Promise((resolve) => {
			const transitionClass = returnsHome ? 'page-returning' : 'page-transitioning';
			document.documentElement.classList.add(transitionClass);
			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
			transition.finished.finally(() => document.documentElement.classList.remove(transitionClass));
		});
	});

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
<StickyNav />

<main class:home-route={homeRoute}>
	{@render children()}
</main>

<SiteFooter compact={compactFooter} home={homeFooter} />
