<script>
	/**
	 * "Also me" — the big layout. It owns the section chrome (heading, spacing,
	 * light palette) and composes the row layouts. Layout1 is a full-width strip;
	 * Layout2 + Layout3 stack in a 65% column with Layout4 filling the rest.
	 */
	import Layout1 from '$sections/alsome/Layout1.svelte';
	import Layout2 from '$sections/alsome/Layout2.svelte';
	import Layout3 from '$sections/alsome/Layout3.svelte';
	import Layout4 from '$sections/alsome/Layout4.svelte';
	import { reveal } from '$motion/reveal.js';
</script>

<section id="also-me" class="section">
	<div class="inner">
		<header class="head" use:reveal>
			<p>Beyond the screen</p>
			<h2>Also me.</h2>
		</header>

		<div class="stack">
			<div class="row" use:reveal={{ y: 24 }}>
				<Layout1 />
			</div>
			<div class="row cluster" use:reveal={{ y: 24 }}>
				<div class="cluster-main">
					<Layout2 />
					<Layout3 />
				</div>
				<Layout4 />
			</div>
		</div>
	</div>
</section>

<style>
	.section {
		padding-block: clamp(4rem, 10vw, 8rem);
		background: #fff;
		color: #1d1d1f;
		--c-cursor: #1d1d1f;
		--c-cursor-ink: #fff;
	}
	/* Wider than the site's standard container so Layout 2 + Layout 3 get more
	   room. */
	.inner {
		width: 100%;
		max-width: 90rem;
		margin-inline: auto;
		padding-inline: clamp(1.25rem, 4vw, 3.5rem);
	}
	.head {
		max-width: 46rem;
		margin: 0 auto clamp(2.5rem, 6vw, 4.5rem);
		text-align: center;
	}
	.head p {
		margin-bottom: 0.55rem;
		color: #6e6e73;
		font-size: var(--fs-small);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.head h2 {
		font-size: clamp(2.5rem, 7vw, 5.5rem);
		font-weight: 800;
		letter-spacing: -0.06em;
		line-height: 0.95;
	}
	.stack {
		display: flex;
		flex-direction: column;
		gap: 24px; /* space between the layout rows */
		width: 100%;
		margin: 0 auto;
	}
	.row {
		width: 100%;
	}
	/* rounded corners on every image in the gallery */
	.stack :global(img) {
		border-radius: 24px;
		transition:
			transform var(--dur-med) var(--ease-out),
			filter var(--dur-med) var(--ease-out);
	}
	/* quiet hover: a small zoom + brightness lift, no looping motion */
	.stack :global(img:hover) {
		transform: scale(1.02);
		filter: brightness(1.04) saturate(1.05);
	}
	@media (prefers-reduced-motion: reduce) {
		.stack :global(img) {
			transition: none;
		}
		.stack :global(img:hover) {
			transform: none;
			filter: none;
		}
	}
	/* Layout 2 + Layout 3 in a 65% column, Layout 4 filling the rest and
	   matching that column's height. */
	.cluster {
		display: flex;
		align-items: stretch;
		gap: 24px;
	}
	.cluster-main {
		display: flex;
		flex-direction: column;
		gap: 24px;
		flex: 0 0 72%; /* wider Layout 2 / Layout 3; Layout 4 takes the slimmer rest */
		min-width: 0;
	}
</style>
