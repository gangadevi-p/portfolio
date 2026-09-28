<script>
	/**
	 * "Also me" — the big layout. It owns the section chrome (spacing, palette)
	 * and the heading + story, which GaniLayout wraps in its L of photos.
	 */
	import GaniLayout from '$sections/alsome/GaniLayout.svelte';
	import { reveal } from '$motion/reveal.js';
</script>

<section id="also-me" class="section">
	<div class="inner">
		<div use:reveal={{ y: 24 }}>
			<GaniLayout>
				<header class="head">
					<h2 class="visually-hidden">Also me</h2>
					<div class="intro">
						<p>
							I graduated in <strong>Cybersecurity</strong>, but my curiosity and constant
							<strong>“why?”</strong> questions somehow pulled me into design. I started learning in
							college, thinking <strong>Figma</strong> was all I needed — until my first internship,
							where I worked on <strong>UI and poster designs</strong>.
						</p>
						<p>
							My second internship as a <strong>UI/UX Design Intern</strong> made me realise there was
							a lot more to design than Figma. I reviewed an ongoing product from a
							<strong>fresh user perspective</strong>, pointed out <strong>usability issues</strong>,
							and worked on a few <strong>landing pages</strong>.
						</p>
						<p>
							Since then, I’ve been learning by doing, questioning, experimenting, and figuring out my
							way into <strong>product design</strong>.
						</p>
						<p>
							When I’m not designing, you’ll probably find me at the <strong>gym</strong>, having
							<strong>caffeine</strong>, or with a <strong>pen and paper</strong>.
						</p>
					</div>
				</header>
			</GaniLayout>
		</div>
	</div>
</section>

<style>
	.section {
		padding-block: 40px;
		/* horizontal inset moved here (off .inner) so the section's visible
		   width matches the hero frame's — see WorkExperienceSection. */
		padding-inline: var(--pad-x);
		background: var(--c-bg);
		color: var(--c-ink);
	}
	.inner {
		width: 100%;
		max-width: var(--maxw);
		margin-inline: auto;
	}
	/* Match the Work Experience and Projects heading alignment. */
	.head {
		width: 100%;
		margin: 0;
		text-align: left;
	}
	/* no visible heading — the story leads — but screen readers still get a
	   named section */
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	/* Apple-style editorial copy: large semibold text in a muted coffee tone,
	   with the key phrases stepping up to the full coffee brown. */
	.intro {
		display: grid;
		gap: 1.1rem;
		/* four paragraphs of story — a readable measure and a slightly smaller
		   size keep it editorial rather than a wall of display text */
		max-width: 62ch;
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
	@media (max-width: 760px) {
		.head {
			width: 100%;
		}
	}
</style>
