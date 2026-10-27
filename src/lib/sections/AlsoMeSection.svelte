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
			thinking <strong>Figma</strong> was all I needed — until my first internship, where I worked on
			<strong>UI and poster designs</strong>.
		</p>
		<p>
			My second internship as a <strong>UI/UX Design Intern</strong> made me realise there was a lot
			more to design than Figma. I reviewed an ongoing product from a
			<strong>fresh user perspective</strong>, pointed out <strong>usability issues</strong>, and
			worked on a few <strong>landing pages</strong>.
		</p>
		<p>
			Since then, I’ve been learning by doing, questioning, experimenting, and figuring out my way
			into <strong>product design</strong>.
		</p>
		<p>
			When I’m not designing, you’ll probably find me at the <strong>gym</strong>, having
			<strong>caffeine</strong>, or with a <strong>pen and paper</strong>.
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
			<s>was all I needed — until my first internship, where I worked on</s>
			<mark>UI and poster designs</mark>.
		</p>
		<p>
			<s>My second internship as a</s> <mark>UI/UX Design Intern</mark>
			<s>made me realise there was a lot more to design than Figma. I reviewed an ongoing product from a</s>
			<mark>fresh user perspective</mark>, <s>pointed out</s> <mark>usability issues</mark>,
			<s>and worked on a few</s> <mark>landing pages</mark>.
		</p>
		<p>
			<s>Since then, I’ve been learning by doing, questioning, experimenting, and figuring out my way
				into</s>
			<mark>product design</mark>.
		</p>
		<p>
			<s>When I’m not designing, you’ll probably find me at the</s> <mark>gym</mark>, <s>having</s>
			<mark>caffeine</mark>, <s>or with a</s> <mark>pen and paper</mark>.
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
