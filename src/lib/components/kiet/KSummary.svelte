<script>
	let { overview, impact, usage, learnings } = $props();
	let dialog;
	let card;
	let moreBelow = $state(true);
	let opened = $state(false);

	function updateScrollHint() {
		moreBelow = card.scrollTop + card.clientHeight < card.scrollHeight - 2;
	}

	export function open() {
		dialog.showModal();
		card.scrollTop = 0;
		updateScrollHint();
		opened = true;
	}

	$effect(() => {
		if (!opened) return;
		const previous = document.documentElement.style.overflow;
		document.documentElement.style.overflow = 'hidden';
		return () => {
			document.documentElement.style.overflow = previous;
		};
	});
</script>

<dialog bind:this={dialog} aria-labelledby="kiet-summary-title" onclose={() => (opened = false)} data-lenis-prevent>
	<div class="popup">
		<button class="close" aria-label="Close summary" onclick={() => dialog.close()}>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
		<div class="card-shell" class:more-below={moreBelow}>
			<article class="card" bind:this={card} onscroll={updateScrollHint} aria-label="KIET summary content">
				<p class="eyebrow" id="kiet-summary-title">KIET STUDENT APP · THE QUICK READ</p>
				<div class="details">
					<section>
						<h2>Overview</h2>
						<p>{overview.overview}</p>
					</section>
					<section>
						<h2>Problem</h2>
						<p>{overview.problem.text}</p>
					</section>
					<section>
						<h2>Solution</h2>
						<p>{overview.solution.text}</p>
					</section>
					<section>
						<h2>Impact</h2>
						<p>{impact.caption}</p>
						<ul>
							{#each [...impact.stats, ...usage.stats] as stat}
								<li><strong>{stat.n}</strong> {stat.label}</li>
							{/each}
						</ul>
					</section>
					<section>
						<h2>Learnings</h2>
						<p>{learnings.summary}</p>
						<blockquote><strong>{learnings.takeaway}</strong></blockquote>
					</section>
				</div>
			</article>
		</div>
	</div>
</dialog>

<style>
	dialog {
		position: fixed;
		inset: 0;
		margin: auto;
		width: min(860px, calc(100vw - 32px));
		max-width: none;
		max-height: calc(100dvh - 32px);
		padding: 0;
		border: 0;
		background: transparent;
		overflow: visible;
		color: var(--k-ink-strong, #2c2c2c);
		font-family: 'Poppins', 'Archivo', system-ui, sans-serif;
	}
	dialog::backdrop {
		background: rgb(0 0 0 / 60%);
		backdrop-filter: blur(8px);
	}
	/* Native dialogs sit above the custom cursor, so keep a visible pointer here. */
	:global(html.has-custom-cursor) dialog,
	:global(html.has-custom-cursor) dialog :global(*) {
		cursor: auto !important;
	}
	:global(html.has-custom-cursor) dialog .close,
	:global(html.has-custom-cursor) dialog .close :global(*) {
		cursor: pointer !important;
	}
	dialog[open] .popup {
		animation: boom 650ms cubic-bezier(0.16, 1, 0.3, 1) both;
	}
	.popup {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}
	.close {
		display: grid;
		place-items: center;
		flex: none;
		width: 48px;
		height: 48px;
		border: 1px solid rgb(255 255 255 / 30%);
		border-radius: 50%;
		background: #000;
		color: #fff;
	}
	.close:hover {
		background: #292929;
	}
	.card-shell {
		position: relative;
		width: 100%;
		overflow: hidden;
		border-radius: 28px;
		background: #fff;
		box-shadow: 0 24px 80px rgb(0 0 0 / 25%);
	}
	.card-shell::after {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 64px;
		background: linear-gradient(transparent, #fff);
		pointer-events: none;
		opacity: 0;
		transition: opacity 180ms ease;
	}
	.card-shell.more-below::after {
		opacity: 1;
	}
	.card {
		height: min(480px, calc(100dvh - 96px));
		scrollbar-width: none;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: clamp(28px, 5vw, 48px);
	}
	.card::-webkit-scrollbar {
		display: none;
	}
	.eyebrow {
		color: var(--k-orange, #f15a24);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.1em;
	}
	.details {
		display: grid;
		gap: 36px;
		margin-top: 28px;
	}
	.details section {
		display: grid;
		gap: 14px;
	}
	.details h2 {
		margin: 0;
		font-size: 23px;
		line-height: 1.3;
		font-weight: 700;
		color: var(--k-ink-strong, #2c2c2c);
	}
	section p,
	li {
		color: var(--k-ink, #4c4c4c);
		font-size: 16px;
		line-height: 1.8;
	}
	ul {
		padding-left: 24px;
		display: grid;
		gap: 8px;
	}
	blockquote {
		padding: 20px 24px;
		border-left: 3px solid var(--k-orange, #f15a24);
		background: #fdf1ec;
		border-radius: 0 12px 12px 0;
		font-size: 17px;
		line-height: 1.7;
		color: var(--k-ink-strong, #2c2c2c);
	}
	@keyframes boom {
		0% {
			opacity: 0;
			transform: translateY(70vh) scale(0.82);
		}
		70% {
			opacity: 1;
			transform: translateY(-10px) scale(1.015);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		dialog[open] .popup {
			animation: none;
		}
	}
</style>
