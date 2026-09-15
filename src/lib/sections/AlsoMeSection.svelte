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
			<h2>If I were a moodboard, this would be me.</h2>
			<div class="intro">
				<p>
					If I'm not designing in <strong>Figma</strong>, you'll probably find me at the
					<strong>gym</strong>, fueled by <strong>coffee</strong>, or sketching ideas with
					<strong>pencils, paper, and paint</strong>.
				</p>
				<p>
					I graduated in <strong>Cybersecurity</strong>, but my creative mind chose
					<strong>crafting experiences</strong> over chasing vulnerabilities.
				</p>
				<p>
					<strong>Curiosity drives everything I do.</strong> I question, explore, and iterate
					relentlessly, always asking <strong>“Why?”</strong>, <strong>“What if?”</strong>, and
					<strong>“How can this be better?”</strong>
				</p>
			</div>
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
		padding-block: 40px;
		background: #ffffff;
		color: #1d1d1f;
		--c-cursor: #1d1d1f;
		--c-cursor-ink: #fff;
	}
	/* Wider than the site's standard container so Layout 2 + Layout 3 get more
	   room. */
	.inner {
		width: 100%;
		max-width: var(--maxw);
		margin-inline: auto;
		padding-inline: var(--pad-x);
	}
	/* Match the Work Experience and Projects heading alignment. */
	.head {
		width: 100%;
		margin: 0 0 32px;
		text-align: left;
	}
	.head > p {
		margin-bottom: 0.55rem;
		color: #6e6e73;
		font-size: var(--fs-small);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.head h2 {
		max-width: 20ch;
		font-size: clamp(2.5rem, 5vw, 4.5rem);
		font-weight: 700;
		letter-spacing: -0.06em;
		line-height: 1.02;
	}
	/* Apple-style editorial copy: large semibold text in a muted coffee tone,
	   with the key phrases stepping up to the full coffee brown. */
	.intro {
		display: grid;
		gap: 1.1rem;
		margin-top: clamp(1.75rem, 3vw, 2.5rem);
		color: #6e6e73;
		font-size: clamp(1.2rem, 2.1vw, 1.65rem);
		font-weight: 600;
		letter-spacing: -0.015em;
		line-height: 1.35;
	}
	.intro strong {
		color: var(--c-coffee);
		font-weight: 700;
	}
	@media (max-width: 760px) {
		.head {
			width: 100%;
		}
	}
	.stack {
		display: flex;
		flex-direction: column;
		gap: 20px; /* space between the layout rows */
		/* Scale the complete gallery rather than individual images, preserving
		   each row's original proportions and alignment. */
		width: 72%;
		margin: 0 auto;
	}
	.row {
		width: 100%;
	}
	/* rounded corners on every image in the gallery */
	.stack :global(img) {
		border-radius: 28px;
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
		gap: 20px;
	}
	.cluster-main {
		display: flex;
		flex-direction: column;
		gap: 20px;
		flex: 0 0 72%; /* wider Layout 2 / Layout 3; Layout 4 takes the slimmer rest */
		min-width: 0;
	}
	@media (max-width: 760px) {
		.stack {
			width: 100%;
		}
	}
</style>
