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
		flowTenant
	} from '$data/cueup.js';

	/** the deck lists these four but stops after the tenant flow */
	const pending = new Set(['design-landlord', 'design-tenant', 'future-scope', 'learnings']);
	const scrollSections = [
		{ section: 'overview', nav: 'overview' },
		{ section: 'research', nav: 'research' },
		{ section: 'competitive-analysis', nav: 'competitive-analysis' },
		{ section: 'user-persona', nav: 'user-persona' },
		{ section: 'constraints', nav: 'constraints' },
		{ section: 'ia-landlord', nav: 'ia-landlord' },
		{ section: 'flow-landlord', nav: 'flow-landlord' },
		{ section: 'ia-tenant', nav: 'ia-landlord' },
		{ section: 'flow-tenant', nav: 'flow-landlord' }
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
				<nav class="toc" aria-label="Case study contents">
					<a class="back" href="/#projects" use:cursorLabel={'All work'}>
						<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
							<path
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19 12H5m0 0 6-6m-6 6 6 6"
							/>
						</svg>
						Back
					</a>
					<ul>
						{#each contents as c (c.id)}
							<li class:active={active === c.id} class:muted={pending.has(c.id)}>
								<a href={'#' + c.id} onclick={(e) => go(e, c.id)}>{c.label}</a>
							</li>
						{/each}
					</ul>
				</nav>
	<CSummary bind:this={summary} />
	<div class="summary-dock">
		<button class="summary-cta" onclick={() => summary.open()} aria-haspopup="dialog">
			Too long; didn't read?
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path d="M7 17 17 7M7 7h10v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	</div>
	<div class="page">
		<!-- 1 · BACK + CONTENTS + HERO SHOT — the sidebar stays put, no fade -->
		<header class="top cu-wrap">
			<div class="top-grid">


				<div class="shot" use:revealScale>
					<div class="phone">
						<span class="notch" aria-hidden="true"></span>
						<video
							src={hero.video.src}
							autoplay
							loop
							muted
							playsinline
							preload="auto"
							aria-label={hero.video.alt}
						></video>
					</div>
				</div>
			</div>
		</header>

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
	.back:hover {
		color: var(--cu-emerald);
	}

	.top-grid {
		display: grid;
		grid-template-columns: 1fr;
		align-items: start;
		margin-top: 40px;
	}
	.toc {
		position: fixed;
		left: 27px;
		top: 72px;
		width: 196px;
		max-height: calc(100dvh - 260px);
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width: none;
		z-index: 40;
		padding-right: 12px;
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
		padding: 8px 16px;
		border-radius: 50px;
		color: #6b7480;
		transition:
			background var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out),
			font-weight var(--dur-fast) var(--ease-out);
	}
	.toc a[href='#ia-landlord'] {
		white-space: nowrap;
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
		.toc {
			position: relative;
			inset: auto;
		width: auto;
		max-height: none;
		margin: 0 27px;
		padding: 24px 0 12px;
		border-right: 0;
	}
		.toc ul { flex-direction: row; gap: 10px 20px; flex-wrap: wrap; }
	}

	.shot {
		display: flex;
		justify-content: center;
	}
	/* iPhone 16 frame wrapping the looping walkthrough video */
	.phone {
		position: relative;
		width: 208px;
		aspect-ratio: 9 / 19.5;
		padding: 7px;
		border-radius: 34px;
		background: #0d0d0f;
		box-shadow:
			0 0 0 1.5px rgba(255, 255, 255, 0.06) inset,
			0 30px 55px rgba(31, 41, 55, 0.22);
	}
	.phone .notch {
		position: absolute;
		top: 13px;
		left: 50%;
		translate: -50% 0;
		width: 32%;
		height: 16px;
		background: #000;
		border-radius: 999px;
		z-index: 2;
	}
	.phone video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 27px;
		background: #0d0d0f;
		display: block;
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

</style>
