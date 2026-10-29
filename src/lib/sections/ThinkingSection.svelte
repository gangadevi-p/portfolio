<script>
	import Container from '$components/Container.svelte';
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import { thinkingIntro, concepts } from '$data/thinking.js';
</script>

<section id="product-thinking" class="section">
	<Container class="wide-container">
		<header class="head" use:reveal>
			<h2 class="title">Product Thinking</h2>
			<p class="intro">{thinkingIntro}</p>
		</header>

		<div class="grid">
			{#each concepts as c, i (c.href)}
				<a
					class="card"
					href={c.href}
					use:reveal={{ delay: (i % 2) * 0.08 }}
					use:cursorLabel={{ label: 'Read concept', variant: 'card' }}
				>
					<div class="copy">
						<span class="app" style:--app-ink={c.tone.ink} style:--app-bg={c.tone.bg}>{c.app}</span>
						<h3>{c.title}</h3>
						<p class="problem">{c.problem}</p>
						<p class="idea">{c.idea}</p>
						<span class="period">
							<span>{c.period}</span>
							<svg class="ic" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
								<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M9 7h8v8" />
							</svg>
						</span>
					</div>

					{#if c.preview === 'threads'}
						<div class="preview" aria-hidden="true">
							<div class="bubble">
								<b>Arjun</b>
								<p>Goa trip — Dec 20 to 24? Who’s in?</p>
								<div class="bar">
									<span class="stack"><i style:background="#c2410c">P</i><i style:background="#4d7c0f">N</i><i style:background="#be185d">S</i></span>
									<span class="count">14 replies</span>
									<span class="last">· 2m</span>
									<span class="unread">3</span>
								</div>
							</div>
							<div class="thread">
								<div class="reply"><i style:background="#c2410c">P</i><span>I’m in!! 🌴</span></div>
								<div class="reply"><i style:background="#4d7c0f">N</i><span>Dec 20 works for me</span></div>
							</div>
							<div class="bubble bubble--muted">
								<b style:color="#7c3aed">Meera</b>
								<p>Did anyone watch the match??</p>
								<div class="bar">
									<span class="count">23 replies</span>
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
								<div class="ride-cues"><em>“LAVANYA” sign</em><em>Red tassels</em></div>
								<div class="ride-row">
									<b>Arriving · 1 min</b>
									<span class="ride-plate">KA 02 9275</span>
								</div>
							</div>
						</div>
					{:else if c.preview === 'compare'}
						<div class="preview preview--compare" aria-hidden="true">
							<div class="cmp">
								<b class="cmp-head">Single Chicken Biryani Bowl</b>
								<div class="cmp-row">
									<i style:background="#e23744">Z</i>
									<span><b>Zomato</b><small>15–20 min</small><em>Cheapest · Fastest</em></span>
									<strong>₹219</strong>
								</div>
								<div class="cmp-row">
									<i style:background="#fc8019">S</i>
									<span><b>Swiggy</b><small>25–30 min</small></span>
									<strong>₹252</strong>
								</div>
							</div>
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
	.card:not(:only-child) .preview {
		min-height: 300px;
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
	h3 {
		margin-top: 20px;
		font-size: clamp(1.4rem, 2.2vw, 1.9rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.15;
	}
	.problem {
		margin-top: 12px;
		max-width: 44ch;
		color: var(--c-ink-soft);
		line-height: 1.5;
	}
	.idea {
		margin: 10px 0 24px;
		max-width: 44ch;
		font-weight: 600;
		line-height: 1.45;
	}
	.period {
		margin-top: auto;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		width: 100%;
		max-width: 320px;
		padding: 8px 16px;
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
