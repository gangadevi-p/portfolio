import { loadGsap, prefersReducedMotion } from './gsap.js';

/**
 * Svelte action: subtle fade-in + scale-in (+ tiny rise) as the element scrolls
 * into view, once.
 *
 *   <div use:reveal>
 *   <div use:reveal={{ delay: 0.08 }}>
 *   <div use:reveal={{ y: 40, scale: 0.94, duration: 0.9 }}>
 *
 * Fail-safe: no-ops (element just stays visible) when JS is off or the visitor
 * has asked for reduced motion.
 */
export function reveal(node, options = {}) {
	if (prefersReducedMotion()) return;

	const {
		y = 16,
		scale = 0.965,
		duration = 0.8,
		delay = 0,
		start = 'top 88%'
	} = options;
	let cleanup = () => {};

	loadGsap().then(({ gsap, ScrollTrigger }) => {
		const anim = gsap.fromTo(
			node,
			{ autoAlpha: 0, y, scale },
			{
				autoAlpha: 1,
				y: 0,
				scale: 1,
				duration,
				delay,
				ease: 'power2.out',
				scrollTrigger: { trigger: node, start, once: true }
			}
		);
		cleanup = () => {
			anim.scrollTrigger?.kill();
			anim.kill();
			ScrollTrigger.refresh();
		};
	});

	return {
		destroy() {
			cleanup();
		}
	};
}

/** Alias — kept so existing imports keep working. */
export const revealScale = reveal;
