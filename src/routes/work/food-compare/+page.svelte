<script>
	import ScrollKey from '$lib/components/ScrollKey.svelte';
	import { reveal, revealScale } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import FPhone from '$components/food/FPhone.svelte';

	import {
		foodMeta,
		hero,
		apps,
		problem,
		bill,
		flights,
		steps,
		decisions,
		constraints,
		measure,
		credits,
		rupees
	} from '$data/food.js';

	const lowTotal = Math.min(...apps.map((a) => a.total));
</script>

<svelte:head>
	<title>{foodMeta.title} — Gangadevi</title>
	<meta name="description" content={foodMeta.summary} />
</svelte:head>

<div class="fc">
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
			<FPhone />
		</div>
		<ScrollKey href="#problem" label="Scroll down" fixed theme="orange" />
	</header>

	<!-- PROBLEM -->
	<section class="sec wrap" id="problem">
		<h2 class="head" use:reveal>The problem</h2>
		<blockquote class="quote" use:reveal>“{problem.quote}”</blockquote>

		<div class="screens" use:reveal>
			{#each problem.screens as s (s.src)}
				<figure>
					<img src={s.src} alt={s.alt} width="1179" height="2556" loading="lazy" />
					<figcaption>{s.caption}</figcaption>
				</figure>
			{/each}
			<p class="screens-note">{problem.screensNote}</p>
		</div>

		<div class="today" use:reveal>
			<img src={problem.siriToday.src} alt={problem.siriToday.alt} width="1179" height="2556" loading="lazy" />
			<div>
				<h3>{problem.siriToday.title}</h3>
				<p>{problem.siriToday.text}</p>
			</div>
		</div>

		<div class="routine" use:reveal>
			<p class="routine-title">What I do before every order</p>
			{#each apps as a (a.id)}
				<div class="lane">
					<span class="lane-app" style:--app={a.color}>{a.name}</span>
					<ol>
						{#each problem.routine as step (step)}<li>{step}</li>{/each}
					</ol>
				</div>
			{/each}
			<p class="routine-end">Compare the two numbers in my head, then go back to the cheaper app and order.</p>
		</div>

		<div class="cards cards--2">
			{#each problem.pains as p, i (p.title)}
				<article class="card" use:reveal={{ delay: (i % 2) * 0.06 }}>
					<span class="num">0{i + 1}</span>
					<h3>{p.title}</h3>
					<p>{p.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- THE BILL -->
	<section class="sec wrap" id="the-bill">
		<h2 class="head" use:reveal>The insight</h2>
		<p class="big" use:reveal>{bill.title}</p>
		<p class="note" use:reveal>{bill.text}</p>
		<div class="bills">
			{#each apps as a, i (a.id)}
				<article class="receipt" use:reveal={{ delay: i * 0.06 }}>
					<header style:--app={a.color}>
						<b>{a.name}</b>
						<span class="menu">Menu {rupees(a.menu)} · {a.eta}</span>
					</header>
					{#each a.bill as line (line.label)}
						<div class="line" class:off={line.amount <= 0}>
							<span>{line.label}</span><span>{line.amount === 0 ? `Free with ${line.note}` : rupees(line.amount)}</span>
						</div>
					{/each}
					<div class="line line--total" class:win={a.total === lowTotal}>
						<span>To pay</span><span>{rupees(a.total)}</span>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<!-- FLIGHTS -->
	<section class="sec wrap" id="idea">
		<h2 class="head" use:reveal>The idea</h2>
		<p class="big" use:reveal>{flights.title}</p>
		<p class="note" use:reveal>{flights.text}</p>
		<p class="note" use:reveal><b>So every row compares three things:</b></p>
		<div class="cards cards--3">
			{#each flights.compare as c, i (c.title)}
				<article class="card card--accent" use:reveal={{ delay: i * 0.06 }}>
					<h3>{c.title}</h3>
					<p>{c.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- HOW IT WORKS -->
	<section class="sec wrap" id="how-it-works">
		<h2 class="head" use:reveal>How it works</h2>
		<ol class="steps">
			{#each steps as s, i (s.title)}
				<li class="card" use:reveal={{ delay: i * 0.05 }}>
					<span class="step">{i + 1}</span>
					<h3>{s.title}</h3>
					<p>{s.text}</p>
				</li>
			{/each}
		</ol>
	</section>

	<!-- DECISIONS -->
	<section class="sec wrap" id="decisions">
		<h2 class="head" use:reveal>Design decisions</h2>
		<div class="cards cards--2">
			{#each decisions as d, i (d.title)}
				<article class="card card--top" use:reveal={{ delay: (i % 2) * 0.06 }}>
					<h3>{d.title}</h3>
					<p>{d.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- CONSTRAINTS -->
	<section class="sec wrap" id="constraints">
		<h2 class="head" use:reveal>Constraints</h2>
		<p class="note" use:reveal>{constraints.note}</p>
		<div class="cards cards--3">
			{#each constraints.items as c, i (c.title)}
				<article class="card" use:reveal={{ delay: i * 0.06 }}>
					<h3>{c.title}</h3>
					<p>{c.text}</p>
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
	</section>

	<footer class="credits wrap"><p>{credits}</p></footer>
</div>

<style>
	.fc {
		/* the custom cursor has to flip to dark ink over this light page */
		--c-cursor: #202124;
		--c-cursor-ink: #f6f7f9;

		--fc-bg: #ffffff;
		--fc-card: #ffffff;
		--fc-ink: #202124;
		--fc-ink-soft: #5f6368;
		--fc-blue: #1a73e8;
		--fc-blue-soft: #e8f0fe;
		--fc-green: #137333;
		--fc-shadow: 0 1px 2px rgb(0 0 0 / 4%), 0 18px 40px -28px rgb(0 0 0 / 30%);

		position: relative;
		min-height: 100vh;
		padding: 12px 0 120px;
		background: var(--fc-bg);
		color: var(--fc-ink-soft);
		font-family: 'Plus Jakarta Sans', 'Poppins', system-ui, sans-serif;
		font-size: 16px;
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
		overflow-x: clip;
	}
	.fc h1,
	.fc h2,
	.fc h3 {
		margin: 0;
		color: var(--fc-ink);
		font-weight: 700;
		line-height: 1.2;
	}
	.fc p { margin: 0; }

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
		background: var(--fc-bg);
		font-size: 15px;
		font-weight: 500;
		color: var(--fc-ink-soft);
	}
	.back:hover,
	.back:focus-visible {
		color: var(--fc-ink);
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
		background: var(--fc-blue-soft);
		color: var(--fc-blue);
		font-size: 13px;
		font-weight: 600;
	}
	.hero h1 {
		width: fit-content;
		margin-top: 18px;
		padding: 6px 16px 10px 0;
		border-radius: 20px;
		background: var(--fc-bg);
		box-shadow: 0 0 0 6px var(--fc-bg);
		font-size: clamp(40px, 5.6vw, 64px);
		letter-spacing: -0.035em;
		line-height: 1.04;
	}
	.hero h1 span { color: #fc8019; }
	.fc .lead {
		margin-top: 20px;
		padding: 8px 14px 8px 0;
		border-radius: 16px;
		background: var(--fc-bg);
		box-shadow: 0 0 0 6px var(--fc-bg);
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
		background: var(--fc-card);
		box-shadow: var(--fc-shadow);
	}
	.facts dt { font-size: 13px; }
	.facts dd {
		margin: 2px 0 0;
		color: var(--fc-ink);
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
		background: var(--fc-bg);
		box-shadow: 0 0 0 6px var(--fc-bg);
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
		background: var(--fc-blue);
	}
	.fc .note {
		margin-top: 16px;
		padding: 8px 14px 8px 0;
		border-radius: 16px;
		background: var(--fc-bg);
		box-shadow: 0 0 0 6px var(--fc-bg);
		font-size: 19px;
		line-height: 1.7;
	}
	.note b { color: var(--fc-ink); }
	.fc .big {
		margin-top: 18px;
		max-width: 760px;
		color: var(--fc-ink);
		font-size: clamp(24px, 3vw, 34px);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.25;
	}
	.quote {
		margin: 20px 0 0;
		padding: 20px 24px;
		border-left: 4px solid var(--fc-blue);
		border-radius: 0 20px 20px 0;
		background: var(--fc-card);
		color: var(--fc-ink);
		font-size: 20px;
		font-weight: 500;
		line-height: 1.6;
	}

	/* ---------- the two apps ---------- */
	/* four real screenshots in a row, the takeaway underneath */
	.screens {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 16px;
		margin-top: 28px;
	}
	.screens figure {
		margin: 0;
	}
	.screens img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 18px;
		box-shadow: var(--fc-shadow);
	}
	.screens figcaption {
		margin-top: 10px;
		color: var(--fc-ink);
		font-size: 14px;
		font-weight: 600;
		text-align: center;
	}
	.fc .screens-note {
		grid-column: 1 / -1;
		margin-top: 12px;
		color: var(--fc-ink);
		font-size: clamp(20px, 2.4vw, 26px);
		font-weight: 700;
		letter-spacing: -0.01em;
		line-height: 1.35;
	}

	.today {
		display: grid;
		grid-template-columns: 220px minmax(0, 1fr);
		align-items: center;
		gap: 36px;
		margin-top: 28px;
		padding: 28px;
		border-radius: 24px;
		background: var(--fc-card);
		box-shadow: var(--fc-shadow);
	}
	.today img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 18px;
	}
	.today h3 { font-size: 22px; }
	.fc .today p {
		margin-top: 12px;
		font-size: 18px;
		line-height: 1.65;
	}

	.routine {
		margin-top: 28px;
		padding: 28px;
		border-radius: 24px;
		background: var(--fc-card);
		box-shadow: var(--fc-shadow);
	}
	.fc .routine-title {
		margin-bottom: 18px;
		color: var(--fc-ink);
		font-size: 18px;
		font-weight: 700;
	}
	.lane {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-top: 10px;
	}
	.lane-app {
		flex: none;
		width: 76px;
		color: var(--app);
		font-weight: 800;
	}
	.lane ol {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
		counter-reset: s;
	}
	.lane li {
		position: relative;
		padding: 7px 14px;
		border-radius: 999px;
		background: var(--fc-bg);
		color: var(--fc-ink);
		font-size: 14px;
		font-weight: 500;
	}
	.lane li + li::before {
		content: '→';
		position: absolute;
		left: -9px;
		color: #b0b4b9;
		font-size: 11px;
	}
	.fc .routine-end {
		margin-top: 18px;
		padding-top: 16px;
		border-top: 1px dashed #dadce0;
		color: var(--fc-ink);
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
		background: var(--fc-card);
		box-shadow: var(--fc-shadow);
	}
	.card h3 { font-size: 19px; }
	.fc .card p { margin-top: 10px; }
	.num {
		display: inline-block;
		margin-bottom: 14px;
		color: var(--fc-blue);
		font-size: 14px;
		font-weight: 700;
	}
	.card--accent { border-top: 4px solid var(--fc-blue); }
	.card--top { border-top: 4px solid var(--fc-ink); }

	/* ---------- receipts ---------- */
	.bills {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
		margin-top: 28px;
	}
	.receipt {
		padding: 24px;
		border-radius: 24px;
		background: var(--fc-card);
		box-shadow: var(--fc-shadow);
	}
	.receipt header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		margin-bottom: 14px;
		padding-bottom: 14px;
		border-bottom: 1px solid #e8eaed;
	}
	.receipt header b {
		color: var(--app);
		font-size: 20px;
	}
	.menu {
		padding: 4px 10px;
		border-radius: 999px;
		background: var(--fc-bg);
		color: var(--fc-ink);
		font-size: 13px;
		font-weight: 600;
	}
	.line {
		display: flex;
		justify-content: space-between;
		padding: 5px 0;
		color: var(--fc-ink);
		font-size: 15px;
	}
	.line.off { color: var(--fc-green); }
	.line--total {
		margin-top: 10px;
		padding-top: 12px;
		border-top: 1px solid #e8eaed;
		font-size: 18px;
		font-weight: 700;
	}
	.line--total.win span:last-child {
		padding: 0 8px;
		border-radius: 6px;
		background: #e6f4ea;
		color: var(--fc-green);
	}

	/* ---------- steps ---------- */
	.steps {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 20px;
		margin: 28px 0 0;
		padding: 0;
		list-style: none;
	}
	.step {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		margin-bottom: 14px;
		border-radius: 50%;
		background: var(--fc-blue);
		color: #fff;
		font-size: 14px;
		font-weight: 700;
	}

	/* ---------- questions + credits ---------- */
	.credits {
		margin-top: 72px;
		font-size: 13px;
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
		.steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		.screens { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	}
	@media (max-width: 700px) {
		.sec { margin-top: 44px; }
		.head { font-size: 22px; gap: 9px; }
		.head::before { width: 10px; height: 10px; }
		.fc .note, .fc .lead, .quote { font-size: 17px; }
		.cards--3,
		.cards--2,
		.bills,
		.steps { grid-template-columns: 1fr; }
		.card, .receipt, .routine { padding: 22px; }
		.lane { flex-direction: column; align-items: flex-start; gap: 8px; }
		.today { grid-template-columns: 1fr; padding: 22px; gap: 20px; }
		.today img { max-width: 240px; margin-inline: auto; }
	}
</style>
