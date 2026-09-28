<script>
	import { resume } from '$data/resume.js';
	import Container from '$components/Container.svelte';
	import SectionHeading from '$components/SectionHeading.svelte';
	import { reveal } from '$motion/reveal.js';
</script>

<section class="section">
	<Container class="wide-container">
		<SectionHeading id="resume" kicker="About" title="Resume" />

		<p class="intro" use:reveal>{resume.intro}</p>

		<div class="cols">
			<div class="col" use:reveal>
				<h3>Experience</h3>
				<ul class="timeline">
					{#each resume.experience as job}
						<li>
							<div class="role">{job.role}</div>
							<div class="company">{job.company} · {job.period}</div>
							<p>{job.notes}</p>
						</li>
					{/each}
				</ul>
			</div>

			<div class="col" use:reveal={{ delay: 0.08 }}>
				<h3>Skills</h3>
				<ul class="chips">
					{#each resume.skills as skill}<li>{skill}</li>{/each}
				</ul>
				<a class="download" href={resume.resumeUrl} download>Download PDF</a>
			</div>
		</div>
	</Container>
</section>

<style>
	.section {
		padding-block: clamp(3rem, 9vw, 7rem);
		/* horizontal inset moved here (off the Container) so the section's
		   visible width matches the hero frame's — see WorkExperienceSection. */
		padding-inline: var(--pad-x);
	}
	.section :global(.wide-container) {
		padding-inline: 0;
	}
	.intro {
		font-size: var(--fs-lead);
		max-width: 40ch;
		margin-bottom: clamp(2rem, 5vw, 3.5rem);
	}
	.cols {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: clamp(2rem, 6vw, 4rem);
	}
	h3 {
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin-bottom: 1.25rem;
	}
	.timeline {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 1.5rem;
	}
	.timeline .role {
		font-weight: 700;
	}
	.timeline .company {
		font-size: var(--fs-small);
		color: var(--c-ink-soft);
		margin-bottom: 0.35rem;
	}
	.timeline p {
		color: var(--c-ink-soft);
		max-width: 44ch;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
	}
	.chips li {
		font-size: var(--fs-small);
		padding: 0.35rem 0.7rem;
		border: 1px solid var(--c-line);
		border-radius: 999px;
	}
	.download {
		display: inline-block;
		margin-top: 1.5rem;
		font-weight: 600;
		border-bottom: 2px solid var(--c-accent);
	}
	@media (max-width: 640px) {
		.cols {
			grid-template-columns: 1fr;
		}
	}
</style>
