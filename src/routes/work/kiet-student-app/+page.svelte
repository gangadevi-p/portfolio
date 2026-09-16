<script>
	import { onMount } from 'svelte';
	import '$lib/styles/kiet.css';
	import { revealScale } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';

	import KSideNav from '$components/kiet/KSideNav.svelte';
	import KSection from '$components/kiet/KSection.svelte';
	import KPill from '$components/kiet/KPill.svelte';
	import KPhone from '$components/kiet/KPhone.svelte';
	import KPersona from '$components/kiet/KPersona.svelte';
	import KJobs from '$components/kiet/KJobs.svelte';
	import KIA from '$components/kiet/KIA.svelte';
	import KFlow from '$components/kiet/KFlow.svelte';
	import KReview from '$components/kiet/KReview.svelte';
	import { toneVars } from '$components/kiet/tone.js';

	import {
		kietMeta,
		hero,
		mockups,
		overview,
		team,
		personas,
		existing,
		jobs,
		ia,
		flow,
		iterated,
		admin,
		reviews,
		impact,
		usage
	} from '$data/kiet.js';

	const sections = [
		{ id: 'overview', label: 'Overview' },
		{ id: 'roles', label: 'Roles & Timeline' },
		{ id: 'process', label: 'Design Process' },
		{ id: 'personas', label: 'User Persona' },
		{ id: 'existing', label: 'JTBD' },
		{ id: 'ia', label: 'Information Architecture' },
		{ id: 'flow', label: 'User Flow' },
		{ id: 'iterated', label: 'Iterations' },
		{ id: 'reviews', label: 'Reviews' },
		{ id: 'impact', label: 'Metrics' },
		{ id: 'learnings', label: 'Learnings' }
	];

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const page = document.querySelector('.kiet');
		const caseSections = [...document.querySelectorAll('.kiet .k-section')];
		if (!page || !caseSections.length) return;

		let frame = 0;
		const updateFocus = () => {
			frame = 0;
			if (window.scrollY < 40) {
				page.classList.remove('scroll-focus-ready');
				return;
			}

			const viewportMiddle = window.innerHeight / 2;
			let focused = caseSections[0];
			let closestDistance = Infinity;

			for (const section of caseSections) {
				const bounds = section.getBoundingClientRect();
				const middle = bounds.top + bounds.height / 2;
				const distance = Math.abs(middle - viewportMiddle);
				if (distance < closestDistance) {
					closestDistance = distance;
					focused = section;
				}
			}

			for (const section of caseSections) {
				section.classList.toggle('is-scroll-focus', section === focused);
			}
			page.classList.add('scroll-focus-ready');
		};
		const scheduleFocus = () => {
			if (!frame) frame = requestAnimationFrame(updateFocus);
		};

		updateFocus();
		window.addEventListener('scroll', scheduleFocus, { passive: true });
		window.addEventListener('resize', scheduleFocus, { passive: true });

		return () => {
			window.removeEventListener('scroll', scheduleFocus);
			window.removeEventListener('resize', scheduleFocus);
			if (frame) cancelAnimationFrame(frame);
		};
	});
</script>

<svelte:head>
	<title>{kietMeta.title} — Gangadevi</title>
	<meta name="description" content={kietMeta.summary} />
</svelte:head>

<div class="kiet">
	<KSideNav {sections} back={{ href: '/#work', label: 'All work' }} />

	<div class="topbar">
		<a class="back" href="/#work" use:cursorLabel={'All work'}>← All work</a>
	</div>

	<!-- 1 · HERO -->
	<header class="hero" id="top">
		<div class="hero-in">
			<div class="hero-grid">
				<div class="hero-copy" use:revealScale>
					<h1>
						{hero.titleLead}
						<span class="accent">{hero.titleAccent}</span>
					</h1>

					<div class="stat-card">
						{#each hero.stats as s}
							<div class="stat" style={toneVars(s.tone)}>
								<b>{s.n}</b>
								<span>{s.label}</span>
							</div>
						{/each}
					</div>

					<p class="lead">{hero.lead}</p>
				</div>

				<div class="hero-mockups" use:revealScale>
					{#each mockups as mockup}
						<img src={mockup.src} alt={mockup.alt} />
					{/each}
				</div>
			</div>
		</div>
	</header>

	<!-- 2 · OVERVIEW / PROBLEM / SOLUTION -->
	<KSection id="overview">
		<div class="stack">
			<div class="block">
				<h3 class="mini-title">Overview</h3>
				<div class="k-card w1" use:revealScale><p>{overview.overview}</p></div>
			</div>

			<div class="block right" id="problem">
				<h3 class="mini-title">Problem</h3>
				<div class="k-card w2" use:revealScale>
					<p>{overview.problem.text}</p>
				</div>
			</div>

			<div class="block">
				<h3 class="mini-title">Solution</h3>
				<div class="k-card w2" use:revealScale>
					<p class="rowhead"><span class="ic smile">☺</span>{overview.solution.label}</p>
					<p>{overview.solution.text}</p>
				</div>
			</div>
		</div>
	</KSection>

	<!-- 3 · TEAM -->
	<KSection id="team" title="Team">
		<div class="team-facts" id="roles" use:revealScale>
			{#each team.facts as f}
				<KPill tone={f.tone} dot={false}><b>{f.label}</b>&nbsp;{f.value}</KPill>
			{/each}
			<a class="dl" href={team.download.href} use:cursorLabel={'Play Store'}>
				<span class="tri">▶</span>{team.download.label}
			</a>
		</div>

		<div class="members">
			{#each team.members as m, i}
				<div class="member k-card" class:shift={i === 1} use:revealScale>
					<p class="mrow"><span>Name :</span> {m.name}</p>
					<p class="mrow"><span>Role :</span> {m.role}</p>
					<p class="mrow"><span>Contribution:</span></p>
					<div class="chips">
						{#each m.contributions as c, ci}
							<KPill tone={['green', 'dark', 'blue', 'teal', 'amber', 'rose'][ci % 6]}>{c}</KPill>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</KSection>

	<!-- 4 · DESIGN PROCESS -->
	<KSection id="process" title="Design Process">
		<div class="process-shot" use:revealScale>
			<img
				src="/img/design-process-kiet.png"
				alt="Design process for the KIET Student App — ground the problem, set priorities, build structure, test, then design and refine."
				loading="lazy"
			/>
		</div>
	</KSection>

	<!-- 5 · USER PERSONAS -->
	<KSection id="personas" title="User Personas">
		<div class="personas">
			{#each personas as p, i}
				<div use:revealScale>
					<KPersona {...p} goalLabel={i === 0 ? 'Goal' : 'Goals'} flip={i === 1} />
				</div>
			{/each}
		</div>
	</KSection>

	<!-- 6 · EXISTING EXPERIENCE + JOBS -->
	<KSection id="existing" title="Existing Experience">
		<div class="exist" use:revealScale>
			{#each existing as e}
				<KPill tone={e.tone} outline dot={false}>{e.label}</KPill>
			{/each}
		</div>
		<h2 class="k-title jtbd">Jobs To Be Done</h2>
		<KJobs rows={jobs} />
	</KSection>

	<!-- 7 · INFORMATION ARCHITECTURE -->
	<KSection id="ia" title="Information Architecture">
		<KIA groups={ia} />
	</KSection>

	<!-- 8 · USER FLOW -->
	<KSection id="flow" title="User Flow">
		<KFlow spine={flow.spine} branches={flow.branches} quickActions={flow.quickActions} />
	</KSection>

	<!-- 10 · ITERATED -->
	<KSection id="iterated" title="Iterations">
		<h3 class="comparison-subtitle">Student</h3>
		<section class="permission-iteration" aria-labelledby="permissions-heading">
			<h4 id="permissions-heading" class="iteration-label">{iterated.permissions.title}</h4>
			<div class="permission-layout">
				<figure class="iterated-screen" use:revealScale>
					<img src={iterated.permissions.screens[0].src} alt={iterated.permissions.screens[0].alt} loading="lazy" />
					<figcaption>{iterated.permissions.screens[0].label}</figcaption>
				</figure>
				<p class="iteration-reason" use:revealScale>{iterated.permissions.reason}</p>
				<figure class="iterated-screen" use:revealScale>
					<img src={iterated.permissions.screens[1].src} alt={iterated.permissions.screens[1].alt} loading="lazy" />
					<figcaption>{iterated.permissions.screens[1].label}</figcaption>
				</figure>
				<p class="iteration-reason" use:revealScale>{iterated.permissions.outcome}</p>
			</div>
		</section>
		<section class="projects-iteration" aria-labelledby="projects-heading">
			<h4 id="projects-heading" class="iteration-label">{iterated.projects.title}</h4>
			<div class="project-layout">
				<figure class="iterated-screen" use:revealScale>
					<img src={iterated.projects.screens[0].src} alt={iterated.projects.screens[0].alt} loading="lazy" />
					<figcaption>{iterated.projects.screens[0].label}</figcaption>
				</figure>
				<p class="iteration-reason" use:revealScale>{iterated.projects.reason}</p>
				<figure class="iterated-screen" use:revealScale>
					<img src={iterated.projects.screens[1].src} alt={iterated.projects.screens[1].alt} loading="lazy" />
					<figcaption>{iterated.projects.screens[1].label}</figcaption>
				</figure>
				<p class="iteration-reason" use:revealScale>{iterated.projects.outcome}</p>
			</div>
		</section>
	</KSection>

	<!-- 11 · ADMIN EXPERIENCE -->
	<KSection id="admin" title="Admin" ink>
	{#each admin as iteration}
		<section class="admin-iteration" aria-label={iteration.title}>
			<h3 class="iteration-label">{iteration.title}</h3>
			{#if iteration.oldReason}
				<div class="admin-detail-layout">
					<figure class="iterated-screen" use:revealScale>
						<img
							src={iteration.screens[0].src}
							alt={iteration.screens[0].alt}
							loading="lazy"
						/>
						<figcaption>{iteration.screens[0].label}</figcaption>
					</figure>
					<p class="iteration-reason" use:revealScale>{iteration.oldReason}</p>
					<figure class="iterated-screen" use:revealScale>
						<img
							src={iteration.screens[1].src}
							alt={iteration.screens[1].alt}
							loading="lazy"
						/>
						<figcaption>{iteration.screens[1].label}</figcaption>
					</figure>
					<p class="iteration-reason" use:revealScale>{iteration.newReason}</p>
				</div>
			{:else}
				<div class="admin-pair">
					{#each iteration.screens as screen}
						<figure class="iterated-screen" use:revealScale>
							<img src={screen.src} alt={screen.alt} loading="lazy" />
							<figcaption>{screen.label}</figcaption>
						</figure>
					{/each}
				</div>
			{/if}
		</section>
	{/each}
	</KSection>

	<!-- 12 · PLAYSTORE REVIEW -->
	<KSection id="reviews" title="Playstore Review">
		<div class="reviews">
			{#each reviews as r}
				<div use:revealScale><KReview {...r} /></div>
			{/each}
		</div>
	</KSection>

	<!-- 13 · PRODUCT IMPACT -->
	<KSection id="impact" title="Product impact">
		<div class="metric-row" use:revealScale>
			{#each impact.stats as s}
				<div class="k-stat" style={toneVars(s.tone)}><b>{s.n}</b><span>{s.label}</span></div>
			{/each}
		</div>
		<p class="metric-cap" use:revealScale>{impact.caption}</p>
		<div class="shot" use:revealScale><img src={impact.image.src} alt={impact.image.alt} loading="lazy" /></div>
	</KSection>

	<!-- 14 · CONTINUED USAGE -->
	<KSection id="usage" title="Continued Usage">
		<div class="metric-row" use:revealScale>
			{#each usage.stats as s}
				<div class="k-stat" style={toneVars(s.tone)}><b>{s.n}</b><span>{s.label}</span></div>
			{/each}
		</div>
		<p class="metric-cap" use:revealScale>{usage.caption}</p>
		<div class="shot" use:revealScale><img src={usage.image.src} alt={usage.image.alt} loading="lazy" /></div>
	</KSection>

	<!-- 15 · LEARNINGS -->
	<KSection id="learnings" title="Learnings">
		<div class="learnings-copy" use:revealScale>
			<p>
				This was my first major project, and one of the most meaningful learning experiences in my design journey. It gave me the opportunity to understand how a real application works beyond the screens — how people interact with it, how teams build it, and what it takes to make a product useful in everyday life.
			</p>
			<p>
				As my understanding of design grew, I continued to iterate and explore newer versions of the product. These iterations were not developed, as we had graduated from college and the project had already moved into implementation with the support of the management.
			</p>
			<p class="learnings-takeaway">
				<strong>It taught me that designing a product is not just about making it look good — it is about making it work for real people.</strong>
			</p>
		</div>
	</KSection>
</div>

<style>
	.kiet {
		min-height: 100vh;
		overflow: hidden;
	}
	/* make room for the fixed left section rail (labels always visible) */
	@media (min-width: 1200px) {
		.kiet {
			padding-left: 190px;
		}
	}
	@media (min-width: 1640px) {
		.kiet {
			padding-left: 90px;
		}
	}

	.topbar {
		max-width: 1120px;
		margin-inline: auto;
		padding: 2rem clamp(1.25rem, 5vw, 3.5rem) 0;
		font-weight: 600;
	}
	.back {
		color: var(--k-ink-strong);
		transition: color var(--dur-fast) var(--ease-out);
	}
	.back:hover,
	.back:focus-visible {
		color: var(--c-coffee);
		outline: none;
	}
	/* the left rail carries its own back link on wide screens */
	@media (min-width: 1200px) {
		.topbar {
			display: none;
		}
	}

	/* ---------- hero ---------- */
	.hero-in {
		max-width: 1120px;
		margin-inline: auto;
		padding: clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 5vw, 3.5rem) clamp(2rem, 6vw, 4rem);
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
	}
	.hero-copy {
		max-width: 760px;
		margin-inline: auto;
		text-align: center;
	}
	.hero-copy h1 {
		font-size: clamp(2.6rem, 5.5vw, 4.375rem);
		font-weight: 700;
		color: #8f8f8f;
		line-height: 0.98;
	}
	.hero-copy h1 .accent {
		color: var(--k-orange);
	}
	.stat-card {
		display: flex;
		gap: clamp(1rem, 4vw, 2.75rem);
		background: #fff;
		border-radius: 16px;
		box-shadow: var(--k-shadow);
		padding: 1.1rem 1.5rem;
		margin: 1.75rem auto 1.5rem;
		width: fit-content;
	}
	.stat b {
		display: block;
		font-size: clamp(1.4rem, 3vw, 2rem);
		font-weight: 800;
		color: var(--pill-fg);
		text-align: center;
	}
	.stat span {
		font-size: 0.9rem;
		font-weight: 600;
		color: #5a5a5a;
	}
	.lead {
		font-size: clamp(1rem, 2.4vw, 1.3rem);
		font-weight: 500;
		color: #6a6a6a;
		max-width: 42ch;
		margin-inline: auto;
	}
	.hero-mockups {
		order: -1;
		position: relative;
		z-index: 0;
		isolation: isolate;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(0.75rem, 2vw, 1.5rem);
		align-items: end;
		width: min(100%, 900px);
		margin-inline: auto;
	}
	.hero-mockups::before {
		content: '';
		position: absolute;
		inset: 10% -4% 4%;
		z-index: -1;
		background:
			radial-gradient(ellipse 58% 92% at 50% 45%, rgb(255 205 184 / 16%), rgb(242 232 255 / 9%) 56%, transparent 76%),
			radial-gradient(ellipse 35% 70% at 100% 35%, rgb(186 220 255 / 10%), transparent 85%);
		filter: blur(38px);
	}
	.hero-mockups::after {
		content: '';
		position: absolute;
		inset: 8% 12%;
		z-index: -1;
		border-radius: 50%;
		background: linear-gradient(90deg, rgb(241 90 36 / 4%), rgb(120 100 220 / 5%));
		filter: blur(60px);
	}
	.hero-mockups img {
		display: block;
		width: 100%;
		height: auto;
		filter:
			drop-shadow(0 20px 18px rgb(43 31 54 / 26%))
			drop-shadow(0 0 18px rgb(241 90 36 / 8%));
	}
	.hero-mockups img:nth-child(2) {
		transform: translateY(clamp(-0.75rem, -1.8vw, -1.25rem)) scale(1.035);
	}

	/* ---------- overview / problem / solution ---------- */
	.stack {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.mini-title {
		font-size: 24px;
		font-weight: 600;
		color: var(--k-orange);
		margin-bottom: 1rem;
	}
	.k-card.w1 {
		max-width: 620px;
	}
	.k-card.w2 {
		max-width: 640px;
	}
	/* problem block sits on the right — keep its heading and card on the
	   same 640px column so their left edges line up */
	.block.right .mini-title,
	.block.right .k-card {
		max-width: 640px;
		margin-left: auto;
	}
	.rowhead {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 700;
		color: var(--k-ink-strong);
		margin-bottom: 0.5rem;
	}
	.ic {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		display: grid;
		place-items: center;
		font-size: 1rem;
	}
	.ic.smile {
		color: var(--t-blue);
		border: 1.5px solid currentColor;
	}

	/* ---------- team ---------- */
	.team-facts {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1rem;
		align-items: center;
		margin-bottom: 2rem;
	}
	.dl {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-weight: 700;
		color: var(--k-orange);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.tri {
		font-size: 0.7rem;
	}
	.members {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}
	.member {
		max-width: 560px;
	}
	.member.shift {
		margin-left: auto;
	}
	.mrow {
		color: #5a5a5a;
		margin-bottom: 0.35rem;
	}
	.mrow span {
		color: var(--k-ink-soft);
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		margin-top: 0.75rem;
	}

	/* ---------- personas ---------- */
	.personas {
		display: flex;
		flex-direction: column;
		gap: clamp(2.5rem, 7vw, 5rem);
	}

	/* ---------- existing + jobs ---------- */
	.exist {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 2.5rem;
	}
	.k-title.jtbd {
		margin-top: 0.5rem;
	}

	/* ---------- design process ---------- */
	.process-shot img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: var(--k-radius);
	}

	.permission-iteration,
	.projects-iteration {
		width: 100%;
		padding: clamp(1.25rem, 4vw, 2.5rem);
		background: #fff;
		border-radius: var(--k-radius);
		box-shadow: var(--k-shadow);
	}
	.iteration-label {
		margin: 0 0 1rem;
		font-size: 1rem;
		font-weight: 600;
		color: var(--k-ink-strong);
	}
	.permission-layout {
		display: grid;
		grid-template-columns: minmax(0, 220px) minmax(140px, 1fr) minmax(0, 220px) minmax(140px, 1fr);
		gap: clamp(0.75rem, 2vw, 1.75rem);
		justify-content: space-between;
		justify-items: center;
		align-items: center;
	}
	.project-layout {
		display: grid;
		grid-template-columns: minmax(0, 220px) minmax(140px, 1fr) minmax(0, 220px) minmax(140px, 1fr);
		gap: clamp(0.75rem, 2vw, 1.75rem);
		justify-content: space-between;
		justify-items: center;
		align-items: center;
	}
	.projects-iteration {
		margin-top: clamp(2rem, 5vw, 3.5rem);
	}
	.comparison-subtitle {
		margin: -1.25rem 0 1rem;
		font-size: 1.125rem;
		font-weight: 600;
		text-align: center;
		color: var(--k-ink-strong);
	}
	:global(#admin .k-title) {
		text-align: center;
	}
	.iterated-screen {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		margin: 0;
	}
	.iterated-screen img {
		display: block;
		width: min(100%, 260px);
		height: auto;
	}
	.iterated-screen figcaption {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--k-ink-soft);
	}
	.iteration-reason {
		max-width: 28ch;
		margin: 0;
		font-size: 1rem;
		line-height: 1.65;
		text-align: left;
		color: var(--k-ink-soft);
	}
	.admin-iteration {
		width: 100%;
		padding: clamp(1.25rem, 4vw, 2.5rem);
		background: #fff;
		border-radius: var(--k-radius);
		box-shadow: var(--k-shadow);
	}
	.admin-iteration + .admin-iteration {
		margin-top: clamp(2rem, 5vw, 3.5rem);
	}
	.admin-pair {
		display: grid;
		width: min(100%, 560px);
		margin-inline: auto;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(1rem, 3vw, 2.5rem);
		justify-items: center;
		align-items: start;
	}
	.admin-pair .iterated-screen img {
		width: min(100%, 260px);
	}

	.admin-detail-layout {
		display: grid;
		grid-template-columns: minmax(0, 220px) minmax(140px, 1fr) minmax(0, 220px) minmax(140px, 1fr);
		align-items: center;
		justify-content: space-between;
		justify-items: center;
		gap: clamp(0.75rem, 2vw, 1.75rem);
	}

	/* ---------- reviews ---------- */
	.reviews {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(1.25rem, 3vw, 2rem);
	}

	/* ---------- metrics ---------- */
	.metric-row {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 1.25rem;
	}
	.metric-cap {
		color: #5c5c5c;
		max-width: 52ch;
		margin-bottom: 1.75rem;
	}
	.learnings-copy {
		width: 100%;
		box-sizing: border-box;
		padding: 24px;
		background: #fff;
		border-radius: var(--k-radius);
		box-shadow: var(--k-shadow);
		color: var(--k-ink-soft);
		font-size: clamp(1rem, 1.4vw, 1.125rem);
		line-height: 1.75;
	}
	.learnings-copy p {
		margin: 0;
	}
	.learnings-copy p + p {
		margin-top: 1.25rem;
	}
	.learnings-takeaway {
		color: var(--k-ink-strong);
	}
	.shot {
		background: #fff;
		border-radius: 14px;
		box-shadow: var(--k-shadow);
		padding: 0.75rem;
		overflow: hidden;
	}
	.shot img {
		width: 100%;
		border-radius: 8px;
		display: block;
	}

	/* ---------- responsive ---------- */
	@media (max-width: 900px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}
		.permission-layout {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.5rem;
		}
		.project-layout {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.25rem;
		}

		.admin-detail-layout {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.5rem;
		}
		.reviews {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 680px) {
		.permission-layout {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		.project-layout {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.admin-detail-layout {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}
	@media (max-width: 520px) {
		.stat-card {
			width: 100%;
		}
	}
</style>
