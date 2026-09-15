<script>
	import {
		assistantPrompts,
		assistantWelcome,
		askPortfolioAssistant,
		getPortfolioAnswer,
		MAX_USER_MESSAGES
	} from '$data/portfolio-assistant.js';
	import { parseMessageSegments } from '$data/chat-render.js';
	import ChartBlock from './ChartBlock.svelte';

	let open = $state(false);
	let question = $state('');
	let sending = $state(false);
	let limitReached = $state(false);
	let messages = $state([{ role: 'assistant', text: assistantWelcome, animate: true }]);
	let { placement = 'hero' } = $props();

	/** Recommended prompts already asked — dropped from the chip row. */
	let askedPrompts = $state([]);
	let remainingPrompts = $derived(
		assistantPrompts.filter((prompt) => !askedPrompts.includes(prompt))
	);
	/** true once the visitor has sent MAX_USER_MESSAGES questions this session */
	let capReached = $derived(
		limitReached || messages.filter((m) => m.role === 'user').length >= MAX_USER_MESSAGES
	);

	/** The transcript element, so a new answer scrolls it to the bottom. */
	let transcript = $state(null);
	$effect(() => {
		messages.length;
		transcript?.scrollTo({ top: transcript.scrollHeight });
	});

	/**
	 * Move the open chat to <body>. In the nav, GSAP's intro leaves a sub-pixel
	 * transform on `.nav`, which makes it the containing block for any
	 * `position: fixed` descendant — the panel would be trapped inside the
	 * ~40px nav bar instead of spanning the viewport. Portalling sidesteps it.
	 */
	function portal(node, enabled = true) {
		if (enabled) document.body.appendChild(node);
		return {
			destroy() {
				if (enabled) node.remove();
			}
		};
	}

	async function ask(text) {
		const cleanQuestion = text.trim();
		if (!cleanQuestion || sending || capReached) return;

		messages = [...messages, { role: 'user', text: cleanQuestion }, { role: 'assistant', text: '', thinking: true }];
		const thinkingIndex = messages.length - 1;
		if (assistantPrompts.includes(cleanQuestion) && !askedPrompts.includes(cleanQuestion)) {
			askedPrompts = [...askedPrompts, cleanQuestion];
		}
		question = '';
		open = true;
		sending = true;

		const history = messages
			.filter((m) => !m.thinking)
			.map((m) => ({ role: m.role, content: m.text }));

		let replyText;
		try {
			replyText = await askPortfolioAssistant(history);
		} catch (err) {
			if (err?.limitReached) {
				limitReached = true;
				replyText = err.message;
			} else {
				replyText = getPortfolioAnswer(cleanQuestion);
			}
		}

		messages = messages.map((m, i) =>
			i === thinkingIndex ? { role: 'assistant', text: replyText, rendered: true } : m
		);
		sending = false;
	}

	function submit(event) {
		event.preventDefault();
		ask(question);
	}
</script>

<div class:open class:nav-placement={placement === 'nav'} class="portfolio-assistant">
	{#if open}
		<section
			class="chat-card"
			class:rail={placement === 'nav'}
			use:portal={placement === 'nav'}
			aria-label="Ask about Gangadevi's work"
			aria-live="polite"
		>
			<header>
				<span class="eyebrow">Portfolio guide</span>
				<button class="close" type="button" aria-label="Close portfolio guide" onclick={() => (open = false)}>
					×
				</button>
				<h2>Ask about my work</h2>
			</header>

			<!-- data-lenis-prevent: let the page's Lenis smooth-scroll ignore the
			     wheel here so this panel scrolls natively instead -->
			<div class="messages" data-lenis-prevent bind:this={transcript}>
				{#each messages as message, i (`${message.role}-${i}`)}
					{#if message.thinking}
						<p class="thinking">
							<span class="dots" aria-label="Thinking"><span></span><span></span><span></span></span>
						</p>
					{:else if message.role === 'user'}
						<p class="user">{message.text}</p>
					{:else if message.rendered}
						<div class="bubble reply">
							{#each parseMessageSegments(message.text) as segment}
								{#if segment.type === 'chart'}
									<ChartBlock spec={segment.spec} />
								{:else}
									{@html segment.html}
								{/if}
							{/each}
						</div>
					{:else}
						<p>
							{#each message.text.split(' ') as word, w}<span
									class="word"
									style="animation-delay: {Math.min(w * 70, 3200)}ms">{word}</span
								>{' '}{/each}
						</p>
					{/if}
				{/each}
			</div>

			{#if remainingPrompts.length && !capReached}
				<div class="suggestions" aria-label="Suggested questions">
					{#each remainingPrompts as prompt (prompt)}
						<button type="button" disabled={sending} onclick={() => ask(prompt)}>{prompt}</button>
					{/each}
				</div>
			{/if}

			{#if capReached}
				<p class="limit-note">
					You've reached the {MAX_USER_MESSAGES}-message limit for this conversation. Refresh the page to start a new one.
				</p>
			{/if}

			<form onsubmit={submit}>
				<label class="sr-only" for="portfolio-question">Ask a question</label>
				<input
					id="portfolio-question"
					bind:value={question}
					placeholder={capReached ? 'Conversation limit reached' : 'Ask a quick question…'}
					autocomplete="off"
					disabled={sending || capReached}
				/>
				<button type="submit" aria-label="Send question" disabled={sending || capReached || !question.trim()}>↑</button>
			</form>
		</section>
	{/if}

	<button class="launcher" type="button" aria-expanded={open} onclick={() => (open = !open)}>
		<span class="spark" aria-hidden="true">✦</span>
		<span>{open ? 'Close guide' : 'Ask about my work'}</span>
	</button>
</div>

<style>
	/* Explicit semantic roles keep this portalled panel readable in either theme. */
	.portfolio-assistant,
	.chat-card {
		--guide-accent: #1d1d1f;
		--guide-accent-tint: rgb(29 29 31 / 10%);
		--guide-ink: #1d1d1f;
		--guide-surface: #ffffff;
		--guide-subtle: #f5f5f7;
		--guide-border: #d2d2d7;
		--guide-action: #1d1d1f;
		--guide-action-hover: #000000;
		--guide-action-ink: #ffffff;
	}
	.portfolio-assistant {
		position: absolute;
		right: 1rem;
		bottom: clamp(1rem, 3vw, 2.5rem);
		z-index: 12;
		display: grid;
		justify-items: end;
		gap: 0.75rem;
		max-width: min(360px, calc(100vw - 2rem));
	}
	.portfolio-assistant.nav-placement {
		position: relative;
		right: auto;
		bottom: auto;
		max-width: none;
	}
	/* Open chat (nav): a card pinned to the right edge of the screen, sized to
	   its own content — the header, chips, input and just enough height for the
	   answer already on screen. It's portalled to <body>, so it's a true
	   viewport-fixed panel. `max-height` keeps a long conversation from running
	   off-screen; only then does the transcript scroll inside itself. */
	.chat-card.rail {
		position: fixed;
		top: clamp(4.75rem, 9vh, 6.5rem);
		right: 1rem;
		z-index: 50;
		width: min(380px, calc(100vw - 2rem));
		max-height: calc(
			100vh - clamp(4.75rem, 9vh, 6.5rem) - clamp(1.5rem, 6vh, 3rem)
		);
		display: flex;
		flex-direction: column;
	}
	.chat-card.rail .messages {
		flex: 0 1 auto;
		min-height: 0;
		overflow-y: auto;
		/* scroll still works, just no visible scrollbar */
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.chat-card.rail .messages::-webkit-scrollbar {
		display: none;
	}
	.nav-placement .launcher {
		padding: 0.58rem 0.82rem;
		font-size: 0.8rem;
		box-shadow: none;
	}
	.chat-card {
		width: min(360px, calc(100vw - 2rem));
		display: grid;
		gap: 0.85rem;
		padding: 1rem;
		border: 1px solid var(--guide-border);
		border-radius: 1.35rem;
		background: color-mix(in srgb, var(--guide-surface) 94%, transparent);
		color: var(--guide-ink);
		box-shadow: var(--shadow-card-lift);
		backdrop-filter: blur(18px);
	}
	/* Row 1: "Portfolio guide" eyebrow ——— close (×), centred to each other.
	   Row 2: the "Ask about my work" heading, spanning the full width.
	   Then the transcript starts. */
	header {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		column-gap: 0.75rem;
		row-gap: 0.3rem;
	}
	header h2 {
		grid-column: 1 / -1;
	}
	.eyebrow {
		display: block;
		margin-bottom: 0;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.11em;
		text-transform: uppercase;
		color: var(--guide-accent);
	}
	h2 {
		margin: 0;
		font-size: 1.05rem;
		line-height: 1.1;
	}
	.close {
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: var(--guide-subtle);
		font-size: 1.4rem;
		line-height: 1;
		color: inherit;
		cursor: pointer;
	}
	.messages {
		display: grid;
		gap: 0.6rem;
	}
	.messages p,
	.messages .bubble {
		width: fit-content;
		max-width: 94%;
		margin: 0;
		padding: 0.7rem 0.8rem;
		border-radius: 0.9rem 0.9rem 0.9rem 0.2rem;
		background: var(--guide-subtle);
		color: var(--guide-ink);
		font-size: 0.79rem;
		line-height: 1.45;
	}
	.messages p.user {
		justify-self: end;
		border-radius: 0.9rem 0.9rem 0.2rem 0.9rem;
		background: var(--guide-action);
		color: var(--guide-action-ink);
	}
	.messages p.thinking {
		padding-block: 0.85rem;
	}
	/* markdown produced by the assistant's replies */
	.bubble.reply {
		display: block;
		max-width: 100%;
		opacity: 0;
		filter: blur(5px);
		transform: translateY(0.14em);
		animation: word-in 0.4s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)) forwards;
	}
	.bubble.reply :global(p) {
		margin: 0 0 0.5em;
	}
	.bubble.reply :global(p:last-child) {
		margin-bottom: 0;
	}
	.bubble.reply :global(ul),
	.bubble.reply :global(ol) {
		margin: 0.3em 0;
		padding-left: 1.1em;
	}
	.bubble.reply :global(li) {
		margin-bottom: 0.2em;
	}
	.bubble.reply :global(strong) {
		font-weight: 800;
	}
	.bubble.reply :global(a) {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}
	.bubble.reply :global(code) {
		background: rgb(127 127 127 / 16%);
		padding: 0.1em 0.32em;
		border-radius: 0.3em;
		font-size: 0.85em;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
	}
	.bubble.reply :global(pre) {
		overflow-x: auto;
		padding: 0.55em 0.6em;
		background: rgb(127 127 127 / 16%);
		border-radius: 0.5em;
	}
	.bubble.reply :global(pre code) {
		background: none;
		padding: 0;
	}
	.bubble.reply :global(blockquote) {
		margin: 0.3em 0;
		padding-left: 0.6em;
		border-left: 2px solid var(--guide-border);
		opacity: 0.82;
	}
	.bubble.reply :global(h4) {
		margin: 0.2em 0 0.35em;
		font-size: 0.85rem;
		font-weight: 800;
	}
	.bubble.reply :global(hr) {
		border: none;
		border-top: 1px solid var(--guide-border);
		margin: 0.5em 0;
	}
	.dots {
		display: inline-flex;
		gap: 0.28rem;
	}
	.dots span {
		width: 0.36rem;
		height: 0.36rem;
		border-radius: 50%;
		background: currentColor;
		opacity: 0.35;
		animation: dot-pulse 1.1s ease-in-out infinite;
	}
	.dots span:nth-child(2) { animation-delay: 0.15s; }
	.dots span:nth-child(3) { animation-delay: 0.3s; }
	@keyframes dot-pulse {
		0%, 60%, 100% { opacity: 0.35; transform: translateY(0); }
		30% { opacity: 1; transform: translateY(-0.1rem); }
	}
	@media (prefers-reduced-motion: reduce) {
		.dots span {
			animation: none;
			opacity: 0.7;
		}
	}
	.limit-note {
		margin: 0;
		font-size: 0.72rem;
		line-height: 1.4;
		color: var(--guide-ink);
		opacity: 0.65;
	}
	/* answers arrive word by word — a quick blur-to-sharp shimmer, like the
	   launcher spark. Layout space is held from the start so nothing jumps. */
	.messages p .word {
		display: inline-block;
		opacity: 0;
		filter: blur(5px);
		transform: translateY(0.14em);
		animation: word-in 0.55s var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)) forwards;
	}
	@keyframes word-in {
		to {
			opacity: 1;
			filter: blur(0);
			transform: none;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.messages p .word,
		.bubble.reply {
			animation: none;
			opacity: 1;
			filter: none;
			transform: none;
		}
	}
	.suggestions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.42rem;
	}
	.suggestions button {
		border: 1px solid var(--guide-border);
		border-radius: 999px;
		padding: 0.38rem 0.58rem;
		background: transparent;
		font: inherit;
		font-size: 0.7rem;
		color: inherit;
		cursor: pointer;
	}
	.suggestions button:hover,
	.suggestions button:focus-visible {
		border-color: var(--guide-accent);
		background: var(--guide-accent-tint);
	}
	form {
		display: flex;
		gap: 0.4rem;
		padding: 0.3rem;
		border: 1px solid rgb(58 34 29 / 16%);
		border-radius: 999px;
		background: var(--guide-surface);
	}
	input {
		min-width: 0;
		flex: 1;
		border: 0;
		outline: 0;
		padding: 0.35rem 0.55rem;
		background: transparent;
		font: inherit;
		font-size: 0.8rem;
		color: inherit;
	}
	form button,
	.launcher {
		border: 0;
		background: var(--guide-action);
		color: var(--guide-action-ink);
		font: inherit;
		font-weight: 750;
		cursor: pointer;
	}
	form button {
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		font-size: 1.15rem;
		line-height: 1;
	}
	.launcher {
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
		gap: 0.48rem;
		padding: 0.76rem 1rem;
		border-radius: 999px;
		box-shadow: 0 10px 22px rgb(0 0 0 / 18%);
		transition: transform 160ms ease, background 160ms ease;
	}
	.launcher:hover,
	.launcher:focus-visible {
		transform: translateY(-2px);
		background: var(--guide-action-hover);
	}
	.spark { color: currentColor; }
	:global(html.dark) .portfolio-assistant,
	:global(html.dark) .chat-card {
		--guide-ink: #f5f5f7;
		--guide-surface: #1c1c1e;
		--guide-subtle: #2c2c2e;
		--guide-border: #48484a;
		--guide-action: #f5f5f7;
		--guide-action-hover: #ffffff;
		--guide-action-ink: #1d1d1f;
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
	@media (max-width: 760px) {
		.portfolio-assistant {
			bottom: 1rem;
		}
		.chat-card.rail {
			inset: auto 1rem 1rem;
			width: auto;
			max-height: min(72svh, 30rem);
		}
	}
</style>
