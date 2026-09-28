<script>
	import { toneVars } from './tone.js';
	let { tone = 'dark', outline = false, dot = true, children } = $props();
</script>

<span class="k-pill" class:no-dot={!dot} class:outline style={toneVars(tone)}>
	{@render children?.()}
</span>

<style>
	.outline {
		background: transparent;
		border: 1.5px solid var(--pill-fg);
	}
</style>
