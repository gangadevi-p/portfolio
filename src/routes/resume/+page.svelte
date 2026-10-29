<script>
	import { resume } from '$data/resume.js';
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import { base } from '$app/paths';

	/** "/work/…" stays on the site; anything else is a live site in a new tab */
	const isInternal = (href) => href.startsWith('/');
	const linkLabel = (href) => (isInternal(href) ? 'Case study' : 'Live site');
	/** "Designer's Tool-Kit" → "DT" */
	const monogram = (name) =>
		name
			.split(/\s+/)
			.filter((word) => /^[A-Za-z]/.test(word))
			.slice(0, 2)
			.map((word) => word[0])
			.join('')
			.toUpperCase();
</script>

<svelte:head>
	<title>Résumé — {resume.name}</title>
	<meta name="description" content="{resume.name}, {resume.role.join(' & ')}. Selected projects, skills and education." />
</svelte:head>

{#snippet tile(name, logo)}
	<span class="tile" aria-hidden="true">
		{#if logo}
			<img src={`${base}${logo}`} alt="" loading="lazy" />
		{:else}
			<span class="mono">{monogram(name)}</span>
		{/if}
	</span>
{/snippet}

<div class="resume-page">
	<div class="wrap">
		<a class="back" href={`${base}/`} use:cursorLabel={'Home'}>← Back home</a>

		<article class="paper" use:reveal={{ y: 24, scale: 0.98 }}>
			<header class="head">
				<div class="who">
					<img class="photo" src={`${base}${resume.photo}`} alt="" width="72" height="72" />
					<div>
						<h1>{resume.name}</h1>
						<p class="role">
							{#each resume.role as role, i}
								{#if i}<span class="dot" aria-hidden="true">•</span>{/if}{role}
							{/each}
						</p>
					</div>
				</div>
				<dl class="contact">
					{#each resume.contact as item (item.key)}
						<div>
							<dt>{item.key}:</dt>
							<dd>
								{#if item.href}
									<a
										href={item.href}
										target={item.href.startsWith('http') ? '_blank' : undefined}
										rel={item.href.startsWith('http') ? 'noopener' : undefined}>{item.value}</a
									>
								{:else}
									{item.value}
								{/if}
							</dd>
						</div>
					{/each}
				</dl>
			</header>

			<section aria-labelledby="r-projects">
				<h2 id="r-projects">Selected projects</h2>
				{#each resume.projects as project (project.name)}
					<div class="entry">
						{@render tile(project.name, project.logo)}
						<div class="body">
							<h3>{project.name} <span class="sub">– {project.role}</span></h3>
							<p class="meta">
								<span>{project.period}</span>
								{#if project.href}
									<span class="dot" aria-hidden="true">•</span>
									<a
										class="more"
										href={isInternal(project.href) ? `${base}${project.href}` : project.href}
										target={isInternal(project.href) ? undefined : '_blank'}
										rel={isInternal(project.href) ? undefined : 'noopener'}
										use:cursorLabel={linkLabel(project.href)}
									>
										{linkLabel(project.href)} <span aria-hidden="true">↗</span>
									</a>
								{/if}
							</p>
							<ul>
								{#each project.points as point}
									<li>{@html point}</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</section>

			<section aria-labelledby="r-education">
				<h2 id="r-education">Education</h2>
				{#each resume.education as school (school.school)}
					<div class="entry entry--tight">
						{@render tile(school.school, school.logo)}
						<div class="body">
							<h3>{school.school} <span class="sub">– {school.detail}</span></h3>
							<p class="meta"><span>{school.period}</span></p>
						</div>
					</div>
				{/each}
			</section>

			<section aria-labelledby="r-skills">
				<h2 id="r-skills">Skills</h2>
				<p class="line"><b>Design:</b> {resume.skills.join(', ')}</p>
				<p class="line"><b>Tools:</b> {resume.tools.join(', ')}</p>
			</section>
		</article>

		<div class="download">
			<a
				class="download-btn"
				href={`${base}${resume.resumeUrl}`}
				download={resume.fileName}
				use:cursorLabel={'Download'}
			>
				<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
					<path
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14"
					/>
				</svg>
				Download my résumé
			</a>
			<p class="note">PDF · 1 page</p>
		</div>
	</div>
</div>

<style>
	.resume-page {
		/* light page — the cursor has to flip back to dark ink over it */
		--c-cursor: #1d1d1f;
		--c-cursor-ink: #ffffff;
		--r-bg: var(--c-bg);
		--r-paper: #ffffff;
		--r-ink: #1d1d1f;
		--r-body: #4a4a4f;
		--r-muted: #8b8b92;
		--r-rule: #e6e6ea;

		background: var(--r-bg);
		color: var(--r-body);
		padding: clamp(1.5rem, 4vw, 3rem) 16px clamp(3rem, 8vw, 6rem);
	}
	.wrap {
		max-width: 760px;
		margin-inline: auto;
	}
	.back {
		display: inline-block;
		margin-bottom: 1.25rem;
		color: var(--r-ink);
		font-weight: 600;
		font-size: var(--fs-small);
		transition: opacity var(--dur-fast) var(--ease-out);
	}
	.back:hover,
	.back:focus-visible {
		opacity: 0.6;
		outline: none;
	}

	/* ---------- the sheet ---------- */
	.paper {
		background: var(--r-paper);
		border: 1px solid var(--r-rule);
		border-radius: var(--radius-card);
		box-shadow: var(--shadow-card);
		padding: clamp(1.5rem, 5vw, 2.75rem);
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--r-rule);
	}
	.who {
		display: flex;
		align-items: center;
		gap: 1rem;
		min-width: 0;
	}
	.photo {
		flex-shrink: 0;
		width: 72px;
		height: 72px;
		border-radius: 50%;
		object-fit: cover;
		object-position: center 12%;
		background: #ececee;
	}
	h1 {
		color: var(--r-ink);
		font-family: var(--font-display);
		font-size: clamp(1.6rem, 4vw, 2.1rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.1;
	}
	.role {
		margin-top: 0.25rem;
		color: var(--r-body);
		font-size: 1.05rem;
	}
	.dot {
		margin-inline: 0.45rem;
		color: var(--r-muted);
	}
	.contact {
		flex-shrink: 0;
		display: grid;
		gap: 0.15rem;
		font-size: 0.8rem;
		line-height: 1.45;
	}
	.contact div {
		display: flex;
		gap: 0.3rem;
	}
	.contact dt {
		color: var(--r-ink);
		font-weight: 600;
	}
	.contact dd {
		color: var(--r-body);
	}
	.contact a {
		color: var(--r-ink);
		text-decoration: underline;
		text-decoration-color: var(--r-muted);
		text-underline-offset: 2px;
	}
	.contact a:hover,
	.contact a:focus-visible {
		text-decoration-color: currentColor;
		outline: none;
	}

	/* ---------- sections ---------- */
	section {
		margin-top: 1.75rem;
	}
	h2 {
		margin-bottom: 0.9rem;
		color: var(--r-muted);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.entry {
		display: grid;
		grid-template-columns: 40px minmax(0, 1fr);
		gap: 1rem;
	}
	.entry + .entry {
		margin-top: 1.4rem;
	}
	.entry--tight + .entry--tight {
		margin-top: 0.9rem;
	}
	.tile {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		padding: 6px;
		border: 1px solid var(--r-rule);
		border-radius: 11px;
		background: #fff;
		box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
	}
	.tile img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
	.mono {
		color: var(--r-ink);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.02em;
	}
	h3 {
		color: var(--r-ink);
		font-size: 1.05rem;
		font-weight: 600;
		line-height: 1.35;
	}
	.sub {
		font-weight: 500;
		color: var(--r-body);
	}
	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		margin-top: 0.15rem;
		color: var(--r-body);
		font-size: 0.875rem;
		font-weight: 500;
	}
	.meta .dot {
		margin-inline: 0.5rem;
	}
	.more {
		color: var(--r-ink);
		font-weight: 600;
		text-decoration: underline;
		text-decoration-color: var(--r-rule);
		text-underline-offset: 3px;
		transition: text-decoration-color var(--dur-fast) var(--ease-out);
	}
	.more:hover,
	.more:focus-visible {
		text-decoration-color: currentColor;
		outline: none;
	}
	ul {
		margin-top: 0.5rem;
		padding-left: 1.1rem;
		font-size: 0.92rem;
		line-height: 1.55;
	}
	li + li {
		margin-top: 0.3rem;
	}
	li::marker {
		color: var(--r-muted);
	}
	li :global(b) {
		color: var(--r-ink);
		font-weight: 600;
	}
	.line {
		font-size: 0.92rem;
		line-height: 1.55;
	}
	.line + .line {
		margin-top: 0.6rem;
	}
	.line b {
		color: var(--r-ink);
		font-weight: 600;
	}

	/* ---------- download ---------- */
	.download {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
		margin-top: clamp(2rem, 5vw, 3rem);
	}
	.download-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		width: min(100%, 420px);
		padding: 1.15rem 2.5rem;
		border-radius: 999px;
		background: var(--c-surface-strong);
		color: var(--c-ink-inverse);
		font-size: 1.15rem;
		font-weight: 600;
		box-shadow: 0 10px 28px -10px rgb(0 0 0 / 40%);
		transition:
			transform var(--dur-fast) var(--ease-out),
			box-shadow var(--dur-fast) var(--ease-out);
	}
	.download-btn:hover,
	.download-btn:focus-visible {
		transform: translateY(-2px);
		box-shadow: 0 16px 34px -12px rgb(0 0 0 / 45%);
		outline: none;
	}
	.download-btn:active {
		transform: scale(0.98);
	}
	.note {
		color: var(--r-muted);
		font-size: var(--fs-small);
	}

	@media (max-width: 640px) {
		.head {
			flex-direction: column;
			align-items: flex-start;
		}
		.contact div {
			flex-wrap: wrap;
		}
		.contact dd {
			overflow-wrap: anywhere;
		}
		.entry {
			gap: 0.8rem;
		}
		/* the period and link wrap onto two lines here, so the dot would dangle */
		.meta {
			column-gap: 0.75rem;
		}
		.meta .dot {
			display: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.download-btn,
		.more,
		.back {
			transition: none;
		}
	}
</style>
