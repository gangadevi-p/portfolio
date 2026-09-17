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
		return () => { document.documentElement.style.overflow = previous; };
	});
</script>

<dialog bind:this={dialog} aria-labelledby="cueup-summary-title" onclose={() => (opened = false)} data-lenis-prevent>
	<div class="popup">
		<button class="close" aria-label="Close summary" onclick={() => dialog.close()}>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
		<div class="card-shell" class:more-below={moreBelow}>
		<article class="card" bind:this={card} onscroll={updateScrollHint} aria-label="CueUp summary content">
			<p class="eyebrow" id="cueup-summary-title">CUEUP · THE QUICK READ</p>
			<div class="details">
				<section>
					<h2>Overview</h2>
					<ol>
						<li>Studied rent and repair coordination problems</li>
						<li>Focused the product on visibility and accountability</li>
						<li>Designed complete landlord and tenant flows</li>
					</ol>
				</section>
				<section>
					<h2>Problem</h2>
					<p>Rent proofs, repair requests, and updates get buried across WhatsApp, calls, and manual records.</p>
					<p>This creates unclear status, miscommunication, and repeated follow-ups.</p>
				</section>
				<section>
					<h2>The reframe</h2>
					<p>Instead of building a complete property-management system:</p>
					<blockquote><strong>“How might we clearly show what is complete and who needs to act next?”</strong></blockquote>
				</section>
				<section>
					<h2>Constraints</h2>
					<ul><li>Rent and repairs only</li><li>Payments happen outside CueUp</li><li>Designed for self-managing landlords</li></ul>
				</section>
				<section>
					<h2>Solution</h2>
					<ul><li>One shared status for rent and repairs</li><li>Payment-proof submission and verification</li><li>Clear repair ownership and progress</li></ul>
				</section>
				<section>
					<h2>Design</h2>
					<div class="design-grid">
						<div class="design-stack">
							<figure class="mock-rent-overview"><img src="/img/CueUp/Rentoverview.png" alt="CueUp tenant rent-overview screen" /></figure>
							<figure class="mock-open-resolved"><img src="/img/CueUp/openandresolvedtenant.png" alt="CueUp tenant open and resolved repairs screens" /></figure>
							<figure class="mock-update-left"><img src="/img/CueUp/Update.png" alt="CueUp tenant update screen" /></figure>
						</div>
						<div class="design-stack">
							<figure class="mock-pay-rent"><img src="/img/CueUp/Payrent.png" alt="CueUp tenant pay-rent screen" /></figure>
							<figure class="mock-issue"><img src="/img/CueUp/Issue.png" alt="CueUp tenant issue-reporting screen" /></figure>
						</div>
					</div>
				</section>
				<section>
					<h2>Result</h2>
					<p>A focused end-to-end concept built around visibility, accountability, and trust.</p>
					<p>Product impact remains unmeasured because the concept has not been launched.</p>
				</section>
				<section>
					<h2>Learnings</h2>
					<ul><li>Shared status reduces coordination gaps</li><li>Every action needs clear ownership</li><li>A focused scope creates a clearer product</li></ul>
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
		color: #1f2937;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
	}
	dialog::backdrop { background: rgb(0 0 0 / 60%); backdrop-filter: blur(8px); }
	/* Native dialogs sit above the custom cursor, so keep a visible pointer here. */
	:global(html.has-custom-cursor) dialog,
	:global(html.has-custom-cursor) dialog :global(*) { cursor: auto !important; }
	:global(html.has-custom-cursor) dialog .close,
	:global(html.has-custom-cursor) dialog .close :global(*) { cursor: pointer !important; }
	dialog[open] .popup { animation: boom 650ms cubic-bezier(0.16, 1, 0.3, 1) both; }
	.popup { display: flex; flex-direction: column; align-items: center; gap: 16px; }
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
	.close:hover { background: #292929; }
	.card-shell {
		position: relative;
		width: 100%;
		overflow: hidden;
		border-radius: 28px;
		background: #f2f5f8;
		box-shadow: 0 24px 80px rgb(0 0 0 / 25%);
	}
	.card-shell::after {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 64px;
		background: linear-gradient(transparent, #f2f5f8);
		pointer-events: none;
		opacity: 0;
		transition: opacity 180ms ease;
	}
	.card-shell.more-below::after { opacity: 1; }
	.card {
		height: min(480px, calc(100dvh - 96px));
		scrollbar-width: none;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: clamp(28px, 5vw, 48px);
	}
	.card::-webkit-scrollbar { display: none; }
	.eyebrow { color: #059669; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; }
	.details { display: grid; gap: 36px; margin-top: 28px; }
	.details section { display: grid; gap: 14px; }
	.details h2 { margin: 0; font-size: 23px; line-height: 1.3; font-weight: 600; }
	.design-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; padding: 8px 6px; }
	.design-stack { display: grid; align-content: start; gap: 24px; }
	.design-grid figure { margin: 0; }
	.design-grid img { display: block; width: 100%; height: auto; }
	.mock-rent-overview, .mock-open-resolved, .mock-update-left { transform: rotate(-4deg); }
	.mock-pay-rent { transform: translateX(2px) rotate(2deg); }
	.mock-issue { transform: translateX(-2px) rotate(2deg); }
	.mock-issue { width: 94%; justify-self: center; }
	section p, li { color: #636a73; font-size: 16px; line-height: 1.8; }
	ul, ol { padding-left: 24px; display: grid; gap: 8px; }
	blockquote { padding: 20px 24px; border-left: 3px solid #059669; background: #f2f8f5; border-radius: 0 12px 12px 0; font-size: 17px; line-height: 1.7; }
	@keyframes boom {
		0% { opacity: 0; transform: translateY(70vh) scale(0.82); }
		70% { opacity: 1; transform: translateY(-10px) scale(1.015); }
		100% { opacity: 1; transform: translateY(0) scale(1); }
	}
	@media (prefers-reduced-motion: reduce) {
		dialog[open] .popup { animation: none; }
	}
</style>
