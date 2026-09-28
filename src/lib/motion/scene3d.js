import { prefersReducedMotion } from './gsap.js';

/**
 * `use:tilt3d` — scroll-driven 3D for a set of cards.
 *
 * As the page scrolls, each registered element is tilted / pushed back / dimmed
 * by how far its centre sits from the middle of the viewport. The one closest to
 * centre snaps flat + bright and gets an `.is-active` class (hook for shadow /
 * highlight). Give the common ancestor `perspective` for the effect to read.
 *
 * No-op under reduced motion — cards stay flat and the reveal still runs.
 */

const registered = new Set();
let raf = 0;
let bound = false;

function frame() {
	const mid = window.innerHeight / 2;
	let best = null;
	let bestDist = Infinity;

	for (const el of registered) {
		const r = el.getBoundingClientRect();
		const centre = r.top + r.height / 2;
		const rel = (centre - mid) / window.innerHeight; // ~ -0.6 … 0.6
		const c = Math.max(-1, Math.min(1, rel * 1.7));
		const abs = Math.abs(c);

		const rotX = -c * 11; // deg — above centre pitches back, below pitches forward
		const tz = -abs * 130; // px — recede as it leaves centre
		const scale = 1 - abs * 0.1;
		const opacity = 1 - abs * 0.5;

		el.style.transform = `translate3d(0, 0, ${tz.toFixed(1)}px) rotateX(${rotX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
		el.style.opacity = opacity.toFixed(3);

		if (abs < bestDist) {
			bestDist = abs;
			best = el;
		}
	}

	for (const el of registered) {
		el.classList.toggle('is-active', el === best && bestDist < 0.3);
	}

	raf = 0;
}

function schedule() {
	if (!raf) raf = requestAnimationFrame(frame);
}

export function tilt3d(node) {
	if (prefersReducedMotion()) return;

	registered.add(node);

	if (!bound) {
		bound = true;
		addEventListener('scroll', schedule, { passive: true });
		addEventListener('resize', schedule, { passive: true });
	}
	schedule();

	return {
		destroy() {
			registered.delete(node);
			node.style.transform = '';
			node.style.opacity = '';
			node.classList.remove('is-active');
			if (registered.size === 0 && bound) {
				bound = false;
				removeEventListener('scroll', schedule);
				removeEventListener('resize', schedule);
				if (raf) cancelAnimationFrame(raf);
				raf = 0;
			}
		}
	};
}
