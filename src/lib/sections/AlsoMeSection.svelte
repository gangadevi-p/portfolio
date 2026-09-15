<script>
	/**
	 * "Also me" — the big layout. It owns the section chrome (heading, spacing,
	 * light palette) and selects the original Gani gallery composition.
	 */
	import GaniLayout from '$sections/alsome/GaniLayout.svelte';
	import { reveal } from '$motion/reveal.js';
</script>

<section id="also-me" class="section">
	<div class="inner">
		<header class="head" use:reveal>
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
			</div>
		</header>

		<div use:reveal={{ y: 24 }}>
			<GaniLayout />
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
</style>
