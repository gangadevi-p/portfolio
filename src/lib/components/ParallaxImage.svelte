<script>
	import { pointer } from '$motion/pointer.svelte.js';

	/**
	 * Image that drifts gently against the pointer and breathes on its own.
	 * `depth` is negative-friendly: pass a negative value to move opposite the
	 * floating icons (adds depth to the scene).
	 */
	let {
		src,
		alt = '',
		depth = -0.05,
		grayscale = true,
		float = true,
		class: klass = ''
	} = $props();

	let px = $derived(pointer.x * depth * 220);
	let py = $derived(pointer.y * depth * 140);
</script>

<div class="clip {klass}">
	<div
		class="parallax-layer"
		class:float
		style="transform: translate3d({px}px, {py}px, 0);"
	>
		<img {src} {alt} class:grayscale draggable="false" />
	</div>
</div>

<style>
	.clip {
		width: 100%;
		overflow: hidden;
	}
	.parallax-layer {
		transition: transform 0.7s var(--ease-out);
		will-change: transform;
	}
	.parallax-layer.float {
		animation: breathe 6s ease-in-out infinite alternate;
	}
	.grayscale {
		filter: grayscale(1) contrast(1.03);
	}
	@keyframes breathe {
		from {
			translate: 0 -6px;
		}
		to {
			translate: 0 6px;
		}
	}
</style>
