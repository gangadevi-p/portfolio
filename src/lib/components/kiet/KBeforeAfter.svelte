<script>
	import KPhone from './KPhone.svelte';
	import { revealScale } from '$motion/reveal.js';
	let { caption, before, after } = $props();
</script>

<div class="ba" use:revealScale>
	<p class="cap">{caption}</p>
	<div class="pair">
		<KPhone src={before.src} alt={before.alt} label="Before" width={210} tilt={-1} />
		<KPhone src={after.src} alt={after.alt} label="After" accent width={210} tilt={1} />
	</div>
</div>

<style>
	.ba {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}
	.cap {
		color: #5c5c5c;
		max-width: 34ch;
		font-size: 1rem;
	}
	.pair {
		display: flex;
		gap: clamp(1rem, 3vw, 2.25rem);
	}
	@media (max-width: 540px) {
		.pair {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
