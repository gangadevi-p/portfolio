<script>
	import {
		assistantPrompts,
		assistantWelcome,
		getPortfolioAnswer
	} from '$data/portfolio-assistant.js';

	let open = $state(false);
	let question = $state('');
	let messages = $state([{ role: 'assistant', text: assistantWelcome }]);
	let { placement = 'hero' } = $props();

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

	function ask(text) {
		const cleanQuestion = text.trim();
		if (!cleanQuestion) return;

		messages = [
			...messages.slice(-1),
			{ role: 'user', text: cleanQuestion },
			{ role: 'assistant', text: getPortfolioAnswer(cleanQuestion) }
		];
		question = '';
		open = true;
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
				<div>
					<span class="eyebrow">Portfolio guide</span>
					<h2>Ask about my work</h2>
				</div>
				<button class="close" type="button" aria-label="Close portfolio guide" onclick={() => (open = false)}>
					×
				</button>
			</header>

			<div class="messages">
				{#each messages as message, i (`${message.role}-${i}`)}
					<p class:user={message.role === 'user'}>{message.text}</p>
				{/each}
			</div>

			<div class="suggestions" aria-label="Suggested questions">
				{#each assistantPrompts as prompt}
					<button type="button" onclick={() => ask(prompt)}>{prompt}</button>
				{/each}
			</div>

			<form onsubmit={submit}>
				<label class="sr-only" for="portfolio-question">Ask a question</label>
				<input
					id="portfolio-question"
					bind:value={question}
					placeholder="Ask a quick question…"
					autocomplete="off"
				/>
				<button type="submit" aria-label="Send question">↑</button>
			</form>
		</section>
	{/if}

	<button class="launcher" type="button" aria-expanded={open} onclick={() => (open = !open)}>
		<span class="spark" aria-hidden="true">✦</span>
		<span>{open ? 'Close guide' : 'Ask about my work'}</span>
	</button>
</div>

<style>
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
	/* Open chat (nav): a tall column pinned to the right edge of the screen,
	   running the full viewport height so it overlays the hero. It's portalled
	   to <body>, so it's a true viewport-fixed panel. Flex column so the
	   transcript takes every pixel left over by the header, chips and input,
	   and scrolls inside itself when the conversation gets long. */
	.chat-card.rail {
		position: fixed;
		top: clamp(4.75rem, 9vh, 6.5rem);
		bottom: clamp(1.5rem, 6vh, 3rem);
		right: 1rem;
		z-index: 50;
		width: min(380px, calc(100vw - 2rem));
		display: flex;
		flex-direction: column;
	}
	.chat-card.rail .messages {
		flex: 1;
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
		border: 1px solid rgb(255 255 255 / 52%);
		border-radius: 1.35rem;
		background: rgb(247 245 240 / 92%);
		/* carry an explicit dark ink: the panel is portalled to <body>, so it
		   can't inherit the light hero's text colour any more */
		color: var(--c-coffee);
		box-shadow: 0 18px 45px rgb(58 34 29 / 22%);
		backdrop-filter: blur(18px);
	}
	header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem;
	}
	.eyebrow {
		display: block;
		margin-bottom: 0.12rem;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.11em;
		text-transform: uppercase;
		color: var(--c-accent);
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
		background: rgb(58 34 29 / 8%);
		font-size: 1.4rem;
		line-height: 1;
		color: inherit;
		cursor: pointer;
	}
	.messages {
		display: grid;
		gap: 0.6rem;
	}
	.messages p {
		width: fit-content;
		max-width: 94%;
		margin: 0;
		padding: 0.7rem 0.8rem;
		border-radius: 0.9rem 0.9rem 0.9rem 0.2rem;
		background: #fff;
		font-size: 0.79rem;
		line-height: 1.45;
	}
	.messages p.user {
		justify-self: end;
		border-radius: 0.9rem 0.9rem 0.2rem 0.9rem;
		background: var(--c-coffee);
		color: #fff;
	}
	.suggestions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.42rem;
	}
	.suggestions button {
		border: 1px solid rgb(58 34 29 / 18%);
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
		border-color: var(--c-accent);
		background: rgb(232 110 60 / 10%);
	}
	form {
		display: flex;
		gap: 0.4rem;
		padding: 0.3rem;
		border: 1px solid rgb(58 34 29 / 16%);
		border-radius: 999px;
		background: #fff;
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
		background: var(--c-coffee);
		color: #fff;
		font: inherit;
		font-weight: 750;
		cursor: pointer;
	}
	form button {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		font-size: 1.15rem;
		line-height: 1;
	}
	.launcher {
		display: inline-flex;
		align-items: center;
		gap: 0.48rem;
		padding: 0.76rem 1rem;
		border-radius: 999px;
		box-shadow: 0 10px 22px rgb(58 34 29 / 22%);
		transition: transform 160ms ease, background 160ms ease;
	}
	.launcher:hover,
	.launcher:focus-visible {
		transform: translateY(-2px);
		background: #1f120f;
	}
	.spark { color: var(--c-accent); }
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
