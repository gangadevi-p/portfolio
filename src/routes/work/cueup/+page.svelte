<script>
	import { onMount } from 'svelte';
	import '$lib/styles/cueup.css';
	import { reveal, revealScale } from '$motion/reveal.js';
	import { scrollFade } from '$motion/scrollfade.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import { scrollToId } from '$motion/smoothscroll.js';

	import CFacts from '$components/cueup/CFacts.svelte';
	import CFindings from '$components/cueup/CFindings.svelte';
	import CSources from '$components/cueup/CSources.svelte';
	import CCompare from '$components/cueup/CCompare.svelte';
	import CConstraints from '$components/cueup/CConstraints.svelte';
	import CPersona from '$components/cueup/CPersona.svelte';
	import CIA from '$components/cueup/CIA.svelte';
	import CFlow from '$components/cueup/CFlow.svelte';
	import CSummary from '$components/cueup/CSummary.svelte';
	let summary;

	import {
		cueupMeta,
		contents,
		hero,
		overview,
		solution,
		findings,
		compare,
		personas,
		constraints,
		iaLandlord,
		iaTenant,
		flowLandlord,
		flowTenant,
		futureScope,
		learnings
	} from '$data/cueup.js';

	/** this tenant-design link remains a placeholder until its own section is added */
	const pending = new Set(['design-tenant']);
	const scrollSections = [
		{ section: 'overview', nav: 'overview' },
		{ section: 'research', nav: 'research' },
		{ section: 'competitive-analysis', nav: 'competitive-analysis' },
		{ section: 'user-persona', nav: 'user-persona' },
		{ section: 'constraints', nav: 'constraints' },
		{ section: 'ia-landlord', nav: 'ia-landlord' },
		{ section: 'flow-landlord', nav: 'flow-landlord' },
		{ section: 'ia-tenant', nav: 'ia-landlord' },
		{ section: 'flow-tenant', nav: 'flow-landlord' },
		{ section: 'design-landlord', nav: 'design-landlord' },
		{ section: 'future-scope', nav: 'future-scope' },
		{ section: 'learnings', nav: 'learnings' }
	];

	let active = $state(contents[0].id);

	function go(e, id) {
		if (pending.has(id)) return;
		e.preventDefault();
		active = id;
		scrollToId(id);
	}

	// Keep the compact contents list in sync with the case study as it scrolls.
	onMount(() => {
		let frame;
		const updateActive = () => {
			frame = undefined;
			const marker = window.innerHeight * 0.35;
			let current = scrollSections[0].nav;

			for (const { section, nav } of scrollSections) {
				const element = document.getElementById(section);
				if (element && element.getBoundingClientRect().top <= marker) current = nav;
			}

			active = current;
		};
		const onScroll = () => {
			if (frame === undefined) frame = requestAnimationFrame(updateActive);
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		updateActive();
		return () => {
			window.removeEventListener('scroll', onScroll);
			if (frame !== undefined) cancelAnimationFrame(frame);
		};
	});
</script>

<svelte:head>
	<title>{cueupMeta.title} — Gangadevi</title>
	<meta name="description" content={cueupMeta.summary} />
</svelte:head>

<div class="cueup">
	<CSummary bind:this={summary} />
	<div class="summary-dock">
		<button class="summary-cta" onclick={() => summary.open()} aria-haspopup="dialog">
			Too long; didn't read?
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path d="M7 17 17 7M7 7h10v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	</div>
	<nav class="toc" aria-label="Case study contents">
		<a class="back" href="/#projects" use:cursorLabel={'All work'}>
			<span aria-hidden="true">←</span> Back
		</a>
		<ul>
			{#each contents as c (c.id)}
				<li class:active={active === c.id} class:muted={pending.has(c.id)}>
					<a href={'#' + c.id} onclick={(e) => go(e, c.id)}>{c.label}</a>
				</li>
			{/each}
		</ul>
	</nav>
	<header class="hero-preview" id="relay-preview" aria-label="Relay app preview">
		<div class="shot">
			{#each hero.phones as phone (phone.src)}
				<figure class="phone-card" class:home-screen={phone.highlight} style:--phone-ratio={phone.width / phone.height}>
					<img class="phone" src={phone.src} alt={phone.alt} width={phone.width} height={phone.height} fetchpriority="high" />
					{#if phone.highlight}<figcaption>{phone.highlight}</figcaption>{/if}
				</figure>
			{/each}
		</div>
	</header>
	<div class="page">

		<!-- 2 · OVERVIEW -->
		<section class="sec cu-wrap" use:scrollFade id="overview">
			<h2 class="cu-head" use:reveal>Overview</h2>
			<p class="cu-note cu-note--surface" use:reveal>
				{#each overview.lead as part, i (i)}{#if part.bold}<b>{part.text}</b>{:else}{part.text}{/if}{/each}
			</p>
			<div class="pad"><CFacts facts={overview.facts} /></div>
		</section>

		<!-- 3 · SOLUTION -->
		<section class="sec cu-wrap" use:scrollFade>
			<h2 class="cu-head" use:reveal>Solution</h2>
			<p class="cu-note cu-note--surface" use:reveal>
				{#each solution as part, i (i)}{#if part.bold}<b>{part.text}</b>{:else}{part.text}{/if}{/each}
			</p>
			<img
				class="solution-visual"
				src="/img/CueUp/repair-process-3d.png"
				alt="A repair process moving from request to completion"
				loading="lazy"
			/>
		</section>

		<!-- 4 · RESEARCH -->
		<section class="sec cu-wrap" use:scrollFade id="research">
			<h2 class="cu-head" use:reveal>Research</h2>
			<p class="cu-note" use:reveal>{findings.note}</p>

			<div class="pad"><CFindings tracks={findings.tracks} callout={findings.callout} /></div>

			<CSources label={findings.sources.label} users={findings.sources.users} />
		</section>

		<!-- 5 · COMPETITIVE ANALYSIS -->
		<section class="sec cu-wrap" use:scrollFade id="competitive-analysis">
			<h2 class="cu-head" use:reveal>Competitive analysis</h2>
			<p class="cu-note" use:reveal>{compare.note}</p>
			<div class="pad"><CCompare columns={compare.columns} /></div>
		</section>

		<!-- 6 · USER PERSONA -->
		<section class="sec cu-wrap" use:scrollFade id="user-persona">
			<h2 class="cu-head" use:reveal>User Persona</h2>

			<p class="cu-note persona-label" use:reveal>{personas.landlord.sub}</p>
			<div class="pad"><CPersona {...personas.landlord} /></div>

			<p class="cu-note persona-sub persona-label" use:reveal>{personas.tenant.sub}</p>
			<div class="pad"><CPersona {...personas.tenant} /></div>
		</section>

		<!-- 7 · CONSTRAINTS -->
		<section class="sec cu-wrap" use:scrollFade id="constraints">
			<h2 class="cu-head" use:reveal>Constraints</h2>
			<p class="cu-note" use:reveal>{constraints.note}</p>
			<div class="pad"><CConstraints items={constraints.items} /></div>
		</section>

		<!-- 8 · IA — LANDLORD -->
		<section class="sec cu-wrap" use:scrollFade id="ia-landlord">
			<h2 class="cu-head" use:reveal>Information architecture</h2>
			<p class="cu-note" use:reveal>{iaLandlord.note}</p>
			<div class="pad"><CIA groups={iaLandlord.groups} /></div>
		</section>

		<!-- 9 · USER FLOW — LANDLORD -->
		<section class="sec cu-wrap" use:scrollFade id="flow-landlord">
			<h2 class="cu-head" use:reveal>User flow</h2>
			<p class="cu-note" use:reveal>{flowLandlord.note}</p>
			<div class="pad">
				<CFlow height={flowLandlord.height} nodes={flowLandlord.nodes} links={flowLandlord.links} rowGap={24} />
			</div>
		</section>

		<!-- 10 · IA — TENANT -->
		<section class="sec cu-wrap" use:scrollFade id="ia-tenant">
			<h2 class="cu-head" use:reveal>Information architecture</h2>
			<p class="cu-note" use:reveal>{iaTenant.note}</p>
			<div class="pad"><CIA groups={iaTenant.groups} /></div>
		</section>

		<!-- 11 · USER FLOW — TENANT -->
		<section class="sec cu-wrap" use:scrollFade id="flow-tenant">
			<h2 class="cu-head" use:reveal>User flow</h2>
			<p class="cu-note" use:reveal>{flowTenant.note}</p>
			<div class="pad">
				<CFlow height={flowTenant.height} nodes={flowTenant.nodes} links={flowTenant.links} />
			</div>
		</section>

		<!-- 12 · DESIGN — LANDLORD -->
		<section class="sec cu-wrap" use:scrollFade id="design-landlord">
			<h2 class="cu-head" use:reveal>Design</h2>
			<p class="design-subhead" use:reveal>Landlord Experience</p>
			<div class="design-showcase" use:revealScale>
				<img src="/img/CueUp/LandlordHomeSo%201.png" alt="Relay landlord home screen design" loading="lazy" />
				<img src="/img/CueUp/Landlord%20repairsSo.png" alt="Relay landlord repairs screen design" loading="lazy" />
				<img src="/img/CueUp/Landlord%20Tenant%20So.png" alt="Relay landlord tenants screen design" loading="lazy" />
				<img src="/img/CueUp/LandlordupdatesSo.png" alt="Relay landlord updates screen design" loading="lazy" />
				<img src="/img/CueUp/landlordRent%20So.png" alt="Relay landlord rent screen design" loading="lazy" />
			</div>
			<p class="design-subhead tenant-subhead" use:reveal>Tenants Experience</p>
			<div class="tenant-showcase" use:revealScale>
				<img src="/img/CueUp/TenantHomeSo.png" alt="Relay tenant home screen design" loading="lazy" />
				<img src="/img/CueUp/TenantRentSo.png?v=20260917002746" alt="Relay tenant rent screen design" loading="lazy" />
				<img src="/img/CueUp/TenantRepairsSo.png" alt="Relay tenant repairs screen design" loading="lazy" />
				<img src="/img/CueUp/TenantUpdateso.png" alt="Relay tenant updates screen design" loading="lazy" />
			</div>
		</section>

		<!-- 13 · FUTURE SCOPE -->
		<section class="sec cu-wrap" use:scrollFade id="future-scope">
			<h2 class="cu-head" use:reveal>Future scope</h2>
			<p class="cu-note" use:reveal>{futureScope.note}</p>
			<div class="outcome-grid outcome-grid--future" use:revealScale>
				{#each futureScope.items as item}
					<article class="outcome-card">
						<h3>{item.title}</h3>
						<p>{item.text}</p>
					</article>
				{/each}
			</div>
		</section>

		<!-- 14 · LEARNINGS -->
		<section class="sec cu-wrap" use:scrollFade id="learnings">
			<h2 class="cu-head" use:reveal>Learnings</h2>
			<p class="cu-note" use:reveal>{learnings.note}</p>
			<div class="outcome-grid outcome-grid--learnings" use:revealScale>
				{#each learnings.items as item}
					<article class="outcome-card">
						<h3>{item.title}</h3>
						<p>{item.text}</p>
					</article>
				{/each}
			</div>
		</section>

	</div>
</div>

<style>
	/* The deck is drawn at 1200px with a 1020px column. Below that the whole
	   thing scales down as one piece, so the diagrams keep their proportions. */
	.cueup {
		padding-bottom: 112px;
		min-height: 100vh;
		/* if zoom is unsupported the fixed artboard stays reachable by scrolling */
		overflow-x: auto;
	}
	.page {
		width: 1200px;
		margin-inline: auto;
		padding: 60px 0 110px;
	}

	/* The deck is one fixed 1200px artboard, so narrow screens scale the whole
	   thing down rather than reflowing it. zoom (not transform) keeps the
	   shrunken page reserving the right height. It only takes a plain number,
	   hence the steps. */
	@media (max-width: 1240px) {
		.page {
			zoom: 0.95;
		}
	}
	@media (max-width: 1100px) {
		.page {
			zoom: 0.85;
		}
	}
	@media (max-width: 980px) {
		.page {
			zoom: 0.75;
		}
	}
	@media (max-width: 860px) {
		.page {
			zoom: 0.66;
		}
	}
	@media (max-width: 760px) {
		.page {
			zoom: 0.58;
		}
	}
	@media (max-width: 660px) {
		.page {
			zoom: 0.5;
		}
	}
	@media (max-width: 560px) {
		.page {
			zoom: 0.42;
		}
	}
	@media (max-width: 480px) {
		.page {
			zoom: 0.36;
		}
	}
	@media (max-width: 400px) {
		.page {
			zoom: 0.3;
		}
	}
	@media (max-width: 360px) {
		.page {
			zoom: 0.26;
		}
	}

	/* ---------- back + contents + hero shot ---------- */
	.summary-dock {
		position: fixed;
		inset-inline: 0;
		bottom: 0;
		z-index: 50;
		display: flex;
		justify-content: center;
		padding: 24px 16px max(20px, env(safe-area-inset-bottom));
		background: linear-gradient(transparent, var(--cu-bg) 70%);
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
		font-size: 18px;
		font-weight: 600;
		box-shadow: 0 6px 24px rgb(0 0 0 / 16%);
		transition: transform 180ms ease, background 180ms ease;
	}
	.summary-cta:hover { background: #242424; transform: translateY(-2px); }
	.summary-cta svg { flex-shrink: 0; }
	.summary-cta:active { transform: scale(0.98); }
	.back {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-size: 15px;
		font-weight: 500;
		color: #2b3440;
	}
	.back:hover,
	.back:focus-visible {
		color: var(--c-coffee);
		outline: none;
	}

	.toc {
		position: fixed;
		left: 20px;
		top: 72px;
		width: 226px;
		max-height: calc(100dvh - 140px);
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width: none;
		z-index: 40;
	}
	.toc::-webkit-scrollbar {
		display: none;
	}
	.toc .back {
		margin: 0 0 12px 11px;
	}
	.toc ul {
		display: flex;
		flex-direction: column;
		gap: 6px;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.toc li {
		font-size: 14px;
		line-height: 1.5;
	}
	.toc li a {
		display: inline-flex;
		align-items: center;
		padding: 8px 14px 8px 21px;
		border-radius: 50px;
		color: #6b7480;
		white-space: nowrap;
		transition:
			background var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out),
			font-weight var(--dur-fast) var(--ease-out);
	}
	.toc li:not(.muted) a:hover,
	.toc li:not(.muted) a:focus-visible {
		background: color-mix(in srgb, var(--c-ink) 12%, transparent);
		color: #1e2a3a;
		font-weight: 600;
	}
	.toc li.active a,
	.toc li.active a:hover,
	.toc li.active a:focus-visible {
		background: #000;
		color: #fff;
		font-weight: 600;
	}
	/* the deck stops after the tenant flow — these four have nowhere to go yet */
	.toc li.muted a {
		cursor: default;
	}
	@media (min-width: 1000px) {
		.page { zoom: 0.62; }
	}
	@media (min-width: 1240px) {
		.page { zoom: 0.8; }
	}
	@media (min-width: 1440px) {
		.page { zoom: 0.98; }
	}
	@media (min-width: 1480px) {
		.page { zoom: 1; }
	}
	@media (max-width: 999px) {
		/* Switch from a shrunken desktop artboard to a real mobile layout. */
		.cueup { overflow-x: clip; }
		.page {
			width: 100%;
			zoom: 1;
			padding: 12px 0 96px;
		}
		.cueup .cu-wrap {
			width: auto;
			margin-inline: 16px;
		}
		.toc {
			position: relative;
			inset: auto;
			width: auto;
			max-height: none;
			margin: 0 16px;
			padding: 24px 0 12px;
			border-right: 0;
		}
		.toc ul { flex-direction: row; gap: 10px 20px; flex-wrap: wrap; }
		.sec { margin-top: 48px; }
		.pad { margin-top: 20px; }
		.cueup .cu-head { font-size: 24px; gap: 9px; }
		.cueup .cu-head::before { width: 10px; height: 10px; }
		.cueup .cu-note { margin-top: 12px; font-size: 16px; line-height: 1.6; }
		.cueup .cu-note--surface { padding: 14px; border-radius: 18px; }

		/* Content cards reflow; the intentionally wide diagrams stay legible
		   inside their own swipe area rather than overflowing the page. */
		:global(.cueup .facts) {
			width: 100%;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 20px 12px;
			padding: 20px;
		}
		:global(.cueup .facts dt) { font-size: 15px; margin-bottom: 8px; white-space: normal; }
		:global(.cueup .facts dd) { font-size: 14px; margin-bottom: 6px; padding-right: 0; }
		:global(.cueup .facts .tools) { gap: 8px; }
		:global(.cueup .facts .tools img) { width: 24px; height: 24px; }
		:global(.cueup .persona) { gap: 20px; }
		:global(.cueup .persona .col) { gap: 16px; }
		:global(.cueup .persona .block) { padding: 20px; }
		:global(.cueup .grid) { grid-template-columns: 1fr; gap: 14px; }
		.outcome-grid { grid-template-columns: 1fr; gap: 14px; margin-top: 20px; }
		.outcome-card { min-height: 0; padding: 20px; border-radius: 18px; }
	}

	.hero-preview {
		min-height: 85svh;
		/* Equal margins match the centred case-study content without resizing phones. */
		margin-inline: 133px;
		padding: 60px clamp(20px, 2vw, 40px) 48px;
		display: grid;
		place-items: center;
	}
	.shot {
		--original-gap: clamp(12px, 1.5vw, 28px);
		--phone-width: calc((100% - 3 * var(--original-gap)) / 4);
		--home-width: calc(var(--phone-width) + var(--original-gap) * 0.65);
		--phone-height: calc(85svh - 108px);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		width: 100%;
		margin-inline: auto;
	}
	.phone-card {
		position: relative;
		flex: 0 0 auto;
		/* Fit the visible phone when height-limited, without empty image padding. */
		width: min(var(--phone-width), calc(var(--phone-height) * var(--phone-ratio)));
		margin: 0;
	}
	.home-screen {
		width: min(var(--home-width), calc(var(--phone-height) * var(--phone-ratio)));
		translate: 0 -20px;
	}
	.home-screen figcaption {
		position: absolute;
		top: calc(100% + 14px);
		left: 50%;
		translate: -50% 0;
		white-space: nowrap;
		font-size: 12px;
		font-weight: 600;
		color: #365c4b;
	}
	.phone {
		display: block;
		width: 100%;
		height: auto;
		max-height: calc(85svh - 108px);
		object-fit: contain;
	}
	@media (min-width: 1000px) and (max-width: 1479px) {
		/* Keep the fixed contents sidebar clear on smaller desktop windows. */
		.hero-preview { margin-left: 266px; margin-right: 0; }
	}
	@media (max-width: 999px) {
		.hero-preview { min-height: auto; margin-inline: 0; padding: 24px 16px 48px; }
	}
	@media (max-width: 600px) {
		.shot {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, calc((100% - 16px) / 2)));
			gap: 40px 4px;
		}
		.home-screen { translate: none; }
		.phone-card { width: 100%; }
		.phone { max-height: calc((100svh - 144px) / 2); }
		.phone-card:nth-child(2) { grid-column: 1; grid-row: 1; }
		.phone-card:nth-child(3) { grid-column: 2; grid-row: 1; }
	}
	.solution-visual {
		display: block;
		width: min(100%, 460px);
		height: auto;
		margin: 22px auto 0;
		opacity: 0.82;
	}

	/* ---------- sections ---------- */
	.sec {
		margin-top: 62px;
	}
	.pad {
		margin-top: 30px;
	}
	.cu-note--surface {
		padding: 16px;
		background: #fff;
		border-radius: 24px;
		font-weight: 500;
	}

	/* ---------- user persona ---------- */
	.persona-sub {
		margin-top: 56px;
	}
	/* "Landlords" / "Tenants" act as the persona card headings — same semibold weight */
	.persona-label {
		font-weight: 600;
	}
	.design-showcase {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		width: 100%;
		gap: 24px;
		margin-top: 30px;
	}
	.design-subhead {
		margin: 12px 0 0;
		font-size: 18px;
		font-weight: 600;
		color: var(--cu-ink);
	}
	.tenant-subhead {
		margin-top: 56px;
	}
	.tenant-showcase {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		width: 100%;
		justify-content: center;
		gap: 24px;
		margin-top: 30px;
	}
	.tenant-showcase img {
		display: block;
		width: 100%;
		height: auto;
	}
	.design-showcase img {
		display: block;
		grid-column: span 2;
		width: 100%;
		height: auto;
	}
	.design-showcase img:nth-child(4) {
		grid-column: 2 / span 2;
	}
	.design-showcase img:nth-child(5) {
		grid-column: 4 / span 2;
	}
	.outcome-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 24px;
		margin-top: 30px;
	}
	.outcome-card {
		--outcome-tone: var(--cu-rule);
		--outcome-stroke: color-mix(in srgb, var(--outcome-tone) 55%, transparent);
		min-height: 188px;
		box-sizing: border-box;
		padding: 28px;
		background: #fff;
		border: 0.5px solid var(--outcome-stroke);
		border-radius: var(--cu-radius);
		box-shadow: var(--cu-shadow);
	}
	.outcome-grid--future .outcome-card:nth-child(1) { --outcome-tone: #0f766e; }
	.outcome-grid--future .outcome-card:nth-child(2) { --outcome-tone: #c026d3; }
	.outcome-grid--future .outcome-card:nth-child(3) { --outcome-tone: #65a30d; }
	.outcome-grid--future .outcome-card:nth-child(4) { --outcome-tone: #8b5cf6; }
	.outcome-grid--learnings .outcome-card:nth-child(1) { --outcome-tone: #9333ea; }
	.outcome-grid--learnings .outcome-card:nth-child(2) { --outcome-tone: #fb923c; }
	.outcome-grid--learnings .outcome-card:nth-child(3) { --outcome-tone: #1d4ed8; }
	.outcome-grid--learnings .outcome-card:nth-child(4) { --outcome-tone: #db2777; }
	.outcome-card h3 {
		margin: 0;
		color: var(--outcome-tone);
		font-size: 20px;
		line-height: 1.3;
	}
	.outcome-card p {
		margin: 14px 0 0;
		color: var(--cu-ink-soft);
		font-size: 16px;
		line-height: 1.65;
	}

</style>
