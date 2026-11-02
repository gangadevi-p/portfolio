<script>
	import ScrollKey from '$lib/components/ScrollKey.svelte';
	import { reveal, revealScale } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import UPhone from '$components/uber/UPhone.svelte';
	import UFeedback from '$components/uber/UFeedback.svelte';

	import {
		uberMeta,
		hero,
		problem,
		insight,
		solution,
		onboarding,
		privacy,
		explored,
		measure,
		credits
	} from '$data/uber.js';

	let view = $state('rider');
	let side = $state('front');
</script>

<svelte:head>
	<title>{uberMeta.title} — Gangadevi</title>
	<meta name="description" content={uberMeta.summary} />
</svelte:head>

<div class="ub">
	<!-- HERO -->
	<header class="hero wrap">
		<a class="back" href="/#product-thinking" use:cursorLabel={'Back home'}>
			<span aria-hidden="true">←</span> Back
		</a>
		<div class="hero-copy">
			<p class="eyebrow" use:reveal>{hero.eyebrow}</p>
			<h1 use:reveal>{hero.title} <span>{hero.accent}</span></h1>
			<p class="lead" use:reveal>{hero.lead}</p>
			<dl class="facts" use:reveal>
				{#each hero.facts as f (f.label)}
					<div>
						<dt>{f.label}</dt>
						<dd>{f.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
		<div class="hero-phone" use:revealScale>
			<UPhone bind:view bind:side />
		</div>
		<ScrollKey href="#problem" label="Scroll down" fixed theme="black" />
	</header>

	<!-- PROBLEM -->
	<section class="sec wrap" id="problem">
		<h2 class="head" use:reveal>The problem</h2>
		<figure class="lineup" use:reveal>
			<img src={problem.image.src} alt={problem.image.alt} loading="lazy" />
			<figcaption>{problem.image.caption}</figcaption>
		</figure>

		<p class="note" use:reveal><b>“Hard to find a cab” is really two problems.</b> Only one of them is a design problem.</p>
		<div class="cards cards--2">
			{#each problem.split as s, i (s.title)}
				<article class="card split" class:split--in={i === 1} use:reveal={{ delay: i * 0.06 }}>
					<span class="tag">{s.scope}</span>
					<h3>{s.title}</h3>
					<p>{s.text}</p>
				</article>
			{/each}
		</div>

		<div class="cards cards--3">
			{#each problem.pains as p, i (p.title)}
				<article class="card" use:reveal={{ delay: i * 0.06 }}>
					<span class="num">0{i + 1}</span>
					<h3>{p.title}</h3>
					<p>{p.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- INSIGHT -->
	<section class="sec wrap" id="insight">
		<h2 class="head" use:reveal>The insight</h2>
		<p class="big" use:reveal>{insight.title}</p>
		<p class="note" use:reveal>{insight.text}</p>
		<div class="photos">
			{#each insight.photos as ph, i (ph.src)}
				<figure use:reveal={{ delay: i * 0.06 }}>
					<img src={ph.src} alt={ph.alt} loading="lazy" />
					<figcaption>{ph.caption}</figcaption>
				</figure>
			{/each}
		</div>
	</section>

	<!-- SOLUTION -->
	<section class="sec wrap" id="solution">
		<h2 class="head" use:reveal>The solution</h2>
		<div class="cards cards--3">
			{#each solution as s, i (s.title)}
				<article class="card card--solution" use:reveal={{ delay: i * 0.06 }}>
					<span class="who">{s.who}</span>
					<h3>{s.title}</h3>
					<p>{s.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- ONBOARDING -->
	<section class="sec wrap" id="onboarding">
		<h2 class="head" use:reveal>Driver onboarding</h2>
		<div class="onboard" use:revealScale>
			<div class="slots">
				{#each onboarding.slots as slot (slot.side)}
					<div class="slot" class:slot--done={slot.done}>
						{#if slot.done}
							<img src={slot.src} alt="" loading="lazy" />
							<span class="check" aria-hidden="true">✓</span>
						{:else}
							<span class="plus" aria-hidden="true">+</span>
						{/if}
						<span class="slot-label">{slot.side}</span>
					</div>
				{/each}
				<p class="progress">2 of 4 photos</p>
			</div>
			<ul class="rules">
				{#each onboarding.rules as r (r)}<li>{r}</li>{/each}
			</ul>
		</div>
	</section>

	<!-- PRIVACY -->
	<section class="sec wrap" id="privacy">
		<h2 class="head" use:reveal>The pickup photo, safely</h2>
		<p class="note" use:reveal>Sending a photo to a stranger is a real worry, especially for women riding alone. These rules come first.</p>
		<div class="cards cards--2">
			{#each privacy as p, i (p.title)}
				<article class="card card--rule" use:reveal={{ delay: (i % 2) * 0.06 }}>
					<h3>{p.title}</h3>
					<p>{p.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- EXPLORED -->
	<section class="sec wrap" id="explored">
		<h2 class="head" use:reveal>Ideas I explored</h2>
		<div class="cards cards--2">
			{#each explored as e, i (e.title)}
				<article class="card" use:reveal={{ delay: i * 0.06 }}>
					<span class="tag tag--muted">{e.verdict}</span>
					<h3>{e.title}</h3>
					<p>{e.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- MEASURE -->
	<section class="sec wrap" id="measure">
		<h2 class="head" use:reveal>How I’d measure it</h2>
		<p class="note" use:reveal>{measure.note}</p>
		<div class="cards cards--2">
			{#each measure.metrics as m, i (m.title)}
				<article class="card" use:reveal={{ delay: (i % 2) * 0.06 }}>
					<span class="num">0{i + 1}</span>
					<h3>{m.title}</h3>
					<p>{m.text}</p>
				</article>
			{/each}
		</div>

		<div class="feedback" use:revealScale>
			<div class="feedback-copy">
				<h3>{measure.feedback.title}</h3>
				<p>{measure.feedback.text}</p>
				<ul class="rules">
					{#each measure.feedback.rules as r (r)}<li>{r}</li>{/each}
				</ul>
			</div>
			<UFeedback />
		</div>
	</section>

	<footer class="credits wrap">
		<p>
			Photos from Wikimedia Commons, cropped and with faces blurred:
			{#each credits as c, i (c.href)}
				<a href={c.href} target="_blank" rel="noreferrer">{c.what}</a> by {c.by} ({c.license}){i < credits.length - 1 ? '; ' : '.'}
			{/each}
		</p>
	</footer>
</div>

<style>
	.ub {
		/* the custom cursor has to flip to dark ink over this light page */
		--c-cursor: #000;
		--c-cursor-ink: #f3f3f1;

		--ub-bg: #ffffff;
		--ub-card: #ffffff;
		--ub-ink: #000000;
		--ub-ink-soft: #545454;
		--ub-green: #05944f;
		--ub-green-soft: #e6f4ec;
		--ub-blue: #276ef1;
		--ub-shadow: 0 1px 2px rgb(0 0 0 / 4%), 0 18px 40px -28px rgb(0 0 0 / 30%);

		position: relative;
		min-height: 100vh;
		padding: 12px 0 120px;
		background: var(--ub-bg);
		color: var(--ub-ink-soft);
		font-family: 'Plus Jakarta Sans', 'Poppins', system-ui, sans-serif;
		font-size: 16px;
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
		overflow-x: clip;
	}
	.ub h1,
	.ub h2,
	.ub h3 {
		margin: 0;
		color: var(--ub-ink);
		font-weight: 700;
		line-height: 1.2;
	}
	.ub p { margin: 0; }

	.wrap {
		width: min(1020px, calc(100% - 32px));
		margin-inline: auto;
	}

	/* shares the copy column's cell, pinned to its top = the top of the phone */
	.back {
		grid-area: 1 / 1;
		align-self: start;
		z-index: 1;
		display: flex;
		width: fit-content;
		align-items: center;
		gap: 10px;
		margin: 0;
		padding: 6px 14px 6px 0;
		border-radius: 999px;
		background: var(--ub-bg);
		font-size: 15px;
		font-weight: 500;
		color: var(--ub-ink-soft);
	}
	.back:hover,
	.back:focus-visible {
		color: var(--ub-ink);
		outline: none;
	}

	/* ---------- hero ---------- */
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		grid-template-rows: auto;
		align-items: center;
		column-gap: 56px;
		/* sized to its content (no full-screen height) so the problem section peeks into the first screen */
		row-gap: 20px;
		padding: 80px 0 8px;
	}
	.hero-copy { grid-area: 1 / 1; }
	.hero-phone { grid-area: 1 / 2; }
	.eyebrow {
		display: inline-block;
		padding: 6px 12px;
		border-radius: 999px;
		background: #000;
		color: #fff;
		font-size: 13px;
		font-weight: 600;
	}
	.hero h1 {
		width: fit-content;
		margin-top: 18px;
		padding: 6px 16px 10px 0;
		border-radius: 20px;
		background: var(--ub-bg);
		box-shadow: 0 0 0 6px var(--ub-bg);
		font-size: clamp(40px, 5.6vw, 64px);
		letter-spacing: -0.035em;
		line-height: 1.04;
	}
	.hero h1 span { color: var(--ub-green); }
	.ub .lead {
		margin-top: 20px;
		padding: 8px 14px 8px 0;
		border-radius: 16px;
		background: var(--ub-bg);
		box-shadow: 0 0 0 6px var(--ub-bg);
		max-width: 520px;
		font-size: 18px;
		line-height: 1.65;
	}
	.facts {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px 24px;
		max-width: 460px;
		margin: 32px 0 0;
		padding: 20px 24px;
		border-radius: 20px;
		background: var(--ub-card);
		box-shadow: var(--ub-shadow);
	}
	.facts dt { font-size: 13px; }
	.facts dd {
		margin: 2px 0 0;
		color: var(--ub-ink);
		font-weight: 600;
	}
	.hero-phone {
		display: flex;
		justify-content: center;
	}

	/* ---------- sections ---------- */
	.sec { margin-top: 56px; }
	.head {
		display: flex;
		width: fit-content;
		align-items: center;
		gap: 11px;
		/* solid chip so the doodles never run through the text */
		padding: 8px 18px 8px 0;
		border-radius: 999px;
		background: var(--ub-bg);
		box-shadow: 0 0 0 6px var(--ub-bg);
		font-size: 26px;
		text-transform: uppercase;
		letter-spacing: 0.01em;
	}
	.head::before {
		content: '';
		flex: none;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--ub-green);
	}
	.ub .note {
		margin-top: 16px;
		padding: 8px 14px 8px 0;
		border-radius: 16px;
		background: var(--ub-bg);
		box-shadow: 0 0 0 6px var(--ub-bg);
		font-size: 19px;
		line-height: 1.7;
	}
	.note b { color: var(--ub-ink); }
	.ub .big {
		margin-top: 18px;
		max-width: 760px;
		color: var(--ub-ink);
		font-size: clamp(24px, 3vw, 34px);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.25;
	}

	.lineup {
		margin: 24px 0 36px;
		border-radius: 24px;
		overflow: hidden;
		background: var(--ub-card);
		box-shadow: var(--ub-shadow);
	}
	.lineup img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1280 / 525;
		object-fit: cover;
	}
	.lineup figcaption {
		padding: 16px 22px;
		color: var(--ub-ink);
		font-size: 17px;
		font-weight: 600;
	}

	.cards {
		display: grid;
		gap: 20px;
		margin-top: 28px;
	}
	.cards--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
	.cards--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	.card {
		padding: 26px;
		border-radius: 24px;
		background: var(--ub-card);
		box-shadow: var(--ub-shadow);
	}
	.card h3 { font-size: 19px; }
	.ub .card p { margin-top: 10px; }
	.num {
		display: inline-block;
		margin-bottom: 14px;
		color: var(--ub-green);
		font-size: 14px;
		font-weight: 700;
	}
	.tag {
		display: inline-block;
		margin-bottom: 14px;
		padding: 4px 10px;
		border-radius: 999px;
		background: #f0f0f0;
		color: var(--ub-ink-soft);
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.split { box-shadow: none; border: 1px dashed #c8c8c4; background: transparent; }
	.split--in {
		border: 2px solid var(--ub-green);
		background: var(--ub-card);
		box-shadow: var(--ub-shadow);
	}
	.split--in .tag { background: var(--ub-green-soft); color: var(--ub-green); }

	.photos {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
		margin-top: 28px;
	}
	.photos figure {
		margin: 0;
		border-radius: 24px;
		overflow: hidden;
		background: var(--ub-card);
		box-shadow: var(--ub-shadow);
	}
	.photos img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}
	.photos figcaption {
		padding: 14px 20px;
		color: var(--ub-ink);
		font-weight: 600;
	}

	.card--solution { border-top: 4px solid #000; }
	.who {
		display: inline-block;
		margin-bottom: 12px;
		color: var(--ub-green);
		font-size: 13px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	/* ---------- onboarding ---------- */
	.onboard {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		align-items: center;
		gap: 40px;
		margin-top: 28px;
		padding: 36px;
		border-radius: 28px;
		background: var(--ub-card);
		box-shadow: var(--ub-shadow);
	}
	.slots {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}
	.slot {
		position: relative;
		display: grid;
		place-items: center;
		aspect-ratio: 4 / 3;
		border: 2px dashed #c8c8c4;
		border-radius: 16px;
		overflow: hidden;
		background: #fafafa;
	}
	.slot--done { border: 0; }
	.slot img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.plus {
		color: #a3a3a0;
		font-size: 30px;
		line-height: 1;
	}
	.check {
		position: absolute;
		top: 8px;
		right: 8px;
		display: grid;
		place-items: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: var(--ub-green);
		color: #fff;
		font-size: 12px;
		font-weight: 700;
	}
	.slot-label {
		position: absolute;
		left: 8px;
		bottom: 8px;
		padding: 3px 9px;
		border-radius: 999px;
		background: rgb(0 0 0 / 72%);
		color: #fff;
		font-size: 12px;
		font-weight: 600;
	}
	.slot:not(.slot--done) .slot-label {
		background: none;
		color: var(--ub-ink-soft);
	}
	.progress {
		grid-column: 1 / -1;
		color: var(--ub-ink);
		font-size: 14px;
		font-weight: 600;
	}
	.rules {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.rules li {
		position: relative;
		padding-left: 30px;
		color: var(--ub-ink);
	}
	.rules li::before {
		content: '✓';
		position: absolute;
		left: 0;
		top: 2px;
		display: grid;
		place-items: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--ub-green);
		color: #fff;
		font-size: 11px;
		font-weight: 700;
		line-height: 1;
	}

	.card--rule { border-left: 4px solid var(--ub-blue); }

	/* ---------- post-ride feedback ---------- */
	.feedback {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		align-items: center;
		gap: 40px;
		margin-top: 20px;
		padding: 36px;
		border-radius: 28px;
		background: var(--ub-card);
		box-shadow: var(--ub-shadow);
	}
	.feedback-copy h3 { font-size: 22px; }
	.ub .feedback-copy p { margin: 12px 0 22px; }
	.tag--muted { background: #f0f0f0; }

	/* ---------- questions + credits ---------- */
	.credits {
		margin-top: 72px;
		font-size: 13px;
		line-height: 1.6;
	}
	.credits a {
		color: var(--ub-ink);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	/* ---------- responsive ---------- */
	@media (max-width: 960px) {
		.hero {
			grid-template-columns: 1fr;
			grid-template-rows: auto;
			gap: 40px;
		}
		.back,
		.hero-copy,
		.hero-phone { grid-area: auto; }
		.onboard,
		.feedback {
			grid-template-columns: 1fr;
			padding: 24px;
		}
	}
	@media (max-width: 700px) {
		.sec { margin-top: 44px; }
		.head { font-size: 22px; gap: 9px; }
		.head::before { width: 10px; height: 10px; }
		.ub .note, .ub .lead { font-size: 17px; }
		.cards--3,
		.cards--2,
		.photos { grid-template-columns: 1fr; }
		.card { padding: 22px; }
		.lineup img { aspect-ratio: 16 / 9; }
	}
</style>
