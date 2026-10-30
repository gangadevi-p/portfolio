<script>
	/* The phone-sized twin of ToolkitReel — the same 10s walkthrough, in step
	   with it, laid out like the app on mobile and driven by taps instead of a
	   cursor: tap the field and type, tap the menu to move to Colors, tap it
	   again for Heuristics, then tap + to save. Sizes are in cqw of the phone
	   screen. */
	let reel;
	let idle = $state(false);

	$effect(() => {
		const observer = new IntersectionObserver(([entry]) => (idle = !entry.isIntersecting));
		observer.observe(reel);
		return () => observer.disconnect();
	});

	const typed = [...'alex@design.system'];
	const mono = ['#fafafa', '#f3f3f3', '#e5e5e5', '#d1d1d1', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717', '#0a0a0a'];
	const rules = [
		{ n: '01', title: 'Visibility of system status', body: 'Always tell people what is happening, with feedback that arrives in time.' },
		{ n: '02', title: 'Match the real world', body: 'Use the words, order and ideas people already know, not internal terms.' },
		{ n: '03', title: 'User control and freedom', body: 'Give people a clearly marked way out of a mistake: undo, cancel, back.' }
	];
	/* where the taps land (cqw) — each ripple replays at its own moment */
	const taps = [
		{ x: 50, y: 98, delay: 0 },
		{ x: 8.5, y: 18.5, delay: 2.51 },
		{ x: 8.5, y: 18.5, delay: 4.81 },
		{ x: 91.5, y: 18.5, delay: 7.03 }
	];
</script>

<div class="reel" class:idle bind:this={reel}>
	<!-- app top bar -->
	<header class="bar">
		<span class="btn btn--menu"
			><svg viewBox="0 0 24 24"><path d="M5 8h14M5 12h14M5 16h14" /></svg></span
		>
		<span class="ttl">
			<small>Toolkit</small>
			<span class="names"><b class="n1">Components</b><b class="n2">Colors</b><b class="n3">Heuristics</b></span>
		</span>
		<span class="btn btn--wide"
			><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" /><path d="m20 20-4-4" /></svg></span
		>
		<span class="btn"
			><svg viewBox="0 0 24 24"><path d="M7 4h10v16l-5-4-5 4z" /></svg></span
		>
		<span class="btn btn--light btn--plus"
			><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg></span
		>
	</header>
	<i class="bar-line"></i>

	<!-- pages -->
	<section class="page page--a">
		<h2>Components</h2>
		<p class="sub">The essentials, with their states and sizes.</p>
		<div class="chips"><span class="on">All</span><span>Inputs</span><span>Navigation</span><span>Feedback</span></div>
		<div class="field">
			<b class="field-title">Text field</b>
			<div class="field-body">
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
		<div class="tile"><b>Mono</b><span>Mono 900 · #171717</span></div>
		<b class="label">Accent tones</b>
		<div class="tones">
			{#each mono as c, i (c)}
				<i style:background={c} style:animation-delay="{i * 0.06}s"></i>
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
					<div><b>{r.title}</b><p>{r.body}</p></div>
				</article>
			{/each}
		</div>
	</section>

	<span class="toast"><i>✓</i> Saved to your notes</span>

	{#each taps as t, i (i)}
		<i class="ripple" style:left="{t.x}cqw" style:top="{t.y}cqw" style:animation-delay="{t.delay}s"></i>
	{/each}
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
	.bar {
		position: absolute;
		top: 14cqw;
		left: 4cqw;
		right: 4cqw;
		display: flex;
		align-items: center;
		gap: 2cqw;
	}
	.btn {
		display: grid;
		place-items: center;
		flex: none;
		width: 9cqw;
		height: 9cqw;
		border-radius: 2.4cqw;
		background: var(--card);
	}
	.btn--menu {
		animation-name: menu;
	}
	.btn--wide {
		width: 13cqw;
		margin-left: auto;
	}
	.btn--light {
		background: #fafafa;
		color: #0a0a0a;
	}
	.btn--plus {
		animation-name: plus;
	}
	.btn svg {
		width: 4.4cqw;
		height: 4.4cqw;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.ttl {
		display: flex;
		flex-direction: column;
		line-height: 1.15;
		white-space: nowrap;
	}
	.ttl small {
		font-size: 2.4cqw;
		color: var(--soft);
	}
	.names {
		display: grid;
	}
	.names b {
		grid-area: 1 / 1;
		font-size: 3.8cqw;
		font-weight: 600;
		opacity: 0;
	}
	.n1 {
		opacity: 1;
		animation-name: name-1;
	}
	.n2 {
		animation-name: name-2;
	}
	.n3 {
		animation-name: name-3;
	}
	.bar-line {
		position: absolute;
		top: 26cqw;
		left: 0;
		right: 0;
		height: 1px;
		background: #262626;
	}

	/* ---- pages ----------------------------------------------------------- */
	.page {
		position: absolute;
		left: 0;
		right: 0;
		top: 26cqw;
		bottom: 0;
		padding: 7cqw 5cqw 0;
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
		font-size: 10cqw;
		font-weight: 600;
		letter-spacing: -0.04em;
		line-height: 1;
	}
	.sub {
		margin-top: 2cqw;
		font-size: 3.2cqw;
		color: var(--soft);
	}
	.label {
		display: block;
		font-size: 5cqw;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	/* A · text field */
	.chips {
		display: flex;
		gap: 2cqw;
		margin-top: 5cqw;
		overflow: hidden;
	}
	.chips span {
		flex: none;
		padding: 1.8cqw 3.6cqw;
		border-radius: 99px;
		background: var(--card);
		font-size: 3.1cqw;
		color: var(--soft);
	}
	.chips .on {
		background: #303030;
		color: #fafafa;
	}
	.field {
		margin-top: 6cqw;
		padding: 4cqw;
		border-radius: 4cqw;
		background: var(--card);
	}
	.field-title {
		display: block;
		margin-bottom: 3.4cqw;
		font-size: 4.6cqw;
		font-weight: 600;
	}
	.field-body {
		display: flex;
		flex-direction: column;
		gap: 2cqw;
		padding: 4cqw;
		border-radius: 2.8cqw;
		background: #000;
	}
	.label-row {
		display: flex;
		justify-content: space-between;
		font-size: 3.6cqw;
		font-weight: 500;
	}
	.states {
		display: grid;
		justify-items: end;
	}
	.state {
		grid-area: 1 / 1;
		font-size: 2.5cqw;
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
		height: 12cqw;
		padding-inline: 3.4cqw;
		border: 1px solid var(--line);
		border-radius: 2.6cqw;
		font-size: 4.2cqw;
		animation-name: input;
	}
	.placeholder {
		position: absolute;
		left: 3.4cqw;
		color: var(--mute);
		opacity: 0;
		animation-name: placeholder;
	}
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
		height: 5.6cqw;
		margin-left: 1px;
		background: #fafafa;
		opacity: 0;
		animation-name: caret;
	}
	.helper {
		font-size: 2.8cqw;
		color: var(--mute);
	}

	/* B · colors */
	.tile {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 30cqw;
		margin-top: 6cqw;
		padding: 4cqw;
		border-radius: 4cqw;
		background: #fafafa;
		color: #0a0a0a;
	}
	.tile b {
		font-size: 6.4cqw;
		font-weight: 600;
		letter-spacing: -0.02em;
	}
	.tile span {
		font-size: 3cqw;
		color: #525252;
	}
	.page--b .label {
		margin-top: 7cqw;
	}
	.tones {
		display: flex;
		gap: 1cqw;
		margin-top: 3cqw;
	}
	.tones i {
		flex: 1;
		height: 26cqw;
		border-radius: 2cqw;
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 10%);
		transform-origin: 50% 100%;
		animation-name: tone;
	}

	/* C · heuristics */
	.page--c .label {
		margin-top: 6cqw;
	}
	.rules {
		display: flex;
		flex-direction: column;
		gap: 3cqw;
		margin-top: 3.4cqw;
	}
	.rule {
		display: flex;
		gap: 3cqw;
		padding: 3.6cqw;
		border-radius: 3.6cqw;
		background: var(--card);
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 6%);
		animation-name: rule;
	}
	.num {
		display: grid;
		place-items: center;
		flex: none;
		width: 6.4cqw;
		height: 6.4cqw;
		border-radius: 1.8cqw;
		background: #262626;
		font-size: 2.6cqw;
		font-weight: 600;
	}
	.rule b {
		display: block;
		font-size: 4cqw;
		font-weight: 600;
		line-height: 1.25;
	}
	.rule p {
		margin-top: 1.2cqw;
		font-size: 3cqw;
		line-height: 1.45;
		color: var(--soft);
	}

	/* ---- toast, taps, cover ---------------------------------------------- */
	.toast {
		position: absolute;
		left: 50%;
		bottom: 5%;
		display: flex;
		align-items: center;
		gap: 2cqw;
		padding: 2.2cqw 4.6cqw 2.2cqw 2.4cqw;
		border-radius: 99px;
		background: #fafafa;
		color: #0a0a0a;
		font-size: 3.4cqw;
		font-weight: 500;
		white-space: nowrap;
		translate: -50% 0;
		opacity: 0;
		box-shadow: 0 3.4cqw 6cqw rgb(0 0 0 / 50%);
		animation-name: toast;
	}
	.toast i {
		display: grid;
		place-items: center;
		width: 5.2cqw;
		height: 5.2cqw;
		border-radius: 50%;
		background: #0a0a0a;
		color: #fafafa;
		font-size: 2.8cqw;
		font-style: normal;
	}
	/* a fingertip: a soft disc with a ring that spreads out of it */
	.ripple {
		position: absolute;
		width: 10cqw;
		height: 10cqw;
		margin: -5cqw 0 0 -5cqw;
		border: 0.6cqw solid rgb(255 255 255 / 60%);
		border-radius: 50%;
		background: rgb(255 255 255 / 22%);
		opacity: 0;
		animation-name: ripple;
	}
	.cover {
		position: absolute;
		inset: 0;
		background: #0a0a0a;
		opacity: 0;
		pointer-events: none;
		animation-name: cover;
	}

	/* ---- timeline (percent of the 10s loop — matches ToolkitReel) --------- */
	@keyframes ripple {
		0%, 10.6% { opacity: 0; scale: 0.3; }
		10.7% { opacity: 1; scale: 0.5; animation-timing-function: var(--out); }
		15%, 100% { opacity: 0; scale: 1.5; }
	}
	@keyframes cover {
		0% { opacity: 1; animation-timing-function: ease-out; }
		5%, 96% { opacity: 0; animation-timing-function: ease-in; }
		99.5%, 100% { opacity: 1; }
	}
	@keyframes menu {
		0%, 35.1% { scale: 1; }
		35.9% { scale: 0.86; }
		36.8%, 58% { scale: 1; }
		58.8% { scale: 0.86; }
		59.7%, 100% { scale: 1; }
	}
	@keyframes plus {
		0%, 80.3% { scale: 1; background: #fafafa; }
		81.1% { scale: 0.86; background: #d1d1d1; }
		82.8%, 100% { scale: 1; background: #fafafa; }
	}
	@keyframes name-1 {
		0%, 36.5% { opacity: 1; }
		38.5%, 100% { opacity: 0; }
	}
	@keyframes name-2 {
		0%, 36.5% { opacity: 0; }
		38.5%, 59.5% { opacity: 1; }
		61.5%, 100% { opacity: 0; }
	}
	@keyframes name-3 {
		0%, 59.5% { opacity: 0; }
		61.5%, 100% { opacity: 1; }
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
		11%, 29.9% { border-color: #fafafa; box-shadow: 0 0 0 0.8cqw rgb(255 255 255 / 18%); }
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
