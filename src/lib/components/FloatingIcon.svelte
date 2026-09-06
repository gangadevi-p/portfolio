<script>
	import { pointer } from '$motion/pointer.svelte.js';

	/**
	 * One floating app badge.
	 *   - positioning lives on the parent (.icon-slot)
	 *   - .parallax-layer  → pointer parallax (transform + transition)
	 *   - .bob             → idle bob (CSS keyframes on transform)
	 * The two transforms never collide because they sit on different elements.
	 */
	let { name, src, size = 52, depth = 0.1, index = 0 } = $props();

	const bobDuration = $derived(3 + (index % 3) * 0.7); // s
	const bobDelay = $derived(index * -0.9); // s, negative = desynchronised start

	let px = $derived(pointer.x * depth);
	let py = $derived(pointer.y * depth);
</script>

<div
	class="parallax-layer"
	style="transform: translate3d(calc({px} * var(--parallax-range)), calc({py} * var(--parallax-range)), 0);"
>
	<div class="bob" style="animation-duration: {bobDuration}s; animation-delay: {bobDelay}s;">
		<img {src} alt={name} width={size} height={size} loading="lazy" draggable="false" />
	</div>
</div>

<style>
	.parallax-layer {
		transition: transform var(--dur-med) var(--ease-out);
		will-change: transform;
	}
	.bob {
		animation-name: bob;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		will-change: transform;
	}
	.bob img {
		filter: drop-shadow(0 14px 22px rgba(40, 20, 15, 0.22));
		pointer-events: none;
		user-select: none;
	}
</style>
