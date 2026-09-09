import { loadGsap, prefersReducedMotion } from './gsap.js';

/**
 * Svelte action: fade-in + scale-up (+ a small rise) tied to the scrollbar
 * itself, so the element grows into place as it scrolls into view and gently
 * dims back as it leaves the top. Unlike `reveal`, this is *scrubbed* — it
 * tracks scrolling both ways rather than firing once.
 *
 *   <section use:scrollFade>
 *   <section use:scrollFade={{ y: 60, scale: 0.86 }}>
 *
 * Fail-safe: no-ops (element just stays visible) when JS is off or the visitor
 * has asked for reduced motion.
 */
export function scrollFade(node, options = {}) {
	if (prefersReducedMotion()) return;

	const { y = 44, scale = 0.9 } = options;
	let cleanup = () => {};

	loadGsap().then(({ gsap, ScrollTrigger }) => {
		// fade in + scale up as the block enters
		const inTrig = gsap.fromTo(
			node,
			{ autoAlpha: 0, y, scale },
			{
				autoAlpha: 1,
				y: 0,
				scale: 1,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: node,
					start: 'top 96%',
					end: 'top 60%',
					scrub: 0.4
				}
			}
		);

		// soft fade as it slides off the top — never fully gone
		const outTrig = gsap.fromTo(
			node,
			{ autoAlpha: 1 },
			{
				autoAlpha: 0.25,
				ease: 'none',
				immediateRender: false,
				scrollTrigger: {
					trigger: node,
					start: 'bottom 34%',
					end: 'bottom 6%',
					scrub: 0.4
				}
			}
		);

		cleanup = () => {
			inTrig.scrollTrigger?.kill();
			outTrig.scrollTrigger?.kill();
			inTrig.kill();
			outTrig.kill();
			ScrollTrigger.refresh();
		};
	});

	return {
		destroy() {
			cleanup();
		}
	};
}
