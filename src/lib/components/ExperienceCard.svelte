<script>
	import { reveal } from '$motion/reveal.js';

	/** One white card in the dark "Work Experience" grid. */
	let { job, featured = false, index = 0 } = $props();

	let broken = $state(false);
</script>

<article class="xp" class:featured use:reveal={{ delay: index * 0.06 }}>
	<div class="logo">
		{#if job.logo && !broken}
			<img src={job.logo} alt={job.company} loading="lazy" onerror={() => (broken = true)} />
		{:else}
			<span class="mono" aria-hidden="true">{job.company.charAt(0)}</span>
		{/if}
	</div>

	<div class="body">
		<h3>{job.role}</h3>

		{#if job.points?.length}
			<ul class="points">
				{#each job.points as point}<li>{point}</li>{/each}
			</ul>
		{:else if job.blurb}
			<p class="blurb">{job.blurb}</p>
		{/if}

		{#if job.href}
			<a class="period" href={job.href} target="_blank" rel="noreferrer">
				<span>{job.period}</span>
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
			</a>
		{:else}
			<span class="period">
				<span>{job.period}</span>
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
</article>

<style>
	.xp {
		display: flex;
		gap: clamp(1rem, 2.5vw, 1.75rem);
		background: #fff;
		color: #1c1c1c;
		border: 1px solid rgba(0, 0, 0, 0.06);
		border-radius: 22px;
		padding: clamp(1.1rem, 2.5vw, 1.75rem);
	}
	.xp.featured {
		height: 100%;
	}

	.logo {
		position: relative;
		flex: none;
		width: clamp(96px, 12vw, 150px);
		aspect-ratio: 1;
		border-radius: 16px;
		overflow: hidden;
		background: #f4f4f4;
		display: grid;
		place-items: center;
	}
	.logo img {
		width: 100%;
		height: 100%;
		object-fit: contain;
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
	h3 {
		font-size: clamp(1.15rem, 2.4vw, 1.5rem);
		font-weight: 800;
		letter-spacing: -0.01em;
	}
	.blurb {
		color: #5f5f5f;
		max-width: 34ch;
	}
	.points {
		list-style: none;
		padding: 0;
		color: #5f5f5f;
		display: grid;
		gap: 0.35rem;
	}

	.period {
		margin-top: 0.4rem;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		background: #ededed;
		color: #2a2a2a;
		font-size: var(--fs-small);
		padding: 0.6rem 1rem;
		border-radius: 999px;
	}
	a.period {
		transition: background var(--dur-fast) var(--ease-out);
	}
	a.period:hover {
		background: #e3e3e3;
	}

	@media (max-width: 560px) {
		.xp {
			flex-direction: column;
		}
	}
</style>
