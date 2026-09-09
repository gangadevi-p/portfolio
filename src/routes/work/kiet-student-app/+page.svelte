<script>
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
	import KBeforeAfter from '$components/kiet/KBeforeAfter.svelte';
	import KReview from '$components/kiet/KReview.svelte';
	import KSummary from '$components/kiet/KSummary.svelte';
	import { toneVars } from '$components/kiet/tone.js';

	let summary;

	import {
		kietMeta,
		hero,
		overview,
		team,
		personas,
		existing,
		jobs,
		ia,
		flow,
		studentExperience,
		iterations,
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
		{ id: 'student', label: 'Design' },
		{ id: 'iterations', label: 'Iterations' },
		{ id: 'reviews', label: 'Reviews' },
		{ id: 'impact', label: 'Metrics' }
	];
</script>

<svelte:head>
	<title>{kietMeta.title} — Gangadevi</title>
	<meta name="description" content={kietMeta.summary} />
</svelte:head>

<div class="kiet">
	<KSideNav {sections} back={{ href: '/#work', label: 'All work' }} />

	<KSummary bind:this={summary} />
	<div class="summary-dock">
		<button class="summary-cta" onclick={() => summary.open()} aria-haspopup="dialog">
			Too long; didn't read?
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path d="M7 17 17 7M7 7h10v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	</div>

	<div class="topbar">
		<a class="back" href="/#work" use:cursorLabel={'All work'}>← All work</a>
	</div>

	<!-- 1 · HERO -->
	<header class="hero" id="top">
		<div class="hero-in">
			<div class="badge-wrap"><span class="badge">{hero.badge}</span></div>

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

				<div class="hero-phones" use:revealScale>
					<div class="ph back"><KPhone src={hero.phones[0].src} alt={hero.phones[0].alt} width={240} tilt={-4} /></div>
					<div class="ph front"><KPhone src={hero.phones[1].src} alt={hero.phones[1].alt} width={240} tilt={3} /></div>
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

	<!-- 9 · STUDENT EXPERIENCE -->
	<KSection id="student" title="Student Experience">
		<div class="single" use:revealScale>
			<KPhone src={studentExperience.phone.src} alt={studentExperience.phone.alt} width={270} />
		</div>
	</KSection>

	<!-- 10 · ITERATIONS -->
	<KSection id="iterations" title="Iterations">
		<div class="ba-grid">
			{#each iterations as it}
				<KBeforeAfter caption={it.caption} before={it.before} after={it.after} />
			{/each}
		</div>
	</KSection>

	<!-- 11 · ADMIN EXPERIENCE -->
	<KSection id="admin" title="Admin Experience">
		<div class="ba-grid">
			{#each admin as it}
				<KBeforeAfter caption={it.caption} before={it.before} after={it.after} />
			{/each}
		</div>
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
</div>

<style>
	.kiet {
		min-height: 100vh;
		overflow: hidden;
		padding-bottom: 112px;
	}

	/* ---------- "too long; didn't read?" dock ---------- */
	.summary-dock {
		position: fixed;
		inset-inline: 0;
		bottom: 0;
		z-index: 50;
		display: flex;
		justify-content: center;
		padding: 24px 16px max(20px, env(safe-area-inset-bottom));
		background: linear-gradient(transparent, var(--k-bg) 70%);
		pointer-events: none;
	}
	.summary-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
		pointer-events: auto;
		max-width: 100%;
		padding: 18px clamp(24px, 6vw, 80px);
		border: 0;
		border-radius: 999px;
		background: #000;
		color: #fff;
		font-family: 'Poppins', 'Archivo', system-ui, sans-serif;
		font-size: 18px;
		font-weight: 600;
		box-shadow: 0 6px 24px rgb(0 0 0 / 16%);
		transition:
			transform 180ms ease,
			background 180ms ease;
	}
	.summary-cta:hover {
		background: #242424;
		transform: translateY(-2px);
	}
	.summary-cta svg {
		flex-shrink: 0;
	}
	.summary-cta:active {
		transform: scale(0.98);
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
	.badge-wrap {
		text-align: center;
		margin-bottom: clamp(1.5rem, 5vw, 3.5rem);
	}
	.badge {
		display: inline-block;
		background: var(--k-orange);
		color: #fff;
		font-weight: 700;
		font-size: clamp(0.95rem, 2.2vw, 1.35rem);
		padding: 0.55em 1.4em;
		border-radius: 999px;
		box-shadow: var(--k-shadow);
	}
	.hero-grid {
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		gap: clamp(1.5rem, 5vw, 3rem);
		align-items: center;
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
		margin: 1.75rem 0 1.5rem;
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
		max-width: 32ch;
	}
	.hero-phones {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		min-height: 480px;
	}
	.hero-phones .ph {
		position: absolute;
	}
	.hero-phones .back {
		transform: translateX(-38%);
		z-index: 1;
		filter: saturate(0.96);
	}
	.hero-phones .front {
		transform: translateX(30%) translateY(6%);
		z-index: 2;
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

	/* ---------- student experience ---------- */
	.single {
		display: flex;
		justify-content: flex-start;
	}

	/* ---------- before / after grids ---------- */
	.ba-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: clamp(2rem, 6vw, 4rem);
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
		.hero-phones {
			min-height: 420px;
		}
		.ba-grid,
		.reviews {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 520px) {
		.hero-phones .back {
			transform: translateX(-30%) scale(0.82);
		}
		.hero-phones .front {
			transform: translateX(24%) scale(0.82);
		}
		.stat-card {
			width: 100%;
		}
	}
</style>
