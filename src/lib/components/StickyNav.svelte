<script>
	/**
	 * The navbar that drops in when you scroll UP, from anywhere on the page.
	 *
	 * The hero renders its own copy of <SiteNav> in the flow of its frame; this
	 * one is a fixed overlay that stays out of the way until it's wanted:
	 *   · near the top of the page it hides, because the hero's own nav is there
	 *   · scrolling down hides it
	 *   · scrolling up reveals it, in any section
	 */
	import { onMount } from 'svelte';
	import SiteNav from './SiteNav.svelte';
	import { nav } from '$data/site.js';
	import { navigation } from '$motion/navigation.svelte.js';

	/** px from the top of the page inside which the hero's own nav is showing */
	const TOP_GUARD = 140;
	/** ignore jitter smaller than this, so the bar doesn't flicker */
	const THRESHOLD = 6;

	let shown = $state(false);

	onMount(() => {
		let lastY = window.scrollY;
		let queued = false;

		const update = () => {
			queued = false;
			const y = window.scrollY;
			const delta = y - lastY;

			// Keep both navigation copies in sync with the section in view.
			const current = nav.find((link) => link.label === navigation.active);
			let sectionLink;
			for (const link of nav) {
				const section = document.querySelector(link.href);
				if (section && section.getBoundingClientRect().top <= 160) {
					if (sectionLink?.href !== link.href) sectionLink = link;
				}
			}
			if (sectionLink && current?.href !== sectionLink.href) {
				navigation.active = sectionLink.label;
			}

			if (y <= TOP_GUARD) {
				shown = false;
			} else if (delta < -THRESHOLD) {
				shown = true;
			} else if (delta > THRESHOLD) {
				shown = false;
			}

			if (Math.abs(delta) > THRESHOLD) lastY = y;
		};

		const onScroll = () => {
			if (queued) return;
			queued = true;
			requestAnimationFrame(update);
		};

		// Lenis drives the native scroll position, so plain scroll events are
		// enough — no need to subscribe to the smooth scroller itself.
		window.addEventListener('scroll', onScroll, { passive: true });
		update();

		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<div class="sticky-nav" class:shown inert={!shown}>
	<div class="inner">
		<SiteNav label="Primary, sticky" />
	</div>
</div>

<style>
	.sticky-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 60;
		padding: 0.7rem var(--pad-x);
		/* parked just above the viewport until it's called down */
		translate: 0 -100%;
		opacity: 0;
		pointer-events: none;
		transition:
			translate var(--dur-med) var(--ease-out),
			opacity var(--dur-fast) var(--ease-out);
	}
	.sticky-nav.shown {
		translate: 0 0;
		opacity: 1;
		pointer-events: auto;
	}
	.inner {
		display: flex;
		justify-content: center;
	}
	:global(.sticky-nav .nav.centered) {
		display: flex;
		justify-content: center;
		width: fit-content;
		max-width: 100%;
		padding: 0;
		border: 0;
		background: transparent;
		box-shadow: none;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
	}
	:global(.sticky-nav .brand),
	:global(.sticky-nav .resume) {
		display: none;
	}
	/* This is a compact scroll-only menu. Keeping the assistant launcher in
	   the main navigation avoids an extra control widening and offsetting the
	   pill as it drops back into view. */
	:global(.sticky-nav .nav-actions) {
		display: none !important;
	}
	:global(.sticky-nav .pill) {
		background: rgba(0, 0, 0, 0.72);
		border-color: rgba(255, 255, 255, 0.24);
		backdrop-filter: blur(14px) saturate(140%);
		-webkit-backdrop-filter: blur(14px) saturate(140%);
	}
	:global(.sticky-nav .pill a) {
		color: #f4f1ea;
		min-height: 38px;
		padding: 0.3rem 0.75rem 0.35rem;
		font-size: 0.9rem;
	}
	:global(.sticky-nav .pill a.wide) {
		padding-inline: 1.1rem;
	}

	@media (max-width: 560px) {
		.sticky-nav {
			padding: 0.55rem 0.75rem;
		}
		:global(.sticky-nav .pill a) {
			min-height: 34px;
			padding: 0.25rem 0.55rem 0.3rem;
			font-size: 0.78rem;
		}
		:global(.sticky-nav .pill a.wide) {
			padding-inline: 0.8rem;
		}
	}
</style>
