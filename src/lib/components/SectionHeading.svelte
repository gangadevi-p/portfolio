<script>
	import { reveal } from '$motion/reveal.js';
	let { kicker = '', title, id } = $props();
</script>

<header class="heading" {id} use:reveal>
	{#if kicker}<span class="kicker">{kicker}</span>{/if}
	<h2>{title}</h2>
</header>

<style>
	.heading {
		margin-bottom: clamp(1.5rem, 4vw, 3rem);
	}
	.kicker {
		display: block;
		font-size: var(--fs-small);
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--c-accent);
		margin-bottom: 0.5rem;
	}
	h2 {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: var(--fs-h2);
		line-height: 1;
	}
</style>
