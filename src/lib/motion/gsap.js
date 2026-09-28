/**
 * Lazy, browser-only GSAP loader. Keeps GSAP + ScrollTrigger out of the SSR
 * bundle and out of the critical path.
 *
 *   const { gsap, ScrollTrigger } = await loadGsap();
 */
let promise;

export function loadGsap() {
	if (!promise) {
		promise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
			([core, st]) => {
				const gsap = core.gsap ?? core.default;
				const ScrollTrigger = st.ScrollTrigger ?? st.default;
				gsap.registerPlugin(ScrollTrigger);
				return { gsap, ScrollTrigger };
			}
		);
	}
	return promise;
}

/** True when the visitor asked for reduced motion. Safe to call on the server. */
export function prefersReducedMotion() {
	return (
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}
