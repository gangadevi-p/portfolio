<script>
	import Container from '$components/Container.svelte';
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import SiriWave from '$components/SiriWave.svelte';
	import { thinkingIntro, concepts } from '$data/thinking.js';

	/* The previews play short loops. Off screen they pause. */
	let grid;
	let idle = $state(false);
	$effect(() => {
		const observer = new IntersectionObserver(([entry]) => (idle = !entry.isIntersecting));
		observer.observe(grid);
		return () => observer.disconnect();
	});
</script>

<section id="product-thinking" class="section">
	<Container class="wide-container">
		<header class="head" use:reveal>
			<h2 class="title">UX</h2>
			<p class="intro">{thinkingIntro}</p>
		</header>

		<div class="grid" class:idle bind:this={grid}>
			{#each concepts as c, i (c.href)}
				<a
					class="card"
					href={c.href}
					use:reveal={{ delay: (i % 2) * 0.08 }}
					use:cursorLabel={{ label: 'Read concept', variant: 'card' }}
				>
					<div class="copy">
						<div class="meta">
							<span class="app" style:--app-ink={c.tone.ink} style:--app-bg={c.tone.bg}>{c.app}</span>
							<span class="period">
								<span>{c.period}</span>
								<svg class="ic" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
									<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8" />
								</svg>
							</span>
						</div>
						<h3>{c.title}</h3>
						<p class="problem">{c.problem}</p>
						<p class="idea">{c.idea}</p>
					</div>

					{#if c.preview === 'threads'}
						<div class="preview" aria-hidden="true">
							<div class="bubble t-a">
								<b>Arjun</b>
								<p>Goa trip — Dec 20 to 24? Who’s in?</p>
								<div class="bar">
									<span class="stack"><i style:background="#c2410c">P</i><i style:background="#4d7c0f">N</i><i style:background="#be185d">S</i></span>
									<span class="count roll roll-a"><span class="r0">14 replies</span><span class="r1">15 replies</span></span>
									<span class="last">· 2m</span>
									<span class="unread roll roll-a"><span class="r0">3</span><span class="r1">4</span></span>
								</div>
							</div>
							<div class="thread">
								<div class="reply t-r1"><i style:background="#c2410c">P</i><span>I’m in!! 🌴</span></div>
								<div class="reply t-r2"><i style:background="#4d7c0f">N</i><span>Dec 20 works for me</span></div>
								<div class="slot">
									<div class="reply typing"><i style:background="#be185d">S</i><span class="dots"><u></u><u></u><u></u></span></div>
									<div class="reply t-r3"><i style:background="#be185d">S</i><span>Count me in 🙌</span></div>
								</div>
							</div>
							<div class="bubble bubble--muted t-b">
								<b style:color="#7c3aed">Meera</b>
								<p>Did anyone watch the match??</p>
								<div class="bar">
									<span class="count roll roll-b"><span class="r0">23 replies</span><span class="r1">24 replies</span></span>
									<span class="last">· 5m</span>
								</div>
							</div>
						</div>
					{:else if c.preview === 'pickup'}
						<div class="preview preview--pickup" aria-hidden="true">
							<div class="ride">
								<div class="ride-photo">
									<img src="/uber/auto-front.avif" alt="" loading="lazy" />
									<span>Look for the front</span>
								</div>
								<div class="ride-cues"><em class="cue-1">“LAVANYA” sign</em><em class="cue-2">Red tassels</em></div>
								<div class="ride-row">
									<b class="eta"
										><i class="live"></i
										><span class="eta-box"
											><span class="e3">Arriving · 3 min</span><span class="e2">Arriving · 2 min</span><span class="e1">Arriving · 1 min</span></span
										></b
									>
									<span class="ride-plate">KA 02 9275</span>
								</div>
							</div>
						</div>
					{:else if c.preview === 'compare'}
						<div class="preview preview--compare" aria-hidden="true">
							<span class="ask">Which is cheaper, Swiggy or Zomato?</span>
							<div class="cmp">
								<b class="cmp-head">Single Chicken Biryani Bowl</b>
								<div class="cmp-row c-1">
									<i style:background="#e23744">Z</i>
									<span><b>Zomato</b><small>15–20 min</small><em>Cheapest · Fastest</em></span>
									<strong>₹219</strong>
								</div>
								<div class="cmp-row c-2">
									<i style:background="#fc8019">S</i>
									<span><b>Swiggy</b><small>25–30 min</small></span>
									<strong>₹252</strong>
								</div>
							</div>
							<div class="siri"><SiriWave paused={idle} /></div>
						</div>
					{/if}
				</a>
			{/each}
		</div>
	</Container>
</section>

<style>
	.section {
		padding-block: 40px;
		padding-inline: var(--pad-x);
		background: var(--c-bg);
		color: var(--c-ink);
	}
	.section :global(.wide-container) {
		padding-inline: 0;
	}
	/* same heading as Projects, plus a one-line intro */
	.head {
		margin-bottom: 32px;
	}
	.title {
		font-size: var(--fs-h2);
		font-weight: 700;
		letter-spacing: -0.045em;
	}
	.intro {
		margin-top: 10px;
		color: var(--c-ink-soft);
		font-size: clamp(1rem, 1.4vw, 1.15rem);
		font-weight: 500;
	}

	/* as many 320px+ columns as fit: three across on a wide screen */
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
		gap: 24px;
	}
	/* a lone concept takes the full row rather than leaving half of it empty */
	.card:only-child {
		grid-column: 1 / -1;
	}

	.card {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 32px;
		padding: 24px;
		border-radius: 24px;
		background: var(--c-surface);
		color: var(--c-ink);
		text-decoration: none;
		box-shadow:
			0 14px 34px rgb(29 29 31 / 8%),
			0 2px 5px rgb(29 29 31 / 4%);
		transition:
			transform var(--dur-fast) var(--ease-out),
			box-shadow var(--dur-fast) var(--ease-out);
	}
	/* side by side, the copy stretches so both previews sit on the same line */
	.card:not(:only-child) {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
	}
	/* every preview is the same size, whatever the illustration inside */
	.card:not(:only-child) .preview {
		height: 340px;
		overflow: hidden;
	}
	.card:hover,
	.card:focus-visible {
		transform: translateY(-4px);
		box-shadow:
			0 0 0 1px rgba(var(--c-ink-rgb), 0.07),
			inset 0 1px 0 rgb(255 255 255 / 70%),
			0 18px 40px rgb(29 29 31 / 8%),
			0 4px 10px rgb(29 29 31 / 4%);
	}

	.copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		min-width: 0;
	}
	.app {
		padding: 5px 12px;
		border-radius: 999px;
		background: var(--app-bg);
		color: var(--app-ink);
		font-size: var(--fs-small);
		font-weight: 600;
	}
	/* Each text block is held to a fixed number of lines — reserved when the
	   copy is shorter, clamped when it's longer — so all the cards match. */
	h3,
	.problem,
	.idea {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: var(--lines);
		line-clamp: var(--lines);
		overflow: hidden;
		min-height: calc(var(--lines) * 1lh);
	}
	h3 {
		--lines: 2;
		margin-top: 20px;
		font-size: clamp(1.4rem, 2.2vw, 1.9rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.15;
	}
	.problem {
		--lines: 3;
		margin-top: 12px;
		max-width: 44ch;
		color: var(--c-ink-soft);
		line-height: 1.5;
	}
	.idea {
		--lines: 3;
		margin-top: 10px;
		max-width: 44ch;
		font-weight: 600;
		line-height: 1.45;
	}
	/* app tag on the left, date at the opposite end of the same row */
	.meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		width: 100%;
	}
	.period {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 5px 12px;
		border-radius: 999px;
		background: var(--c-surface-subtle);
		color: var(--c-ink);
		font-size: var(--fs-small);
		white-space: nowrap;
		box-shadow:
			0 1px 2px rgb(29 29 31 / 6%),
			0 6px 14px -6px rgb(29 29 31 / 16%);
	}
	.period .ic {
		flex: none;
		transition: transform var(--dur-fast) var(--ease-out);
	}
	.card:hover .period .ic,
	.card:focus-visible .period .ic {
		transform: translate(2px, -2px);
	}

	/* ---- the little WhatsApp illustration ---- */
	.preview {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 8px;
		padding: 24px;
		border-radius: 18px;
		background: #efeae2 url('/whatsapp/chat-wallpaper.avif') center top / 380px auto repeat;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}
	.bubble {
		align-self: flex-start;
		max-width: 92%;
		padding: 8px 11px;
		border-radius: 0 12px 12px 12px;
		background: #fff;
		box-shadow: 0 1px 0.5px rgb(11 20 26 / 13%);
	}
	.bubble--muted {
		margin-top: 4px;
	}
	.bubble b {
		display: block;
		color: #1f8a70;
		font-size: 13px;
	}
	.bubble p {
		color: #111b21;
		font-size: 15px;
		line-height: 1.35;
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: 7px;
		padding-top: 7px;
		border-top: 1px solid #e9edef;
		color: #00a884;
	}
	.stack {
		display: inline-flex;
	}
	.preview i {
		display: grid;
		place-items: center;
		flex: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		color: #fff;
		font-size: 10px;
		font-style: normal;
		font-weight: 700;
	}
	.stack i {
		border: 2px solid #fff;
	}
	.stack i + i {
		margin-left: -7px;
	}
	.count {
		font-size: 13px;
		font-weight: 600;
	}
	.last {
		color: #667781;
		font-size: 12px;
	}
	.unread {
		display: grid;
		place-items: center;
		min-width: 18px;
		height: 18px;
		padding: 0 5px;
		border-radius: 999px;
		background: #25d366;
		color: #fff;
		font-size: 11px;
		font-weight: 700;
	}
	/* Reddit-style rail tying the replies to their message */
	.thread {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-left: 14px;
		padding-left: 12px;
		border-left: 2px solid #c9d2d6;
	}
	.reply {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.reply span {
		padding: 6px 10px;
		border-radius: 10px;
		background: #fff;
		color: #111b21;
		font-size: 13.5px;
		box-shadow: 0 1px 0.5px rgb(11 20 26 / 10%);
	}

	/* ---- the little Uber ride card ---- */
	.preview--pickup {
		align-items: center;
		background: #eceef1;
	}
	.ride {
		width: min(100%, 300px);
		padding: 12px;
		border-radius: 16px;
		background: #fff;
		box-shadow: 0 8px 24px -12px rgb(0 0 0 / 25%);
	}
	.ride-photo {
		position: relative;
		aspect-ratio: 4 / 3;
		border-radius: 10px;
		overflow: hidden;
	}
	.ride-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.ride-photo span {
		position: absolute;
		top: 8px;
		left: 8px;
		padding: 4px 9px;
		border-radius: 999px;
		background: #000;
		color: #fff;
		font-size: 11px;
		font-weight: 600;
	}
	.ride-cues {
		display: flex;
		gap: 6px;
		margin-top: 8px;
	}
	.ride-cues em {
		padding: 3px 8px;
		border-radius: 999px;
		background: #eef6f0;
		color: #05944f;
		font-size: 11px;
		font-style: normal;
		font-weight: 600;
	}
	.ride-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10px;
		color: #000;
		font-size: 14px;
	}
	.ride-plate {
		padding: 3px 7px;
		border: 1.5px solid #222;
		border-radius: 5px;
		background: #f7d117;
		color: #111;
		font-size: 11px;
		font-weight: 800;
	}

	/* ---- the little Google comparison ---- */
	.preview--compare {
		align-items: center;
		background: #f1f3f4;
	}
	.cmp {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: min(100%, 300px);
		padding: 14px;
		border-radius: 16px;
		background: #fff;
		box-shadow: 0 8px 24px -12px rgb(0 0 0 / 25%);
	}
	.cmp-head {
		color: #202124;
		font-size: 15px;
	}
	.cmp-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 9px;
		border: 1px solid #e8eaed;
		border-radius: 12px;
	}
	.cmp-row > span {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: flex-start;
		line-height: 1.3;
	}
	.cmp-row b { color: #202124; font-size: 13.5px; }
	.cmp-row small { color: #5f6368; font-size: 11.5px; }
	.cmp-row em {
		margin-top: 3px;
		padding: 1px 6px;
		border-radius: 5px;
		background: #e6f4ea;
		color: #137333;
		font-size: 10px;
		font-style: normal;
		font-weight: 700;
	}
	.cmp-row em.fast { background: #e8f0fe; color: #1967d2; }
	.cmp-row strong { color: #202124; font-size: 16px; }

	/* ---- waves: each preview plays a short loop ---------------------------
	   The loops are 9s. Everything is hidden at both ends, so the elements can
	   reset at different moments (their delays differ) without a visible jump.
	   With reduced motion all of this is off and the cards show their still. */
	.preview {
		position: relative;
	}
	.preview *,
	.preview {
		animation-duration: 9s;
		animation-iteration-count: infinite;
		animation-fill-mode: both;
	}
	.grid.idle .preview * {
		animation-play-state: paused;
	}
	@keyframes pop {
		0%, 2% { opacity: 0; translate: 0 14px; scale: 0.94; animation-timing-function: var(--ease-back); }
		8%, 92% { opacity: 1; translate: 0 0; scale: 1; animation-timing-function: ease-in; }
		97%, 100% { opacity: 0; translate: 0 -6px; scale: 1; }
	}

	/* WhatsApp: replies roll in one after another, someone starts typing (the
	   dots bounce in a wave), their reply lands and the counts tick up */
	.t-a { animation-name: pop; }
	.t-r1 { animation-name: r1; }
	.t-r2 { animation-name: r2; }
	.t-r3 { animation-name: r3; }
	.typing { animation-name: typing; }
	.t-b { animation-name: popLate; }
	@keyframes r1 {
		0%, 10% { opacity: 0; translate: -12px 8px; animation-timing-function: var(--ease-back); }
		15%, 92% { opacity: 1; translate: 0 0; animation-timing-function: ease-in; }
		97%, 100% { opacity: 0; translate: 0 0; }
	}
	@keyframes r2 {
		0%, 18% { opacity: 0; translate: -12px 8px; animation-timing-function: var(--ease-back); }
		23%, 92% { opacity: 1; translate: 0 0; animation-timing-function: ease-in; }
		97%, 100% { opacity: 0; translate: 0 0; }
	}
	@keyframes typing {
		0%, 27% { opacity: 0; translate: -8px 6px; scale: 0.8; animation-timing-function: var(--ease-back); }
		32%, 43% { opacity: 1; translate: 0 0; scale: 1; animation-timing-function: ease-in; }
		46%, 100% { opacity: 0; translate: 0 0; scale: 1; }
	}
	@keyframes r3 {
		0%, 44% { opacity: 0; translate: -8px 6px; scale: 0.85; animation-timing-function: var(--ease-back); }
		50%, 92% { opacity: 1; translate: 0 0; scale: 1; animation-timing-function: ease-in; }
		97%, 100% { opacity: 0; translate: 0 0; scale: 1; }
	}
	@keyframes popLate {
		0%, 56% { opacity: 0; translate: 0 14px; scale: 0.94; animation-timing-function: var(--ease-back); }
		62%, 92% { opacity: 1; translate: 0 0; scale: 1; animation-timing-function: ease-in; }
		97%, 100% { opacity: 0; translate: 0 -6px; scale: 1; }
	}
	.slot {
		position: relative;
		height: 32px;
	}
	.slot .reply {
		position: absolute;
		left: 0;
		top: 0;
	}
	.reply .dots {
		display: inline-flex;
		gap: 4px;
		padding: 11px 12px;
	}
	.dots u {
		display: block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #8696a0;
		text-decoration: none;
		animation: bounce 1.1s ease-in-out infinite;
	}
	.dots u:nth-child(2) { animation-delay: 0.15s; }
	.dots u:nth-child(3) { animation-delay: 0.3s; }
	@keyframes bounce {
		0%, 60%, 100% { translate: 0 0; opacity: 0.45; }
		30% { translate: 0 -5px; opacity: 1; }
	}
	/* a count that rolls to its next number, like an odometer */
	.roll {
		display: inline-grid;
	}
	.roll > span {
		grid-area: 1 / 1;
		text-align: center;
	}
	.roll .r1 {
		opacity: 0;
	}
	.roll-a .r0 { animation-name: rollOutA; }
	.roll-a .r1 { animation-name: rollInA; }
	.roll-b .r0 { animation-name: rollOutB; }
	.roll-b .r1 { animation-name: rollInB; }
	@keyframes rollOutA {
		0%, 49% { opacity: 1; translate: 0 0; }
		53%, 100% { opacity: 0; translate: 0 -70%; }
	}
	@keyframes rollInA {
		0%, 49% { opacity: 0; translate: 0 70%; }
		53%, 100% { opacity: 1; translate: 0 0; }
	}
	@keyframes rollOutB {
		0%, 76% { opacity: 1; translate: 0 0; }
		80%, 100% { opacity: 0; translate: 0 -70%; }
	}
	@keyframes rollInB {
		0%, 76% { opacity: 0; translate: 0 70%; }
		80%, 100% { opacity: 1; translate: 0 0; }
	}

	/* Uber: waves spread from the live dot, the cues pop in turn, and the wait
	   counts down to the plate */
	.preview--pickup .ride { animation-name: card; }
	.ride-photo img { animation-name: drift; animation-timing-function: ease-in-out; }
	.ride-photo span { animation-name: tag; }
	.cue-1 { animation-name: cue1; }
	.cue-2 { animation-name: cue2; }
	.ride-plate { position: relative; overflow: hidden; animation-name: plate; }
	.ride-plate::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(105deg, transparent 35%, rgb(255 255 255 / 85%) 50%, transparent 65%);
		translate: -120% 0;
		animation: glint 9s infinite both;
	}
	@keyframes card {
		0%, 1% { opacity: 0; translate: 0 12px; animation-timing-function: var(--ease-out); }
		7%, 93% { opacity: 1; translate: 0 0; animation-timing-function: ease-in; }
		98%, 100% { opacity: 0; translate: 0 -6px; }
	}
	@keyframes drift {
		0%, 100% { scale: 1; translate: 0 0; }
		50% { scale: 1.09; translate: -1.5% 1%; }
	}
	@keyframes tag {
		0%, 8% { opacity: 0; translate: -10px 0; animation-timing-function: var(--ease-back); }
		14%, 92% { opacity: 1; translate: 0 0; animation-timing-function: ease-in; }
		97%, 100% { opacity: 0; translate: 0 0; }
	}
	@keyframes cue1 {
		0%, 14% { opacity: 0; translate: 0 8px; scale: 0.8; animation-timing-function: var(--ease-back); }
		20%, 92% { opacity: 1; translate: 0 0; scale: 1; animation-timing-function: ease-in; }
		97%, 100% { opacity: 0; translate: 0 0; scale: 1; }
	}
	@keyframes cue2 {
		0%, 20% { opacity: 0; translate: 0 8px; scale: 0.8; animation-timing-function: var(--ease-back); }
		26%, 92% { opacity: 1; translate: 0 0; scale: 1; animation-timing-function: ease-in; }
		97%, 100% { opacity: 0; translate: 0 0; scale: 1; }
	}
	@keyframes plate {
		0%, 52% { opacity: 0; scale: 0.8; animation-timing-function: var(--ease-back); }
		58%, 92% { opacity: 1; scale: 1; animation-timing-function: ease-in; }
		97%, 100% { opacity: 0; scale: 1; }
	}
	@keyframes glint {
		0%, 62% { translate: -120% 0; }
		72%, 100% { translate: 120% 0; }
	}
	.eta {
		display: inline-flex;
		align-items: center;
		gap: 9px;
	}
	.eta-box {
		display: inline-grid;
	}
	.eta-box > span {
		grid-area: 1 / 1;
	}
	.eta-box .e3, .eta-box .e2 { opacity: 0; }
	.e3 { animation-name: eta3; }
	.e2 { animation-name: eta2; }
	.e1 { animation-name: eta1; }
	@keyframes eta3 {
		0%, 8% { opacity: 0; translate: 0 70%; }
		13%, 26% { opacity: 1; translate: 0 0; }
		30%, 100% { opacity: 0; translate: 0 -70%; }
	}
	@keyframes eta2 {
		0%, 26% { opacity: 0; translate: 0 70%; }
		31%, 46% { opacity: 1; translate: 0 0; }
		50%, 100% { opacity: 0; translate: 0 -70%; }
	}
	@keyframes eta1 {
		0%, 46% { opacity: 0; translate: 0 70%; }
		51%, 92% { opacity: 1; translate: 0 0; }
		97%, 100% { opacity: 0; translate: 0 0; }
	}
	/* the live dot, with two rings that spread out of it like a ripple */
	.preview .live {
		position: relative;
		display: inline-block;
		flex: none;
		width: 8px;
		height: 8px;
		background: #05944f;
	}
	.preview .live::before,
	.preview .live::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		border: 1.5px solid #05944f;
		opacity: 0;
		animation: ping 1.8s ease-out infinite;
	}
	.preview .live::after {
		animation-delay: 0.9s;
	}
	@keyframes ping {
		0% { opacity: 0.7; scale: 1; }
		100% { opacity: 0; scale: 3.4; }
	}

	/* Swiggy vs Zomato: Siri listens (the classic wave), then the answer waves in */
	.ask { animation-name: ask; }
	.cmp { overflow: hidden; animation-name: cmp; }
	.c-1 { animation-name: row1; }
	.c-2 { animation-name: row2; }
	.cmp-row em { animation-name: badge; }
	.cmp::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(105deg, transparent 38%, rgb(255 255 255 / 75%) 50%, transparent 62%);
		translate: -120% 0;
		animation: sweep 9s infinite both;
		pointer-events: none;
	}
	.ask {
		position: absolute;
		top: 16px;
		left: 50%;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 12px;
		border-radius: 999px;
		background: #fff;
		box-shadow: 0 4px 14px -6px rgb(0 0 0 / 25%);
		color: #202124;
		font-size: 12px;
		font-weight: 600;
		white-space: nowrap;
		translate: -50% 0;
	}
	.ask::before {
		content: '';
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: conic-gradient(#5ac8fa, #bf5af2, #ff375f, #5ac8fa);
	}
	.siri {
		position: absolute;
		left: 50%;
		bottom: 16px;
		width: 206px;
		height: 46px;
		border-radius: 999px;
		overflow: hidden;
		background: #0b0b10;
		box-shadow: 0 8px 22px -8px rgb(0 0 0 / 50%);
		translate: -50% 0;
		animation-name: siri;
	}
	@keyframes siri {
		0%, 2% { opacity: 0; translate: -50% 12px; animation-timing-function: var(--ease-back); }
		8%, 92% { opacity: 1; translate: -50% 0; animation-timing-function: ease-in; }
		97%, 100% { opacity: 0; translate: -50% 0; }
	}
	@keyframes ask {
		0%, 8% { opacity: 0; translate: -50% -8px; animation-timing-function: var(--ease-back); }
		14%, 30% { opacity: 1; translate: -50% 0; animation-timing-function: ease-in; }
		34%, 100% { opacity: 0; translate: -50% -4px; }
	}
	@keyframes cmp {
		0%, 30% { opacity: 0; translate: 0 18px; scale: 0.96; animation-timing-function: var(--ease-back); }
		37%, 92% { opacity: 1; translate: 0 0; scale: 1; animation-timing-function: ease-in; }
		97%, 100% { opacity: 0; translate: 0 -6px; scale: 1; }
	}
	@keyframes row1 {
		0%, 36% { opacity: 0; translate: 22px 0; animation-timing-function: var(--ease-back); }
		43%, 100% { opacity: 1; translate: 0 0; }
	}
	@keyframes row2 {
		0%, 42% { opacity: 0; translate: 22px 0; animation-timing-function: var(--ease-back); }
		49%, 100% { opacity: 1; translate: 0 0; }
	}
	@keyframes badge {
		0%, 50% { opacity: 0; scale: 0.5; animation-timing-function: var(--ease-back); }
		56%, 100% { opacity: 1; scale: 1; }
	}
	@keyframes sweep {
		0%, 58% { translate: -120% 0; }
		70%, 100% { translate: 120% 0; }
	}

	@media (prefers-reduced-motion: reduce) {
		.preview *,
		.preview,
		.preview *::before,
		.preview *::after {
			animation: none !important;
		}
		.slot,
		.ask,
		.siri {
			display: none;
		}
	}

	@media (max-width: 1024px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 700px) {
		.card {
			grid-template-columns: 1fr;
			gap: 24px;
		}
		.preview {
			padding: 18px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.card:hover,
		.card:focus-visible {
			transform: none;
		}
	}
</style>
