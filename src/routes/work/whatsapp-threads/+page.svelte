<script>
	import ScrollKey from '$lib/components/ScrollKey.svelte';
	import { reveal, revealScale } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import WPhone from '$components/whatsapp/WPhone.svelte';

	import {
		whatsappMeta,
		hero,
		people,
		topics,
		problem,
		compare,
		steps,
		anatomy,
		decisions,
		testing,
	} from '$data/whatsapp.js';

	let mode = $state('threads');

	/** the problem strip is written as one letter per message */
	const stripTopic = { t: 'trip', m: 'match', g: 'gift', o: 'other' };
	const strip = [...problem.strip].map((c) => topics[stripTopic[c]]);
</script>

<svelte:head>
	<title>{whatsappMeta.title} — Gangadevi</title>
	<meta name="description" content={whatsappMeta.summary} />
</svelte:head>

<div class="wa">
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
			<WPhone bind:mode />
		</div>
		<ScrollKey href="#problem" label="Scroll down" fixed theme="whatsapp" />
	</header>

	<!-- PROBLEM -->
	<section class="sec wrap" id="problem">
		<h2 class="head" use:reveal>The problem</h2>
		<blockquote class="quote" use:reveal>“{problem.quote}”</blockquote>

		<figure class="strip-card" use:reveal>
			<div class="strip" aria-hidden="true">
				{#each strip as t, i (i)}
					<span style:background={t.color}></span>
				{/each}
			</div>
			<figcaption>
				<span>{problem.stripNote}</span>
				<ul class="legend">
					{#each Object.values(topics) as t (t.label)}
						<li style:--topic={t.color}>{t.label}</li>
					{/each}
				</ul>
			</figcaption>
		</figure>

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

	<!-- SOLUTION -->
	<section class="sec wrap" id="solution">
		<h2 class="head" use:reveal>The solution</h2>
		<p class="note" use:reveal>
			<b>Optional conversation threads, like Reddit’s.</b> People can reply under a specific message without
			mixing it into other chats. Each thread can be expanded or collapsed, and shows its reply count. Normal
			chatting stays as it is.
		</p>

		<div class="compare">
			<article class="side side--today" use:reveal>
				<p class="tag">Current</p>
				<h3>{compare.today.label}</h3>
				<ul>
					{#each compare.today.points as pt (pt)}<li>{pt}</li>{/each}
				</ul>
			</article>
			<article class="side side--new" use:reveal={{ delay: 0.06 }}>
				<p class="tag">Redesign</p>
				<h3>{compare.redesign.label}</h3>
				<ul>
					{#each compare.redesign.points as pt (pt)}<li>{pt}</li>{/each}
				</ul>
			</article>
		</div>
	</section>

	<!-- HOW IT WORKS -->
	<section class="sec wrap" id="how-it-works">
		<h2 class="head" use:reveal>How it works</h2>
		<ol class="steps">
			{#each steps as s, i (s.title)}
				<li class="card" use:reveal={{ delay: i * 0.05 }}>
					<span class="num">{i + 1}</span>
					<h3>{s.title}</h3>
					<p>{s.text}</p>
				</li>
			{/each}
		</ol>
	</section>

	<!-- ANATOMY -->
	<section class="sec wrap" id="anatomy">
		<h2 class="head" use:reveal>Anatomy of a thread</h2>
		<div class="anatomy" use:revealScale>
			<div class="specimen" aria-hidden="true">
				<div class="spec-bubble">
					<i class="pin pin--1">1</i>
					<b style:color={people.arjun.tone}>Arjun</b>
					<p>Goa trip — Dec 20 to 24? Who’s in? <small>6:02 PM</small></p>
					<div class="spec-bar">
						<span class="spec-stack">
							{#each ['priya', 'neha', 'sana'] as p (p)}
								<span style:background={people[p].tone}>{people[p].name.charAt(0)}</span>
							{/each}
							<i class="pin pin--3">3</i>
						</span>
						<span class="spec-count">14 replies <i class="pin pin--2">2</i></span>
						<span class="spec-last">· 2m <i class="pin pin--4">4</i></span>
						<span class="spec-unread">3 <i class="pin pin--5">5</i></span>
					</div>
				</div>
			</div>
			<ol class="callouts">
				{#each anatomy as a (a.n)}
					<li>
						<span class="pin-static">{a.n}</span>
						<div>
							<h3>{a.title}</h3>
							<p>{a.text}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- DECISIONS -->
	<section class="sec wrap" id="decisions">
		<h2 class="head" use:reveal>Design decisions</h2>
		<div class="cards cards--2">
			{#each decisions as d, i (d.title)}
				<article class="card card--decision" use:reveal={{ delay: (i % 2) * 0.06 }}>
					<h3>{d.title}</h3>
					<p>{d.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- TESTING -->
	<section class="sec wrap" id="testing">
		<h2 class="head" use:reveal>How I’d test it</h2>
		<p class="note" use:reveal>{testing.note}</p>
		<p class="who" use:reveal><b>Who:</b> {testing.who}</p>
		<div class="cards cards--2">
			{#each testing.tasks as t, i (t.title)}
				<article class="card" use:reveal={{ delay: (i % 2) * 0.06 }}>
					<span class="num">0{i + 1}</span>
					<h3>{t.title}</h3>
					<p>{t.text}</p>
				</article>
			{/each}
		</div>
	</section>

</div>

<style>
	.wa {
		/* the custom cursor has to flip to dark ink over this light page */
		--c-cursor: #111b21;
		--c-cursor-ink: #f4f1ec;

		--wa-bg: #f4f1ec;
		--wa-card: #ffffff;
		--wa-ink: #111b21;
		--wa-ink-soft: #54656f;
		--wa-green: #008069;
		--wa-green-soft: #e7f6f1;
		--wa-red: #c2410c;
		--wa-red-soft: #fdf1ea;
		--wa-rule: #e4e0d8;
		--wa-shadow: 0 1px 2px rgb(17 27 33 / 4%), 0 18px 40px -28px rgb(17 27 33 / 30%);

		position: relative;
		min-height: 100vh;
		padding: 12px 0 120px;
		/* faint hand-drawn chat doodles tiled behind everything */
		background: var(--wa-bg) url('/whatsapp/doodle-bg.svg') center top / 360px 360px repeat;
		color: var(--wa-ink-soft);
		font-family: 'Plus Jakarta Sans', 'Poppins', system-ui, sans-serif;
		font-size: 16px;
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
		overflow-x: clip;
	}
	.wa h1,
	.wa h2,
	.wa h3 {
		margin: 0;
		color: var(--wa-ink);
		font-weight: 700;
		line-height: 1.2;
	}
	.wa p { margin: 0; }

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
		background: var(--wa-bg);
		font-size: 15px;
		font-weight: 500;
		color: var(--wa-ink-soft);
	}
	.back:hover,
	.back:focus-visible {
		color: var(--wa-ink);
		outline: none;
	}

	/* ---------- hero ---------- */
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		grid-template-rows: auto auto;
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
		background: var(--wa-green-soft);
		color: var(--wa-green);
		font-size: 13px;
		font-weight: 600;
	}
	.hero h1 {
		width: fit-content;
		margin-top: 18px;
		padding: 6px 16px 10px 0;
		border-radius: 20px;
		background: var(--wa-bg);
		box-shadow: 0 0 0 6px var(--wa-bg);
		font-size: clamp(40px, 5.6vw, 64px);
		letter-spacing: -0.035em;
		line-height: 1.04;
	}
	.hero h1 span { color: var(--wa-green); }
	.wa .lead {
		margin-top: 20px;
		padding: 8px 14px 8px 0;
		border-radius: 16px;
		background: var(--wa-bg);
		box-shadow: 0 0 0 6px var(--wa-bg);
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
		background: var(--wa-card);
		box-shadow: var(--wa-shadow);
	}
	.facts dt {
		font-size: 13px;
		color: var(--wa-ink-soft);
	}
	.facts dd {
		margin: 2px 0 0;
		color: var(--wa-ink);
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
		background: var(--wa-bg);
		box-shadow: 0 0 0 6px var(--wa-bg);
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
		background: var(--wa-green);
	}
	.wa .note {
		margin-top: 16px;
		padding: 8px 14px 8px 0;
		border-radius: 16px;
		background: var(--wa-bg);
		box-shadow: 0 0 0 6px var(--wa-bg);
		font-size: 19px;
		line-height: 1.7;
	}
	.note b { color: var(--wa-ink); }

	.quote {
		margin: 20px 0 0;
		padding: 20px 24px;
		border-left: 4px solid var(--wa-green);
		border-radius: 0 20px 20px 0;
		background: var(--wa-card);
		color: var(--wa-ink);
		font-size: 20px;
		font-weight: 500;
		line-height: 1.6;
	}

	.strip-card {
		margin: 28px 0 0;
		padding: 24px;
		border-radius: 24px;
		background: var(--wa-card);
		box-shadow: var(--wa-shadow);
	}
	.strip {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(14px, 1fr));
		gap: 6px;
	}
	.strip span {
		aspect-ratio: 1;
		border-radius: 50%;
	}
	.strip-card figcaption {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 12px 24px;
		margin-top: 18px;
		font-size: 14px;
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 16px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.legend li {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.legend li::before {
		content: '';
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--topic);
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
		background: var(--wa-card);
		box-shadow: var(--wa-shadow);
	}
	.card h3 { font-size: 19px; }
	.card p { margin-top: 10px; }
	.num {
		display: inline-block;
		margin-bottom: 14px;
		color: var(--wa-green);
		font-size: 14px;
		font-weight: 700;
	}
	.card--decision { border-top: 4px solid var(--wa-green); }

	/* ---------- compare ---------- */
	.compare {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
		margin-top: 28px;
	}
	.side {
		padding: 28px;
		border-radius: 24px;
	}
	.side--today { background: var(--wa-red-soft); }
	.side--new { background: var(--wa-green-soft); }
	.tag {
		display: inline-block;
		padding: 4px 10px;
		border-radius: 999px;
		background: #fff;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.side--today .tag { color: var(--wa-red); }
	.side--new .tag { color: var(--wa-green); }
	.side h3 {
		margin-top: 14px;
		font-size: 22px;
	}
	.side ul {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin: 18px 0 0;
		padding: 0;
		list-style: none;
	}
	.side li {
		position: relative;
		padding-left: 28px;
		color: var(--wa-ink);
	}
	.side li::before {
		position: absolute;
		left: 0;
		top: 2px;
		display: grid;
		place-items: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		color: #fff;
		font-size: 11px;
		font-weight: 700;
		line-height: 1;
	}
	.side--today li::before { content: '✕'; background: var(--wa-red); }
	.side--new li::before { content: '✓'; background: var(--wa-green); }

	/* ---------- steps ---------- */
	.steps {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 20px;
		margin: 28px 0 0;
		padding: 0;
		list-style: none;
	}
	.steps .num {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--wa-green);
		color: #fff;
	}

	/* ---------- anatomy ---------- */
	.anatomy {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		align-items: center;
		gap: 40px;
		margin-top: 28px;
		padding: 40px;
		border-radius: 28px;
		background: var(--wa-card);
		box-shadow: var(--wa-shadow);
	}
	.specimen {
		display: grid;
		place-items: center;
		padding: 56px 28px;
		border-radius: 20px;
		background: #efeae2 url('/whatsapp/chat-wallpaper.avif') center top / 380px auto repeat;
	}
	.spec-bubble {
		position: relative;
		width: min(100%, 360px);
		padding: 10px 14px 10px;
		border-radius: 0 14px 14px 14px;
		background: #fff;
		box-shadow: 0 1px 1px rgb(11 20 26 / 14%);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}
	.spec-bubble b { font-size: 15px; }
	.spec-bubble p {
		color: #111b21;
		font-size: 17px;
		line-height: 1.4;
	}
	.spec-bubble small {
		margin-left: 8px;
		color: #667781;
		font-size: 12px;
	}
	.spec-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 10px;
		padding-top: 10px;
		border-top: 1px solid #e9edef;
		color: #00a884;
	}
	.spec-stack { position: relative; display: inline-flex; }
	.spec-stack span {
		display: grid;
		place-items: center;
		width: 26px;
		height: 26px;
		border: 2px solid #fff;
		border-radius: 50%;
		color: #fff;
		font-size: 12px;
		font-weight: 700;
	}
	.spec-stack span + span { margin-left: -9px; }
	.spec-count { position: relative; font-size: 15px; font-weight: 600; }
	.spec-last { position: relative; color: #667781; font-size: 14px; }
	.spec-unread {
		position: relative;
		display: grid;
		place-items: center;
		min-width: 22px;
		height: 22px;
		border-radius: 999px;
		background: #25d366;
		color: #fff;
		font-size: 12px;
		font-weight: 700;
	}
	.pin,
	.pin-static {
		display: grid;
		place-items: center;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		background: var(--wa-ink);
		color: #fff;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
		font-size: 12px;
		font-style: normal;
		font-weight: 700;
	}
	.pin { position: absolute; }
	.pin--1 { top: -11px; right: -11px; }
	.pin--2 { bottom: -32px; left: 50%; translate: -50% 0; }
	.pin--3 { bottom: -32px; left: 50%; translate: -50% 0; }
	.pin--4 { bottom: -32px; left: 50%; translate: -50% 0; }
	.pin--5 { bottom: -32px; left: 50%; translate: -50% 0; }
	.callouts {
		display: flex;
		flex-direction: column;
		gap: 18px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.callouts li {
		display: flex;
		gap: 14px;
	}
	.pin-static { flex: none; margin-top: 2px; }
	.callouts h3 { font-size: 16px; }
	.callouts p { margin-top: 2px; font-size: 15px; }

	/* ---------- testing + questions ---------- */
	.wa .who {
		margin-top: 14px;
		color: var(--wa-ink);
	}

	/* ---------- responsive ---------- */
	@media (max-width: 960px) {
		.hero {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto auto 1fr;
			gap: 40px;
		}
		.back,
		.hero-copy,
		.hero-phone { grid-area: auto; }
		.steps { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		.anatomy {
			grid-template-columns: 1fr;
			padding: 24px;
		}
	}
	@media (max-width: 700px) {
		.sec { margin-top: 44px; }
		.head { font-size: 22px; gap: 9px; }
		.head::before { width: 10px; height: 10px; }
		.wa .note, .quote { font-size: 17px; }
		.wa .lead { font-size: 17px; }
		.cards--3,
		.cards--2,
		.compare,
		.steps { grid-template-columns: 1fr; }
		.card, .side { padding: 22px; }
		.specimen { padding: 48px 12px; }
		.spec-bubble p { font-size: 15px; }
	}
</style>
