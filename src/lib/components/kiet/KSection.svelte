<script>
	import { revealScale } from '$motion/reveal.js';
	let { id, title, ink = false, children } = $props();
</script>

<section {id} class="k-section">
	<div class="inner">
		{#if title}
			<h2 class="k-title" class:ink use:revealScale>{title}</h2>
		{/if}
		{@render children?.()}
	</div>
</section>

<style>
	.inner {
		width: 100%;
		max-width: 1120px;
		margin-inline: auto;
		padding-inline: clamp(1.25rem, 5vw, 3.5rem);
	}
</style>
