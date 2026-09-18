<script>
	import { experience } from '$data/experience.js';
	import { resume } from '$data/resume.js';
	import Container from '$components/Container.svelte';
	import ExperienceCard from '$components/ExperienceCard.svelte';
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';

	const [featured, ...rest] = experience;
</script>

<section id="work" class="xp-section">
	<Container class="xp-container">
		<header class="head" use:reveal>
			<h2>Work Experience</h2>
			<a
				href={resume.resumeUrl}
				target="_blank"
				rel="noopener"
				class="resume"
				use:cursorLabel={{ label: 'See my work', variant: 'link' }}
			>
				<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M7 3h7l4 4v14H7zM14 3v5h5M9 12h6M9 16h6"
					/>
				</svg>
				Resume
			</a>
		</header>

		<div class="grid">
			<div class="primary">
				<ExperienceCard job={featured} featured index={0} />
			</div>
			<div class="rest">
				{#each rest as job, i (job.company)}
					<ExperienceCard {job} index={i + 1} />
				{/each}
			</div>
		</div>
	</Container>
</section>

<style>
	.xp-section {
		padding-block: 40px;
		/* horizontal inset moved here (off the Container) so the section's
		   visible width matches the hero frame's — which insets the same way,
		   on the section itself rather than on the maxw wrapper inside it. */
		padding-inline: var(--pad-x);
		background: #f5f5f7;
		color: #1d1d1f;
	}
	.xp-section :global(.xp-container) {
		padding-inline: 0;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		margin-bottom: 36px;
	}
	.head h2 {
		font-size: var(--fs-h2);
		font-weight: 700;
		letter-spacing: -0.045em;
	}
	.resume {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		border: none;
		cursor: pointer;
		background: #1d1d1f;
		color: #fff;
		/* white pill on the dark section — see ExperienceCard */
		--c-cursor: #1c1c1c;
		--c-cursor-ink: #f7f5f0;
		font-weight: 600;
		font-size: var(--fs-small);
		padding: 0.7rem 1.25rem;
		border-radius: 999px;
		white-space: nowrap;
		transition: transform var(--dur-fast) var(--ease-out);
	}
	.resume:hover {
		transform: translateY(-2px);
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
		gap: clamp(1rem, 2.5vw, 1.5rem);
		align-items: stretch;
	}
	.primary {
		display: flex;
	}
	.primary :global(.xp) {
		width: 100%;
	}
	.rest {
		display: flex;
		flex-direction: column;
		gap: clamp(1rem, 2.5vw, 1.5rem);
	}

	@media (max-width: 760px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
