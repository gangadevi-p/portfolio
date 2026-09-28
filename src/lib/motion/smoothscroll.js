/**
 * Bridge to the Lenis instance created in the root layout, so any component
 * can request a smooth scroll to an element without prop-drilling it.
 */
let _lenis = null;

export function setLenis(instance) {
	_lenis = instance;
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
