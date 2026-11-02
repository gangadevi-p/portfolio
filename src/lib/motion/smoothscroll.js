/**
 * Bridge to the Lenis instance created in the root layout, so any component
 * can request a smooth scroll to an element without prop-drilling it.
 */
let _lenis = null;

export function setLenis(instance) {
	_lenis = instance;
}

/**
 * Jump to the very top instantly — used when a new page opens, so it never
 * inherits the previous page's scroll position. Lenis keeps its own scroll
 * target, so it has to be reset too or it eases back to the old spot.
 */
export function scrollToTop() {
	if (typeof window === 'undefined') return;
	_lenis?.scrollTo(0, { immediate: true, force: true });
	window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

export function scrollToId(id, { offset = -72 } = {}) {
	const el = typeof document !== 'undefined' && document.getElementById(id);
	if (!el) return;
	if (_lenis) {
		_lenis.scrollTo(el, { offset, duration: 1.05 });
	} else {
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}

/** Scroll down by (most of) one screen — used by the pinned "scroll down" key. */
export function scrollByScreen(fraction = 0.85) {
	if (typeof window === 'undefined') return;
	const target = window.scrollY + window.innerHeight * fraction;
	if (_lenis) {
		_lenis.scrollTo(target, { duration: 1.05 });
	} else {
		window.scrollTo({ top: target, behavior: 'smooth' });
	}
}
