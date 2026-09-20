<script>
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';

	/** One white card in the dark "Work Experience" grid. */
	let { job, featured = false, index = 0 } = $props();

	let broken = $state(false);

	/** in-site case studies open in place; outbound links get a new tab */
	const internal = $derived(job.href?.startsWith('/'));
</script>

<svelte:element
	this={job.href ? 'a' : 'article'}
	class="xp"
	class:featured
	class:linked={Boolean(job.href)}
	href={job.href || undefined}
	target={job.href && !internal ? '_blank' : undefined}
	rel={job.href && !internal ? 'noreferrer' : undefined}
	use:reveal={{ delay: index * 0.06 }}
	use:cursorLabel={job.href
		? { label: 'Open my work', variant: 'view' }
		: job.status
			? { label: [job.status, job.tag].filter(Boolean).join(' · '), variant: 'view' }
			: undefined}
>
	<div class="top">
		<div class="logo">
			{#if job.logo && !broken}
				<img src={job.logo} alt={job.company} loading="lazy" onerror={() => (broken = true)} />
			{:else}
				<span class="mono" aria-hidden="true">{job.company.charAt(0)}</span>
			{/if}
		</div>

		<div class="body">
			<h3>{job.role}</h3>
			<p class="company-name">{job.company}{#if job.project}<span class="project-name">{job.project}</span>{/if}</p>
			{#if featured}
				{#if job.summary}<p class="featured-summary">{job.summary}</p>{/if}
			{/if}

			{#if !featured && job.points?.length}
				<ul class="points">
					{#each job.points as point}<li>{point}</li>{/each}
				</ul>
			{:else if !featured && job.blurb}
				<p class="blurb">{job.blurb}</p>
			{/if}

			{#if !featured}
				<span class="period">
					<span class="period-date">{job.period}</span>
					<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
						<path
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M7 17 17 7M9 7h8v8"
						/>
					</svg>
				</span>
			{/if}
		</div>
	</div>

	{#if featured}
		{#if job.points?.length}
			<ul class="points featured-points">
				{#each job.points as point}<li>{point}</li>{/each}
			</ul>
		{/if}

		<span class="period">
			{#if job.status}<span class="status">{job.status}</span>{/if}
			{#if job.tag}<span class="tag">{job.tag}</span>{/if}
			<span class="period-date">{job.period}</span>
			<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
				<path
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M7 17 17 7M9 7h8v8"
				/>
			</svg>
		</span>
	{/if}
</svelte:element>

<style>
	.xp {
		--card-pad: clamp(1.1rem, 2.5vw, 1.75rem);
		--logo-size: clamp(96px, 12vw, 150px);
		display: flex;
		gap: clamp(1rem, 2.5vw, 1.75rem);
		/* A lightly frosted surface lets the page colour breathe through while
		   the bright top edge keeps the card distinct from the background. */
		background: linear-gradient(145deg, rgb(255 255 255 / 82%), rgb(255 255 255 / 58%));
		color: #1d1d1f;
		/* white card inside the dark section — flip the cursor back to dark ink,
		   otherwise the light heart the dark page sets is invisible on it */
		--c-cursor: #1c1c1c;
		--c-cursor-ink: #f7f5f0;
		border: 1px solid rgb(255 255 255 / 72%);
		border-radius: 28px;
		padding: var(--card-pad);
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 70%),
			0 12px 32px rgb(29 29 31 / 8%),
			0 2px 5px rgb(29 29 31 / 4%);
		backdrop-filter: blur(18px) saturate(135%);
		-webkit-backdrop-filter: blur(18px) saturate(135%);
	}
	.xp.featured {
		height: 100%;
		position: relative;
		flex-direction: column;
		gap: 1rem;
		--logo-size: clamp(96px, 10vw, 120px);
		padding-bottom: 3.75rem;
	}
	.top {
		display: flex;
		gap: clamp(1rem, 2.5vw, 1.75rem);
	}
	.logo {
		position: relative;
		align-self: flex-start;
		flex: none;
		width: var(--logo-size);
		aspect-ratio: 1;
		border-radius: 20px;
		overflow: hidden;
		background: #f4f4f4;
		display: grid;
		place-items: center;
	}
	.logo img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		image-rendering: auto;
		transform: translateZ(0);
	}
	.mono {
		font-family: var(--font-display);
		font-size: clamp(2rem, 6vw, 3rem);
		color: #9a9a9a;
	}

	.body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		min-width: 0;
	}
	.xp.featured .featured-points {
		width: 100%;
		list-style: disc;
		list-style-position: inside;
		padding-left: 0;
		gap: 0.5rem;
	}
	h3 {
		font-size: clamp(1.15rem, 2.4vw, 1.5rem);
		font-weight: 700;
		letter-spacing: -0.01em;
	}
	.featured h3 {
		font-size: clamp(1.1rem, 1.8vw, 1.25rem);
		letter-spacing: -0.02em;
	}
	.blurb {
		color: #6e6e73;
		max-width: 34ch;
	}
	.points {
		list-style: none;
		padding: 0;
		color: #6e6e73;
		display: grid;
		gap: 0.35rem;
	}
	.company-name {
		font-weight: 700;
	}
	.project-name {
		margin-left: 0.45rem;
		font-weight: 500;
		color: #6e6e73;
	}
	.featured-summary {
		color: #5f5f5f;
		max-width: 34ch;
	}

	.period {
		margin-top: 0.4rem;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		background: #fff;
		border: 1px solid rgb(255 255 255 / 80%);
		box-shadow:
			0 1px 2px rgb(29 29 31 / 6%),
			0 6px 14px -6px rgb(29 29 31 / 16%);
		color: #1d1d1f;
		font-size: var(--fs-small);
		padding: 0.6rem 1rem;
		border-radius: 999px;
	}
	.featured .period {
		position: absolute;
		left: 16px;
		right: 16px;
		bottom: 16px;
		margin-top: 0;
		justify-content: space-between;
	}
	.status {
		font-weight: 600;
		color: #5f5f5f;
	}
	/* "Freelance" sits on the right, just left of the arrow */
	.tag {
		margin-left: auto;
		color: #1d1d1f;
	}
	.period-date:empty {
		display: none;
	}
	/* no arrow until the card actually opens something */
	.xp:not(.linked) .period svg {
		display: none;
	}
	.xp.linked {
		transition:
			background var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out),
			box-shadow var(--dur-fast) var(--ease-out);
	}
	.xp.linked:hover {
		transform: translateY(-4px);
		background: linear-gradient(145deg, rgb(255 255 255 / 92%), rgb(255 255 255 / 68%));
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 82%),
			0 20px 42px rgb(29 29 31 / 12%),
			0 4px 10px rgb(29 29 31 / 5%);
	}

	@media (max-width: 560px) {
		.xp {
			flex-direction: column;
		}
		.featured .period {
			position: static;
			margin-top: 0.4rem;
		}
	}
</style>
