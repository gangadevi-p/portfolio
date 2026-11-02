<script>
	/**
	 * "Also me" — heading and story tabs on top, the photo row (GaniLayout) below.
	 */
	import GaniLayout from '$sections/alsome/GaniLayout.svelte';
	import AboutTabs from '$sections/alsome/AboutTabs.svelte';
	import { reveal } from '$motion/reveal.js';

</script>

{#snippet story()}
	<div class="intro">
		<p>
			I graduated in <strong>Cybersecurity</strong>, but my curiosity and constant
			<strong>“why?”</strong> questions somehow pulled me into design. I started learning in college,
			thinking <strong>Figma</strong> was all I needed — until I realised there was a lot more to
			design than Figma.
		</p>
		<p>
			Since then, I’ve been learning by doing, questioning, experimenting, and figuring out my way
			into <strong>product design</strong>.
		</p>
		<p>
			When I’m not designing, you’ll probably find me at the <strong>gym</strong>, having
			<strong>caffeine</strong>, or with a <strong>pencil and paper</strong>.
		</p>
	</div>
{/snippet}

{#snippet tldr()}
	<!-- Same story, skimmed: <s> = less important, <mark> = what matters. -->
	<div class="intro tldr">
		<p>
			<s>I graduated in</s> <mark>Cybersecurity</mark>, <s>but my curiosity and constant</s>
			<mark>“why?”</mark>
			<s>questions somehow pulled me into design. I started learning in college, thinking</s>
			<mark>Figma</mark>
			<s>was all I needed — until I realised there was a lot more to design than Figma.</s>
		</p>
		<p>
			<s>Since then, I’ve been learning by doing, questioning, experimenting, and figuring out my way
				into</s>
			<mark>product design</mark>.
		</p>
		<p>
			<s>When I’m not designing, you’ll probably find me at the</s> <mark>gym</mark>, <s>having</s>
			<mark>caffeine</mark>, <s>or with a</s> <mark>pencil and paper</mark>.
		</p>
	</div>
{/snippet}

<section id="also-me" class="section">
	<div class="inner">
		<div use:reveal={{ y: 24 }}>
			<AboutTabs title="Also me" {story} {tldr} />
			<GaniLayout />
		</div>
	</div>
</section>

<style>
	.section {
		padding-block: 40px;
		/* horizontal inset moved here (off .inner) so the section's visible
		   width matches the hero frame's — see HeroSection. */
		padding-inline: var(--pad-x);
		background: var(--c-bg);
		color: var(--c-ink);
	}
	.inner {
		width: 100%;
		max-width: var(--maxw);
		margin-inline: auto;
	}
	/* Apple-style editorial copy: large semibold text in a muted coffee tone,
	   with the key phrases stepping up to the full coffee brown. */
	.intro {
		display: grid;
		gap: 1.1rem;
		/* spans the full section width, in line with the heading and photo grid */
		width: 100%;
		color: var(--c-ink-soft);
		font-size: clamp(1.1rem, 1.8vw, 1.45rem);
		font-weight: 600;
		letter-spacing: -0.015em;
		line-height: 1.35;
	}
	.intro strong {
		color: var(--c-coffee);
		font-weight: 700;
	}
	/* TL;DR — the story, skimmed: filler struck out in grey, key phrases bold. */
	.tldr s {
		color: var(--c-line-strong);
		font-weight: 500;
		text-decoration: line-through;
		text-decoration-thickness: 1.5px;
	}
	.tldr mark {
		background: none;
		color: var(--c-coffee);
		font-weight: 700;
	}
</style>
