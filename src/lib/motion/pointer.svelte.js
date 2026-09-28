/**
 * Shared pointer state, normalised to -1..1 on each axis relative to a target
 * element. Components read `pointer.x` / `pointer.y` and multiply by their own
 * depth factor for parallax.
 *
 * Usage:
 *   import { pointer } from '$motion/pointer.svelte.js';
 *   <div use:pointer.track> ... {pointer.x} ... </div>
 */

class Pointer {
	x = $state(0);
	y = $state(0);
	/** true once the user has actually moved the pointer (avoids a jump on load) */
	active = $state(false);

	/** Svelte action: attach to the element the parallax is measured against. */
	track = (node) => {
		const reduce =
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;

		const onMove = (event) => {
			const r = node.getBoundingClientRect();
			this.x = ((event.clientX - r.left) / r.width - 0.5) * 2;
			this.y = ((event.clientY - r.top) / r.height - 0.5) * 2;
			this.active = true;
		};
		const onLeave = () => {
			this.x = 0;
			this.y = 0;
			this.active = false;
		};

		node.addEventListener('pointermove', onMove, { passive: true });
		node.addEventListener('pointerleave', onLeave, { passive: true });

		return {
			destroy() {
				node.removeEventListener('pointermove', onMove);
				node.removeEventListener('pointerleave', onLeave);
			}
		};
	};
}

export const pointer = new Pointer();
