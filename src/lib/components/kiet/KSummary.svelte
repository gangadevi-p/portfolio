<script>
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
						<ol>
							<li>Pulled scattered campus information into one mobile app</li>
							<li>Focused on the tasks students do every day</li>
							<li>Shipped for students and admin across 9+ modules</li>
						</ol>
					</section>
					<section>
						<h2>Problem</h2>
						<p>Students relied on WhatsApp, PDFs, and several websites for college information.</p>
						<p>Updates were hard to find, easy to miss, and request status was unclear after submission.</p>
					</section>
					<section>
						<h2>The reframe</h2>
						<p>Instead of rebuilding the college ERP:</p>
						<blockquote><strong>“How might we bring the day's updates and routine tasks into one predictable place?”</strong></blockquote>
					</section>
					<section>
						<h2>Scope</h2>
						<ul>
							<li>Announcements, academics, and student services</li>
							<li>Two roles — student and admin</li>
							<li>Built with one Android developer over 4 months</li>
						</ul>
					</section>
					<section>
						<h2>Solution</h2>
						<ul>
							<li>One home for announcements, attendance, and academics</li>
							<li>Permission and complaint requests with a clear status</li>
							<li>Campus services gathered in one place</li>
						</ul>
					</section>
					<section>
						<h2>Result</h2>
						<p>6,061 total acquisitions, with roughly 600 daily and 1.8k monthly active users.</p>
						<p>Usage climbs around key academic periods, when campus information matters most.</p>
					</section>
					<section>
						<h2>Learnings</h2>
						<ul>
							<li>One predictable place beats many scattered ones</li>
							<li>Every request needs a visible status</li>
							<li>A focused scope is what actually ships</li>
						</ul>
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
	ul,
	ol {
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
