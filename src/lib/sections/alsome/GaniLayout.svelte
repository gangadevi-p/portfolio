<script>
	/** Original "Also me" gallery composition, kept intact for reuse. */
	import Layout1 from './Layout1.svelte';
	import Layout2 from './Layout2.svelte';
	import Layout3 from './Layout3.svelte';
	import Layout4 from './Layout4.svelte';
</script>

<div class="gani-layout" aria-label="Personal gallery — Gani layout">
	<div class="row">
		<Layout1 />
	</div>
	<div class="row cluster">
		<div class="cluster-main">
			<Layout2 />
			<Layout3 />
		</div>
		<Layout4 />
	</div>
</div>

<style>
	.gani-layout {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 72%;
		margin: 0 auto;
	}
	.row { width: 100%; }
	.cluster {
		display: flex;
		align-items: stretch;
		gap: 20px;
	}
	.cluster-main {
		display: flex;
		flex: 0 0 72%;
		flex-direction: column;
		gap: 20px;
		min-width: 0;
	}
	:global(img) {
		border-radius: 28px;
		transition: transform var(--dur-med) var(--ease-out), filter var(--dur-med) var(--ease-out);
	}
	:global(img:hover) {
		transform: scale(1.02);
		filter: brightness(1.04) saturate(1.05);
	}
	@media (prefers-reduced-motion: reduce) {
		:global(img),
		:global(img:hover) {
			transform: none;
			filter: none;
			transition: none;
		}
	}
	@media (max-width: 760px) {
		.gani-layout { width: 100%; }
	}
</style>
