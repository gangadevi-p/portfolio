<script>
	/* A 10s product walkthrough for the Designer's Tool-Kit card: the app's own
	   UI (top bar, sidebar, pages) with a cursor that works it. Where the Athera
	   loop is staged, this one is driven — every change follows a click:
	     0–3.5s  Components — cursor lands on the Email field, clicks, types
	     3.5–5.9 Colors     — clicks Colors in the sidebar, the Mono scale grows in
	     5.9–8.1 Heuristics — clicks Heuristics, three rule cards pop in
	     8.1–10s Save       — clicks +, a "Saved" toast confirms and holds
	   Everything sizes in cqw, so the loop scales with the laptop screen. Off
	   screen it pauses; with reduced motion it rests on the filled text field. */
	let reel;
	let idle = $state(false);

	$effect(() => {
		const observer = new IntersectionObserver(([entry]) => (idle = !entry.isIntersecting));
		observer.observe(reel);
		return () => observer.disconnect();
	});

	const typed = [...'alex@design.system'];
	const mono = [
		['50', '#fafafa'],
		['100', '#f3f3f3'],
		['200', '#e5e5e5'],
		['300', '#d1d1d1'],
		['400', '#a3a3a3'],
		['500', '#737373'],
		['600', '#525252'],
		['700', '#404040'],
		['800', '#262626'],
		['900', '#171717'],
		['950', '#0a0a0a']
	];
	const rules = [
		{ n: '01', title: 'Visibility of system status', body: 'Always tell people what is happening, with feedback that arrives in time.' },
		{ n: '02', title: 'Match the real world', body: 'Use the words, order and ideas people already know, not internal terms.' },
		{ n: '03', title: 'User control and freedom', body: 'Give people a clearly marked way out of a mistake: undo, cancel, back.' }
	];
	/* sidebar rows — y is in cqw from the top of the sidebar; `page` marks the
	   rows the cursor visits, which light up while their page is showing */
	const side = [
		{ group: 'UI', y: 1.2 },
		{ label: 'Components', y: 4.8, page: 'a' },
		{ label: 'Buttons', y: 8.8 },
		{ label: 'Colors', y: 12.8, page: 'b' },
		{ label: 'Typography', y: 16.8 },
		{ group: 'UX', y: 21.4 },
		{ label: 'Principles', y: 24.2 },
		{ label: 'Heuristics', y: 28.2, page: 'c' },
		{ label: 'Research', y: 32.2 }
	];
	/* where the clicks land (cqw) — the cursor and each ripple share these */
	const clicks = [
		{ x: 56.6, y: 42.9, delay: 0 },
		{ x: 11.6, y: 21.8, delay: 2.51 },
		{ x: 11.6, y: 37.2, delay: 4.81 },
		{ x: 95.7, y: 3.5, delay: 7.03 }
	];
</script>

<div class="reel" class:idle bind:this={reel}>
	<!-- top bar -->
	<header class="top">
		<span class="sq"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" /></svg></span>
		<b class="brand">Toolkit</b>
		<span class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" /><path d="m20 20-4-4" /></svg>Search</span>
		<span class="saved"><svg viewBox="0 0 24 24"><path d="M7 4h10v16l-5-4-5 4z" /></svg>Saved</span>
		<span class="plus"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg></span>
	</header>

	<!-- sidebar -->
	<nav class="side">
		<i class="hi"></i>
		{#each side as row (row.group ?? row.label)}
			{#if row.group}
				<span class="grp" style:top="{row.y}cqw">{row.group}</span>
			{:else}
				<span class="item {row.page ? `item--${row.page}` : ''}" style:top="{row.y}cqw">{row.label}</span>
			{/if}
		{/each}
	</nav>

	<!-- pages -->
	<div class="main">
		<section class="page page--a">
			<h2>Components</h2>
			<p class="sub">The essentials, with their states and sizes.</p>
			<div class="chips"><span class="on">All</span><span>Inputs</span><span>Navigation</span><span>Feedback</span><span>Content</span></div>
			<div class="card">
				<div class="card-head">
					<b>Text field</b>
					<span class="specs">Height <em>40</em> Radius <em>8</em> Padding <em>12</em></span>
				</div>
				<div class="card-body">
					<div class="label-row">
						<span>Email</span>
						<span class="states">
							<span class="state state--default">Default</span>
							<span class="state state--focused">Focused</span>
							<span class="state state--filled">Filled</span>
						</span>
					</div>
					<div class="input">
						<span class="placeholder">name@company.com</span>
						<span class="typed"
							>{#each typed as ch, i (i)}<span class="ch" style:animation-delay="{i * 0.09}s">{ch}</span>{/each}</span
						><i class="caret"></i>
					</div>
					<span class="helper">We only use it to sign you in.</span>
				</div>
			</div>
		</section>

		<section class="page page--b">
			<h2>Colors</h2>
			<p class="sub">Black, white and grey. Nothing else.</p>
			<div class="accent">
				<div class="tile"><b>Mono</b><span>Mono 900 · #171717</span></div>
				<div class="rule-text">
					<small>One accent</small>
					<b>Black means “you can act on this”</b>
					<p>Buttons, links, checked controls, selected items, focus and primary actions.</p>
				</div>
			</div>
			<b class="label">Accent tones</b>
			<div class="tones">
				{#each mono as [name, hex], i (name)}
					<span class="tone"
						><i style:background={hex} style:animation-delay="{i * 0.06}s"></i><em>{name}</em></span
					>
				{/each}
			</div>
		</section>

		<section class="page page--c">
			<h2>Heuristics</h2>
			<p class="sub">Ten rules to judge any interface.</p>
			<b class="label">Nielsen’s 10 heuristics</b>
			<div class="rules">
				{#each rules as r, i (r.n)}
					<article class="rule" style:animation-delay="{i * 0.12}s">
						<span class="num">{r.n}</span>
						<b>{r.title}</b>
						<p>{r.body}</p>
					</article>
				{/each}
			</div>
		</section>
	</div>

	<span class="toast"><i>✓</i> Saved to your notes</span>

	{#each clicks as c, i (i)}
		<i class="ripple" style:left="{c.x}cqw" style:top="{c.y}cqw" style:animation-delay="{c.delay}s"></i>
	{/each}
	<svg class="cursor" viewBox="0 0 24 24" aria-hidden="true">
		<path d="M5 3l14 8-6 2-3 6z" />
	</svg>
	<i class="cover"></i>
</div>

<style>
	.reel {
		--loop: 10s;
		--card: #171717;
		--line: #404040;
		--soft: #a3a3a3;
		--mute: #737373;
		--out: cubic-bezier(0.22, 1, 0.36, 1);
		--spring: cubic-bezier(0.34, 1.56, 0.64, 1);
		position: absolute;
		inset: 0;
		container-type: inline-size;
		overflow: hidden;
		background: #0a0a0a;
		color: #fafafa;
		font-family: Poppins, system-ui, -apple-system, 'Segoe UI', sans-serif;
	}
	.reel * {
		animation-duration: var(--loop);
		animation-iteration-count: infinite;
		animation-fill-mode: both;
	}
	.reel.idle * {
		animation-play-state: paused;
	}

	/* ---- top bar --------------------------------------------------------- */
	.top {
		position: absolute;
		inset: 0 0 auto 0;
		height: 7cqw;
		display: flex;
		align-items: center;
		gap: 1.2cqw;
		padding-inline: 2cqw;
		border-bottom: 1px solid #1a1a1a;
	}
	.top svg {
		width: 2cqw;
		height: 2cqw;
		flex: none;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.sq,
	.saved,
	.plus {
		display: flex;
		align-items: center;
		gap: 0.8cqw;
		height: 4.4cqw;
		padding-inline: 1.2cqw;
		border-radius: 1.2cqw;
		background: var(--card);
		font-size: 1.7cqw;
		font-weight: 500;
	}
	.sq {
		width: 4.4cqw;
		justify-content: center;
		padding: 0;
	}
	.plus {
		width: 4.4cqw;
		justify-content: center;
		padding: 0;
		background: #fafafa;
		color: #0a0a0a;
		animation-name: plus;
	}
	.brand {
		font-size: 2.2cqw;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.search {
		display: flex;
		flex: 1;
		align-items: center;
		gap: 0.9cqw;
		height: 4.4cqw;
		padding-inline: 1.4cqw;
		border-radius: 1.2cqw;
		background: var(--card);
		color: var(--mute);
		font-size: 1.7cqw;
	}

	/* ---- sidebar --------------------------------------------------------- */
	.side {
		position: absolute;
		left: 0;
		top: 7cqw;
		bottom: 0;
		width: 22cqw;
		border-right: 1px solid #141414;
	}
	.hi {
		position: absolute;
		left: 1.2cqw;
		top: 0;
		width: 19.6cqw;
		height: 4cqw;
		border-radius: 1cqw;
		background: #262626;
		translate: 0 4.8cqw;
		animation-name: hi;
	}
	.grp {
		position: absolute;
		left: 2.6cqw;
		font-size: 1.3cqw;
		font-weight: 600;
		letter-spacing: 0.12em;
		color: var(--mute);
	}
	.item {
		position: absolute;
		left: 1.2cqw;
		width: 19.6cqw;
		height: 4cqw;
		padding-left: 4.4cqw;
		font-size: 1.85cqw;
		font-weight: 500;
		line-height: 4cqw;
		color: var(--soft);
	}
	.item::before {
		content: '';
		position: absolute;
		left: 1.6cqw;
		top: 1.2cqw;
		width: 1.5cqw;
		height: 1.5cqw;
		border: 0.2cqw solid currentColor;
		border-radius: 0.45cqw;
		opacity: 0.8;
	}
	.item--a {
		color: #fafafa;
		animation-name: act-a;
	}
	.item--b {
		animation-name: act-b;
	}
	.item--c {
		animation-name: act-c;
	}

	/* ---- pages ----------------------------------------------------------- */
	.main {
		position: absolute;
		left: 22cqw;
		right: 0;
		top: 7cqw;
		bottom: 0;
	}
	.page {
		position: absolute;
		inset: 0;
		padding: 3cqw;
		opacity: 0;
	}
	.page--a {
		opacity: 1;
		animation-name: page-a;
	}
	.page--b {
		animation-name: page-b;
	}
	.page--c {
		animation-name: page-c;
	}
	h2 {
		font-size: 4.4cqw;
		font-weight: 600;
		letter-spacing: -0.035em;
		line-height: 1.1;
	}
	.sub {
		margin-top: 0.8cqw;
		font-size: 1.9cqw;
		color: var(--soft);
	}
	.label {
		display: block;
		font-size: 2.4cqw;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	/* A · text field */
	.chips {
		display: flex;
		gap: 1cqw;
		margin-top: 2cqw;
	}
	.chips span {
		padding: 0.8cqw 1.6cqw;
		border-radius: 99px;
		background: var(--card);
		font-size: 1.5cqw;
		color: var(--soft);
	}
	.chips .on {
		background: #303030;
		color: #fafafa;
	}
	.card {
		margin-top: 3cqw;
		padding: 2.4cqw;
		border-radius: 2cqw;
		background: var(--card);
	}
	.card-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 1.6cqw;
	}
	.card-head b {
		font-size: 2.3cqw;
		font-weight: 600;
	}
	.specs {
		font-size: 1.3cqw;
		color: var(--mute);
	}
	.specs em {
		margin-right: 0.8em;
		font-style: normal;
		color: #e5e5e5;
	}
	.specs em:last-child {
		margin-right: 0;
	}
	.card-body {
		display: flex;
		flex-direction: column;
		gap: 1cqw;
		padding: 2.2cqw;
		border-radius: 1.4cqw;
		background: #000;
	}
	.label-row {
		display: flex;
		justify-content: space-between;
		font-size: 1.7cqw;
		font-weight: 500;
	}
	.states {
		display: grid;
		justify-items: end;
	}
	.state {
		grid-area: 1 / 1;
		font-size: 1.2cqw;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--soft);
	}
	.state--default {
		opacity: 0;
		animation-name: state-default;
	}
	.state--focused {
		opacity: 0;
		animation-name: state-focused;
	}
	.state--filled {
		opacity: 1;
		animation-name: state-filled;
	}
	.input {
		position: relative;
		display: flex;
		align-items: center;
		height: 5.6cqw;
		padding-inline: 1.6cqw;
		border: 1px solid var(--line);
		border-radius: 1.2cqw;
		font-size: 2cqw;
		animation-name: input;
	}
	.placeholder {
		position: absolute;
		left: 1.6cqw;
		color: var(--mute);
		opacity: 0;
		animation-name: placeholder;
	}
	/* typing: one character every 90ms; the wrapper stays hidden until the
	   first one lands, so characters resetting after the loop point never show */
	.typed {
		white-space: nowrap;
		animation-name: typed;
	}
	.ch {
		display: inline-block;
		overflow: hidden;
		vertical-align: top;
		animation-name: type;
	}
	.caret {
		width: 1px;
		height: 2.8cqw;
		margin-left: 1px;
		background: #fafafa;
		opacity: 0;
		animation-name: caret;
	}
	.helper {
		font-size: 1.3cqw;
		color: var(--mute);
	}

	/* B · colors */
	.accent {
		display: grid;
		grid-template-columns: 22cqw 1fr;
		gap: 1.6cqw;
		margin-top: 2.4cqw;
		padding: 1.4cqw;
		border-radius: 2cqw;
		background: var(--card);
	}
	.tile {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 12.4cqw;
		padding: 1.4cqw;
		border-radius: 1.4cqw;
		background: #fafafa;
		color: #0a0a0a;
	}
	.tile b {
		font-size: 2.4cqw;
		font-weight: 600;
	}
	.tile span {
		font-size: 1.3cqw;
		color: #525252;
	}
	.rule-text {
		align-self: center;
	}
	.rule-text small {
		font-size: 1.1cqw;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--mute);
	}
	.rule-text b {
		display: block;
		margin-top: 0.6cqw;
		font-size: 2cqw;
		font-weight: 600;
		line-height: 1.25;
	}
	.rule-text p {
		margin-top: 0.8cqw;
		font-size: 1.4cqw;
		line-height: 1.45;
		color: var(--soft);
	}
	.page--b .label {
		margin-top: 2.6cqw;
	}
	.tones {
		display: flex;
		gap: 0.6cqw;
		margin-top: 1.2cqw;
	}
	.tone {
		flex: 1;
	}
	.tone i {
		display: block;
		height: 9.4cqw;
		border-radius: 0.9cqw;
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 10%);
		transform-origin: 50% 100%;
		animation-name: tone;
	}
	.tone em {
		display: block;
		margin-top: 0.7cqw;
		font-size: 1.2cqw;
		font-style: normal;
		text-align: center;
		color: var(--soft);
	}

	/* C · heuristics */
	.page--c .label {
		margin-top: 2.4cqw;
	}
	.rules {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.4cqw;
		margin-top: 1.4cqw;
	}
	.rule {
		padding: 1.8cqw;
		border-radius: 1.6cqw;
		background: var(--card);
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 6%);
		animation-name: rule;
	}
	.num {
		display: inline-grid;
		place-items: center;
		width: 3cqw;
		height: 3cqw;
		border-radius: 0.9cqw;
		background: #262626;
		font-size: 1.1cqw;
		font-weight: 600;
	}
	.rule b {
		display: block;
		margin-top: 1.6cqw;
		font-size: 1.85cqw;
		font-weight: 600;
		line-height: 1.25;
	}
	.rule p {
		margin-top: 0.8cqw;
		font-size: 1.3cqw;
		line-height: 1.45;
		color: var(--soft);
	}

	/* ---- toast, ripples, cursor, cover ----------------------------------- */
	.toast {
		position: absolute;
		left: 50%;
		bottom: 3.6cqw;
		display: flex;
		align-items: center;
		gap: 0.9cqw;
		padding: 1cqw 2.2cqw 1cqw 1.1cqw;
		border-radius: 99px;
		background: #fafafa;
		color: #0a0a0a;
		font-size: 1.7cqw;
		font-weight: 500;
		white-space: nowrap;
		translate: -50% 0;
		opacity: 0;
		box-shadow: 0 1.6cqw 3cqw rgb(0 0 0 / 50%);
		animation-name: toast;
	}
	.toast i {
		display: grid;
		place-items: center;
		width: 2.4cqw;
		height: 2.4cqw;
		border-radius: 50%;
		background: #0a0a0a;
		color: #fafafa;
		font-size: 1.3cqw;
		font-style: normal;
	}
	.ripple {
		position: absolute;
		width: 4.4cqw;
		height: 4.4cqw;
		margin: -2.2cqw 0 0 -2.2cqw;
		border: 0.3cqw solid rgb(255 255 255 / 70%);
		border-radius: 50%;
		opacity: 0;
		animation-name: ripple;
	}
	.cursor {
		position: absolute;
		left: 0;
		top: 0;
		width: 3cqw;
		height: 3cqw;
		fill: #fff;
		stroke: #0a0a0a;
		stroke-width: 1.3;
		stroke-linejoin: round;
		filter: drop-shadow(0 0.4cqw 0.5cqw rgb(0 0 0 / 60%));
		opacity: 0;
		translate: 98cqw 62cqw;
		animation-name: cursor;
	}
	/* black veil the loop fades through, so everything can reset unseen */
	.cover {
		position: absolute;
		inset: 0;
		background: #0a0a0a;
		opacity: 0;
		pointer-events: none;
		animation-name: cover;
	}

	/* ---- timeline (percent of the 10s loop) ------------------------------ */
	@keyframes cursor {
		0% { translate: 98cqw 62cqw; opacity: 0; scale: 1; animation-timing-function: ease-in-out; }
		3% { translate: 90cqw 54cqw; opacity: 1; scale: 1; animation-timing-function: ease-in-out; }
		10% { translate: 56cqw 42.5cqw; scale: 1; animation-timing-function: ease; }
		10.8% { translate: 56cqw 42.5cqw; scale: 0.84; animation-timing-function: ease; }
		11.6%, 30% { translate: 56cqw 42.5cqw; scale: 1; animation-timing-function: ease-in-out; }
		35% { translate: 11cqw 21.4cqw; scale: 1; animation-timing-function: ease; }
		35.9% { translate: 11cqw 21.4cqw; scale: 0.84; animation-timing-function: ease; }
		36.7%, 44% { translate: 11cqw 21.4cqw; scale: 1; animation-timing-function: ease-in-out; }
		50% { translate: 15cqw 24cqw; scale: 1; animation-timing-function: ease-in-out; }
		57.9% { translate: 11cqw 36.8cqw; scale: 1; animation-timing-function: ease; }
		58.8% { translate: 11cqw 36.8cqw; scale: 0.84; animation-timing-function: ease; }
		59.6%, 66% { translate: 11cqw 36.8cqw; scale: 1; animation-timing-function: ease-in-out; }
		80% { translate: 95.1cqw 3.1cqw; scale: 1; animation-timing-function: ease; }
		81% { translate: 95.1cqw 3.1cqw; scale: 0.84; animation-timing-function: ease; }
		81.8%, 92% { translate: 95.1cqw 3.1cqw; scale: 1; opacity: 1; }
		94.5%, 100% { translate: 95.1cqw 3.1cqw; scale: 1; opacity: 0; }
	}
	/* one click ring, replayed at each click point through animation-delay */
	@keyframes ripple {
		0%, 10.6% { opacity: 0; scale: 0.2; }
		10.7% { opacity: 0.85; scale: 0.2; animation-timing-function: var(--out); }
		15%, 100% { opacity: 0; scale: 1.8; }
	}
	@keyframes cover {
		0% { opacity: 1; animation-timing-function: ease-out; }
		5%, 96% { opacity: 0; animation-timing-function: ease-in; }
		99.5%, 100% { opacity: 1; }
	}
	@keyframes hi {
		0%, 36.2% { translate: 0 4.8cqw; animation-timing-function: var(--out); }
		38.7%, 59.2% { translate: 0 12.8cqw; animation-timing-function: var(--out); }
		61.7%, 100% { translate: 0 28.2cqw; }
	}
	@keyframes act-a {
		0%, 36.2% { color: #fafafa; }
		38%, 100% { color: #a3a3a3; }
	}
	@keyframes act-b {
		0%, 36.2% { color: #a3a3a3; }
		38%, 59.2% { color: #fafafa; }
		61%, 100% { color: #a3a3a3; }
	}
	@keyframes act-c {
		0%, 59.2% { color: #a3a3a3; }
		61%, 100% { color: #fafafa; }
	}
	@keyframes page-a {
		0%, 36.5% { opacity: 1; translate: 0 0; }
		38.5%, 100% { opacity: 0; translate: 0 -2%; }
	}
	@keyframes page-b {
		0%, 36.5% { opacity: 0; translate: 0 3%; animation-timing-function: var(--out); }
		39.5%, 59.5% { opacity: 1; translate: 0 0; animation-timing-function: ease-in; }
		61.5%, 100% { opacity: 0; translate: 0 -2%; }
	}
	@keyframes page-c {
		0%, 59.5% { opacity: 0; translate: 0 3%; animation-timing-function: var(--out); }
		62.5%, 100% { opacity: 1; translate: 0 0; }
	}
	@keyframes tone {
		0%, 39% { scale: 1 0; animation-timing-function: var(--spring); }
		45.5%, 100% { scale: 1 1; }
	}
	@keyframes rule {
		0%, 62% { opacity: 0; translate: 0 30%; scale: 0.96; animation-timing-function: var(--spring); }
		68%, 100% { opacity: 1; translate: 0 0; scale: 1; }
	}
	@keyframes state-default {
		0%, 10.9% { opacity: 1; }
		11%, 100% { opacity: 0; }
	}
	@keyframes state-focused {
		0%, 10.9% { opacity: 0; }
		11%, 29.9% { opacity: 1; }
		30%, 100% { opacity: 0; }
	}
	@keyframes state-filled {
		0%, 29.9% { opacity: 0; }
		30%, 100% { opacity: 1; }
	}
	@keyframes input {
		0%, 10.9% { border-color: var(--line); box-shadow: none; }
		11%, 29.9% { border-color: #fafafa; box-shadow: 0 0 0 0.4cqw rgb(255 255 255 / 18%); }
		30%, 100% { border-color: var(--line); box-shadow: none; }
	}
	@keyframes placeholder {
		0%, 12.9% { opacity: 1; }
		13%, 100% { opacity: 0; }
	}
	@keyframes typed {
		0%, 12.8% { opacity: 0; }
		12.9%, 100% { opacity: 1; }
	}
	@keyframes type {
		0%, 13% { max-width: 0; animation-timing-function: step-end; }
		13.01%, 100% { max-width: 1em; }
	}
	@keyframes caret {
		0%, 10.9% { opacity: 0; }
		11%, 29.9% { opacity: 1; }
		30%, 100% { opacity: 0; }
	}
	@keyframes plus {
		0%, 80.3% { scale: 1; background: #fafafa; }
		81.1% { scale: 0.86; background: #d1d1d1; }
		82.8%, 100% { scale: 1; background: #fafafa; }
	}
	@keyframes toast {
		0%, 81.8% { opacity: 0; translate: -50% 140%; animation-timing-function: var(--spring); }
		85%, 94% { opacity: 1; translate: -50% 0; }
		96.5%, 100% { opacity: 0; translate: -50% 0; }
	}

	/* reduced motion: hold the filled text field */
	@media (prefers-reduced-motion: reduce) {
		.reel * {
			animation: none;
		}
	}
</style>
