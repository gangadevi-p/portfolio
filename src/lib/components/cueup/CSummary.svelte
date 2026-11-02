<script>
	/** HD, framed exports (about 1540px wide), shown at a third of the popup's width */
	const design = [
		{
			role: 'Landlord',
			screens: [
				{ src: '/img/CueUp/Landlord%20repairsSo.avif', alt: 'Relay landlord repairs screen', label: 'Repairs', width: 1540, height: 3200 },
				{ src: '/img/CueUp/landlordRent%20So.avif', alt: 'Relay landlord rent screen', label: 'Rent', width: 1523, height: 3200 },
				{ src: '/img/CueUp/Landlord%20Tenant%20So.avif', alt: 'Relay landlord tenants screen', label: 'Tenants', width: 1551, height: 3200 }
			]
		},
		{
			role: 'Tenant',
			screens: [
				{ src: '/img/CueUp/TenantHomeSo.avif', alt: 'Relay tenant home screen', label: 'Home', width: 1546, height: 3200 },
				{ src: '/img/CueUp/TenantRentSo.avif?v=20260917002746', alt: 'Relay tenant rent screen', label: 'Rent', width: 1548, height: 3200 },
				{ src: '/img/CueUp/TenantRepairsSo.avif', alt: 'Relay tenant repairs screen', label: 'Repairs', width: 1552, height: 3200 }
			]
		}
	];

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
		<article class="card" bind:this={card} onscroll={updateScrollHint} aria-label="Relay summary content">
			<p class="eyebrow" id="cueup-summary-title">RELAY · THE QUICK READ</p>
			<h2 class="lead">Rent and repairs, minus the chasing.</h2>
			<dl class="facts">
				<div><dt>Role</dt><dd>Product designer</dd></div>
				<div><dt>Timeline</dt><dd>Jun – Aug 2026</dd></div>
				<div><dt>Scope</dt><dd>Landlord and tenant apps</dd></div>
			</dl>
			<div class="details">
				<section>
					<h3>The problem</h3>
					<p>Rent and repairs are the only two things a landlord and a tenant owe each other. Both live in WhatsApp, calls and notebooks, and neither has a status.</p>
					<p>So nobody can tell what is paid, what is pending or who has a repair. Both sides spend their time following up.</p>
				</section>
				<section>
					<h3>What I found</h3>
					<p>Two moments broke every time: proving that rent was paid, and knowing who has a repair and what happens next.</p>
				</section>
				<section>
					<h3>The idea</h3>
					<p>One shared status that both sides see, with Relay kept deliberately small: rent and repairs, nothing else.</p>
					<ul>
						<li><b>Rent.</b> The tenant pays by UPI, bank or cash and attaches proof. The landlord verifies it. Every payment reads paid, pending or overdue.</li>
						<li><b>Repairs.</b> Every request has an owner, a stage and a next step.</li>
						<li><b>Two homes.</b> Each home screen opens on what that person came for: who hasn't paid for the landlord, rent due for the tenant.</li>
					</ul>
				</section>
				<section>
					<h3>The design</h3>
					<div class="design">
						{#each design as group (group.role)}
							<div class="group">
								<p class="role">{group.role}</p>
								<div class="screens">
									{#each group.screens as screen (screen.src)}
										<figure>
											<img
												src={screen.src}
												alt={screen.alt}
												width={screen.width}
												height={screen.height}
												loading="lazy"
												decoding="async"
											/>
											<figcaption>{screen.label}</figcaption>
										</figure>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</section>
				<section>
					<h3>Where it stands</h3>
					<p>A complete concept for both roles: payment proof and verification, repair reporting and progress, and updates. Relay hasn't launched, so there is no impact data yet.</p>
					<p>Next I'd test payment verification and repair tracking with real landlords and tenants, then handle rejected proofs and partial payments.</p>
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
		width: min(1060px, calc(100vw - 32px));
		max-width: none;
		max-height: calc(100dvh - 32px);
		padding: 0;
		border: 0;
		background: transparent;
		overflow: visible;
		color: #1f2937;
		font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
	}
	dialog::backdrop {
		background: rgb(0 0 0 / 60%);
		backdrop-filter: blur(8px);
		animation: backdrop-in 280ms ease-out both;
	}
	dialog[open] .popup { animation: popup-in 380ms cubic-bezier(0.16, 1, 0.3, 1) both; }
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
		height: min(780px, calc(100dvh - 96px));
		scrollbar-width: none;
		overflow-y: auto;
		overscroll-behavior: contain;
		padding: clamp(28px, 5vw, 48px);
	}
	.card::-webkit-scrollbar { display: none; }
	.eyebrow { margin: 0; color: #059669; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; }
	.lead { margin: 14px 0 0; font-size: clamp(28px, 4.4vw, 38px); line-height: 1.1; font-weight: 700; letter-spacing: -0.02em; }
	.facts { display: flex; flex-wrap: wrap; gap: 12px 40px; margin: 24px 0 0; padding: 18px 0 0; border-top: 1px solid #e0e5ea; }
	.facts div { display: grid; gap: 2px; }
	.facts dt { color: #8a929c; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
	.facts dd { margin: 0; font-size: 15px; font-weight: 600; }
	.details { display: grid; gap: 36px; margin-top: 36px; }
	.details section { display: grid; gap: 12px; }
	.details h3 { margin: 0; font-size: 20px; line-height: 1.3; font-weight: 700; }
	.details p { margin: 0; }
	li b { color: #1f2937; font-weight: 600; }

	/* the screens: two labelled rows of three, all the same size and straight */
	.design { display: grid; gap: 28px; margin-top: 4px; }
	.group { display: grid; gap: 14px; }
	.role { color: #1f2937; font-size: 15px; font-weight: 600; }
	.screens { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(10px, 2.4vw, 20px); }
	.screens figure { margin: 0; display: grid; gap: 10px; }
	/* the exports differ by a few pixels, so each sits in the same frame and the captions line up */
	.screens img { display: block; width: 100%; height: auto; aspect-ratio: 1546 / 3200; object-fit: contain; }
	.screens figcaption { color: #8a929c; font-size: 13px; font-weight: 500; text-align: center; }
	section p, li { color: #636a73; font-size: 16px; line-height: 1.75; }
	ul, ol { margin: 0; padding-left: 22px; display: grid; gap: 10px; }
	@keyframes popup-in {
		0% { opacity: 0; transform: scale(0.94); }
		100% { opacity: 1; transform: scale(1); }
	}
	@keyframes backdrop-in {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}
	@media (prefers-reduced-motion: reduce) {
		dialog[open] .popup { animation: none; }
	}
</style>
