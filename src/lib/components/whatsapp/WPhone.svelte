<script>
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { people, group, topics, flatChat, threadedChat } from '$data/whatsapp.js';

	/**
	 * A clickable WhatsApp group chat. "Today" is the flat stream; "With threads"
	 * groups replies under their message, and each thread expands / collapses.
	 */
	let { mode = $bindable('threads') } = $props();

	/** the trip thread starts expanded, so the nesting is visible straight away */
	let open = $state(new Set(['trip']));

	function toggle(id) {
		const next = new Set(open);
		next.has(id) ? next.delete(id) : next.add(id);
		open = next;
	}

	const initial = (key) => people[key].name.charAt(0);
</script>

<div class="wp">
	<div class="switch" role="tablist" aria-label="Compare chat layouts">
		<button role="tab" aria-selected={mode === 'today'} class:on={mode === 'today'} onclick={() => (mode = 'today')}>
			Today
		</button>
		<button role="tab" aria-selected={mode === 'threads'} class:on={mode === 'threads'} onclick={() => (mode = 'threads')}>
			With threads
		</button>
	</div>

	<div class="device">
		<div class="screen">
			<header class="bar">
				<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
				<span class="group-avatar" aria-hidden="true">🎓</span>
				<span class="group-text">
					<b>{group.name}</b>
					<small>{group.members} members</small>
				</span>
			</header>

			<div class="chat" data-lenis-prevent>
				<span class="day">Today</span>

				{#if mode === 'today'}
					{#each flatChat as m, i (i)}
						<div class="msg" style:--topic={topics[m.topic].color}>
							<span class="topic-dot" title={topics[m.topic].label} aria-hidden="true"></span>
							<div class="bubble">
								<b class="who" style:color={people[m.from].tone}>{people[m.from].name}</b>
								{#if m.quote}
									<span class="quote">
										<b style:color={people[m.quote.from].tone}>{people[m.quote.from].name}</b>
										{m.quote.text}
									</span>
								{/if}
								<p>{m.text}<span class="time">{m.time}</span></p>
							</div>
						</div>
					{/each}
				{:else}
					{#each threadedChat as m (m.id)}
						{@const isOpen = open.has(m.id)}
						<div class="msg">
							<div class="bubble">
								<b class="who" style:color={people[m.from].tone}>{people[m.from].name}</b>
								<p>{m.text}<span class="time">{m.time}</span></p>

								{#if m.thread}
									<button
										class="thread-bar"
										aria-expanded={isOpen}
										aria-controls={'thread-' + m.id}
										onclick={() => toggle(m.id)}
									>
										<span class="stack" aria-hidden="true">
											{#each m.thread.people.slice(0, 3) as p (p)}
												<span class="av" style:background={people[p].tone}>{initial(p)}</span>
											{/each}
										</span>
										<span class="count">{m.thread.count} replies</span>
										<span class="last">· {m.thread.last}</span>
										{#if m.thread.unread && !isOpen}
											<span class="unread" aria-label={m.thread.unread + ' unread'}>{m.thread.unread}</span>
										{/if}
										<svg class="chev" class:up={isOpen} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
									</button>
								{/if}
							</div>
						</div>

						{#if m.thread && isOpen}
							<div class="thread" id={'thread-' + m.id} transition:slide={{ duration: 260, easing: cubicOut }}>
								{#each m.thread.replies as r, i (i)}
									<div class="reply">
										<span class="av av--sm" style:background={people[r.from].tone} aria-hidden="true">{initial(r.from)}</span>
										<div class="reply-body">
											<b class="who" style:color={people[r.from].tone}>{people[r.from].name}</b>
											<p>{r.text}<span class="time">{r.time}</span></p>
										</div>
									</div>
									{#each r.children ?? [] as c, j (j)}
										<div class="reply reply--child">
											<span class="av av--sm" style:background={people[c.from].tone} aria-hidden="true">{initial(c.from)}</span>
											<div class="reply-body">
												<b class="who" style:color={people[c.from].tone}>{people[c.from].name}</b>
												<p>{c.text}<span class="time">{c.time}</span></p>
											</div>
										</div>
									{/each}
								{/each}
								<span class="more">View all {m.thread.count} replies →</span>
							</div>
						{/if}
					{/each}
				{/if}
			</div>

			<footer class="composer" aria-hidden="true">
				<span class="field">Message</span>
				<span class="mic">
					<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0M12 17v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
				</span>
			</footer>
		</div>
	</div>

	{#if mode === 'today'}
		<ul class="legend" aria-label="Conversation colours">
			{#each Object.values(topics) as t (t.label)}
				<li style:--topic={t.color}>{t.label}</li>
			{/each}
		</ul>
	{:else}
		<p class="hint">Tap a reply count to expand or collapse the thread</p>
	{/if}
</div>

<style>
	.wp {
		--wa-green: #008069;
		--wa-green-ink: #00a884;
		--wa-wall: #efeae2;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		width: 100%;
	}

	.switch {
		display: inline-flex;
		padding: 4px;
		border-radius: 999px;
		background: #fff;
		box-shadow: 0 1px 2px rgb(0 0 0 / 6%), 0 8px 24px -16px rgb(0 0 0 / 30%);
	}
	.switch button {
		padding: 8px 18px;
		border: 0;
		border-radius: 999px;
		background: none;
		color: #54656f;
		font: inherit;
		font-size: 14px;
		font-weight: 600;
		transition: background 180ms ease, color 180ms ease;
	}
	.switch button.on {
		background: var(--wa-green);
		color: #fff;
	}

	.device {
		width: min(100%, 340px);
		padding: 10px;
		border-radius: 46px;
		background: #111b21;
		box-shadow: 0 30px 60px -30px rgb(17 27 33 / 55%);
	}
	.screen {
		display: flex;
		flex-direction: column;
		height: 600px;
		border-radius: 37px;
		overflow: hidden;
		/* WhatsApp's doodle wallpaper, drawn at 2x */
		background: var(--wa-wall) url('/whatsapp/chat-wallpaper.avif') center top / 380px auto repeat;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 34px 14px 12px;
		background: var(--wa-green);
		color: #fff;
	}
	.group-avatar {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: rgb(255 255 255 / 20%);
		font-size: 17px;
	}
	.group-text {
		display: flex;
		flex-direction: column;
		line-height: 1.25;
	}
	.group-text b { font-size: 15px; font-weight: 600; }
	.group-text small { font-size: 12px; opacity: 0.8; }

	.chat {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 10px 10px 14px;
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width: none;
	}
	.chat::-webkit-scrollbar { display: none; }
	.day {
		align-self: center;
		margin-bottom: 4px;
		padding: 4px 10px;
		border-radius: 8px;
		background: #fff;
		color: #54656f;
		font-size: 11px;
		font-weight: 600;
	}

	.msg {
		position: relative;
		display: flex;
		align-items: flex-start;
		gap: 6px;
	}
	.topic-dot {
		flex: none;
		width: 8px;
		height: 8px;
		margin-top: 12px;
		border-radius: 50%;
		background: var(--topic);
	}
	.bubble {
		max-width: 86%;
		padding: 6px 9px 7px;
		border-radius: 0 10px 10px 10px;
		background: #fff;
		box-shadow: 0 1px 0.5px rgb(11 20 26 / 13%);
	}
	.who {
		display: block;
		font-size: 12.5px;
		font-weight: 600;
		line-height: 1.4;
	}
	.bubble p,
	.reply-body p {
		margin: 0;
		color: #111b21;
		font-size: 14px;
		line-height: 1.4;
	}
	.time {
		float: right;
		margin: 6px 0 -4px 10px;
		color: #667781;
		font-size: 10.5px;
	}
	.quote {
		display: block;
		margin: 3px 0 5px;
		padding: 5px 8px;
		border-left: 4px solid #1f8a70;
		border-radius: 6px;
		background: #f5f6f6;
		color: #54656f;
		font-size: 12.5px;
		line-height: 1.35;
	}
	.quote b { display: block; font-size: 12px; }

	.thread-bar {
		display: flex;
		align-items: center;
		gap: 6px;
		width: 100%;
		margin-top: 8px;
		padding: 7px 0 1px;
		border: 0;
		border-top: 1px solid #e9edef;
		background: none;
		color: var(--wa-green-ink);
		font: inherit;
		text-align: left;
		cursor: pointer;
	}
	.stack { display: inline-flex; }
	.av {
		display: grid;
		place-items: center;
		flex: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		color: #fff;
		font-size: 10px;
		font-weight: 700;
	}
	.stack .av { border: 2px solid #fff; }
	.stack .av + .av { margin-left: -7px; }
	.count { font-size: 13px; font-weight: 600; }
	.last { color: #667781; font-size: 12px; }
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
	.chev {
		margin-left: auto;
		color: #8696a0;
		transition: rotate 220ms ease;
	}
	.chev.up { rotate: 180deg; }

	/* Reddit-style: a rail on the left ties every reply to its parent */
	.thread {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin: 0 0 4px 14px;
		padding-left: 12px;
		border-left: 2px solid #c9d2d6;
	}
	.reply {
		display: flex;
		align-items: flex-start;
		gap: 6px;
	}
	.reply--child {
		position: relative;
		margin-left: 26px;
	}
	.reply--child::before {
		content: '';
		position: absolute;
		left: -16px;
		top: -2px;
		width: 12px;
		height: 14px;
		border-left: 2px solid #c9d2d6;
		border-bottom: 2px solid #c9d2d6;
		border-bottom-left-radius: 8px;
	}
	.av--sm { margin-top: 4px; }
	.reply-body {
		max-width: 88%;
		padding: 5px 8px 6px;
		border-radius: 10px;
		background: #fff;
		box-shadow: 0 1px 0.5px rgb(11 20 26 / 10%);
	}
	.reply-body p { font-size: 13.5px; }
	.more {
		padding: 2px 0 2px 2px;
		color: var(--wa-green-ink);
		font-size: 12.5px;
		font-weight: 600;
	}

	.composer {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 10px 18px;
	}
	.field {
		flex: 1;
		padding: 10px 16px;
		border-radius: 999px;
		background: #fff;
		color: #8696a0;
		font-size: 14px;
	}
	.mic {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--wa-green-ink);
		color: #fff;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 6px 14px;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 13px;
		color: #54656f;
	}
	.legend li {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.legend li::before {
		content: '';
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--topic);
	}
	.hint {
		margin: 0;
		font-size: 13px;
		color: #54656f;
	}

	@media (max-width: 400px) {
		.screen { height: 540px; }
	}
</style>
