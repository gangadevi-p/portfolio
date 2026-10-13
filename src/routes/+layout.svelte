<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import { prefersReducedMotion } from '$motion/gsap.js';
	import { setLenis, scrollToTop } from '$motion/smoothscroll.js';
	import { prewarmWorkPages } from '$motion/prewarm.js';
	import CustomCursor from '$components/CustomCursor.svelte';
	import StickyNav from '$components/StickyNav.svelte';
	import SiteFooter from '$components/SiteFooter.svelte';
	import { page } from '$app/state';
	import { site } from '$data/site.js';

	let { children } = $props();

	// Link-preview text per page; anything not listed falls back to the home copy.
	const pageMeta = {
		'/work/kiet-student-app': {
			title: 'KIET Student App — Case study',
			description: 'One app for announcements, attendance and campus services — live on Google Play with 6,061 acquisitions.'
		},
		'/work/relay': {
			title: 'Relay — Case study',
			description: 'A shared view of rent and repairs for self-managing landlords and their tenants.'
		},
		'/work/geekbull': {
			title: 'Geekbull — UI/UX internship work',
			description: 'An HRMS platform, a chatbot and a data product designed during a UI/UX internship.'
		},
		'/work/adm-educational-welfare-society': {
			title: 'ADM Educational Welfare Society — Poster series',
			description: 'A daily social-media poster series, one idea per issue.'
		}
	};
	let meta = $derived(
		pageMeta[page.route.id] ?? { title: `${site.name} — ${site.role}`, description: site.description }
	);
	// crawlers want an absolute image URL; site.url is set once the site is deployed
	const ogImage = `${site.url}/og-image.png`;
	const compactFooterPaths = new Set(['/work/geekbull/', '/work/adm-educational-welfare-society/']);
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

	// A different page always opens at its top. Same-page hash links and the
	// browser's back/forward (which restore their own position) are left alone.
	afterNavigate((navigation) => {
		if (navigation.type === 'popstate') return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
		scrollToTop();
	});

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
				// the new page must be at its top before the transition snapshots it
				if (navigation.type !== 'popstate') scrollToTop();
			});
			transition.finished.finally(() => document.documentElement.classList.remove(transitionClass));
		});
	});

	onMount(() => {
		// on the home page, get the case studies' first-screen images ready
		if (page.route.id === '/') prewarmWorkPages();

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
	<meta name="description" content={meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Gangadevi — Product & UX Designer" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<CustomCursor />
<StickyNav />

<main class:home-route={homeRoute}>
	{@render children()}
</main>

<SiteFooter compact={compactFooter} home={homeFooter} />
