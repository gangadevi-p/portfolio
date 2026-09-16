<script>
	/**
	 * A resume "book" popup — a closed cover that opens like a real book to
	 * reveal the resume content as two pages, instead of just embedding the
	 * PDF file in a native viewer. The actual PDF stays a step away, as a
	 * plain download link on the right page.
	 */
	import { resume } from '$data/resume.js';
	import { site } from '$data/site.js';

	let { open = $bindable(false) } = $props();

	let bookOpen = $state(false);

	function close() {
		open = false;
		bookOpen = false;
	}

	function onKeydown(e) {
		if (e.key === 'Escape') close();
	}

	$effect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = '';
			};
		}
	});
</script>

<svelte:window onkeydown={onKeydown} />

{#if open}
	<div class="backdrop" role="presentation" onclick={close}>
		<div class="modal" role="dialog" aria-modal="true" aria-label="Resume" onclick={(e) => e.stopPropagation()}>
			<button class="close" onclick={close} aria-label="Close">
				<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						d="M6 6l12 12M18 6L6 18"
					/>
				</svg>
			</button>

			<div class="book-stage">
				<div class="book" class:opened={bookOpen}>
					<div class="spread">
						<div class="page page-left">
							<p class="eyebrow">Resume</p>
							<h3>{site.name}</h3>
							<p class="role">{site.role} · {site.location}</p>
							<p class="intro">{resume.intro}</p>
							<ul class="chips">
								{#each resume.skills as skill}<li>{skill}</li>{/each}
							</ul>
						</div>
						<div class="page page-right">
							<p class="eyebrow">Experience</p>
							<ul class="timeline">
								{#each resume.experience as job}
									<li>
										<div class="job-role">{job.role}</div>
										<div class="job-meta">{job.company} · {job.period}</div>
										<p>{job.notes}</p>
									</li>
								{/each}
							</ul>
							<a class="pdf-link" href={resume.resumeUrl} download>Download the PDF</a>
						</div>
						<div class="spine" aria-hidden="true"></div>
					</div>

					<button
						type="button"
						class="cover"
						onclick={() => (bookOpen = true)}
						aria-label="Open resume"
						tabindex={bookOpen ? -1 : 0}
					>
						<span class="cover-face">
							<span class="cover-name">{site.name}</span>
							<span class="cover-title">Resume</span>
							<span class="hint">Tap to open</span>
						</span>
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(1rem, 4vw, 3rem);
		background: rgba(10, 10, 12, 0.55);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		animation: fade-in var(--dur-fast) var(--ease-out);
	}
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	.modal {
		position: relative;
		width: 100%;
		max-width: 760px;
	}

	.close {
		position: absolute;
		top: -44px;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.14);
		color: #fff;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.close:hover {
		background: rgba(255, 255, 255, 0.24);
	}

	.book-stage {
		perspective: 2400px;
	}

	.book {
		position: relative;
		width: 100%;
		aspect-ratio: 1.5 / 1;
		margin-inline: auto;
	}

	.spread {
		position: absolute;
		inset: 0;
		display: flex;
		background: #fbf8f1;
		border-radius: 14px;
		overflow: hidden;
		box-shadow: var(--shadow-card-lift);
	}
	.page {
		flex: 1;
		min-width: 0;
		padding: clamp(1.1rem, 3vw, 2rem);
		overflow-y: auto;
		color: #1d1d1f;
	}
	.page-left {
		border-right: 1px solid rgba(0, 0, 0, 0.08);
	}
	.eyebrow {
		font-size: var(--fs-label);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #8a8a8e;
		margin-bottom: 0.6rem;
	}
	.page-left h3 {
		font-size: clamp(1.3rem, 3vw, 1.75rem);
		font-weight: 700;
		letter-spacing: -0.02em;
	}
	.role {
		font-size: var(--fs-small);
		color: #6e6e73;
		margin-bottom: 1rem;
	}
	.intro {
		font-size: var(--fs-small);
		color: #3a3a3c;
		margin-bottom: 1.1rem;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		list-style: none;
		padding: 0;
	}
	.chips li {
		font-size: 0.75rem;
		padding: 0.3rem 0.6rem;
		border: 1px solid rgba(0, 0, 0, 0.12);
		border-radius: 999px;
		color: #3a3a3c;
	}
	.timeline {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 1rem;
		margin-bottom: 1.25rem;
	}
	.job-role {
		font-weight: 700;
		font-size: var(--fs-small);
	}
	.job-meta {
		font-size: 0.75rem;
		color: #6e6e73;
		margin-bottom: 0.2rem;
	}
	.timeline p {
		font-size: 0.75rem;
		color: #3a3a3c;
	}
	.pdf-link {
		display: inline-block;
		font-size: var(--fs-small);
		font-weight: 600;
		color: #1d1d1f;
		border-bottom: 2px solid var(--c-accent);
	}

	.spine {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: 22px;
		margin-left: -11px;
		background: linear-gradient(
			to right,
			rgba(0, 0, 0, 0.16),
			rgba(0, 0, 0, 0.02) 45%,
			rgba(0, 0, 0, 0.02) 55%,
			rgba(0, 0, 0, 0.16)
		);
		pointer-events: none;
	}

	.cover {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		border-radius: 14px;
		background: linear-gradient(155deg, #2c2c2e, #000);
		box-shadow: var(--shadow-card-lift);
		cursor: pointer;
		transform-origin: left center;
		transform: rotateY(0deg);
		transition: transform 1s var(--ease-out);
		backface-visibility: hidden;
	}
	.cover-face {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		color: #f5f5f7;
		text-align: center;
		padding: 1.5rem;
	}
	.cover-name {
		font-size: clamp(1.4rem, 3.6vw, 2rem);
		font-weight: 700;
		letter-spacing: -0.02em;
	}
	.cover-title {
		font-size: var(--fs-small);
		color: #c7c7cc;
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}
	.hint {
		margin-top: 1rem;
		font-size: 0.75rem;
		color: #8a8a8e;
	}

	.book.opened .cover {
		transform: rotateY(-155deg);
		pointer-events: none;
	}

	@media (max-width: 620px) {
		.book {
			aspect-ratio: auto;
			height: min(78vh, 640px);
		}
		.spread {
			flex-direction: column;
			overflow-y: auto;
		}
		.page-left {
			border-right: none;
			border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		}
		.spine {
			display: none;
		}
		.cover {
			transform-origin: top center;
		}
		.book.opened .cover {
			transform: rotateX(-115deg) translateY(-4%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cover {
			transition: none;
		}
	}
</style>
