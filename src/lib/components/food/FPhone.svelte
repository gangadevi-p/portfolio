<script>
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { order, apps, rupees } from '$data/food.js';

	/**
	 * A Siri answer that compares one dish across delivery apps, the way
	 * Google Flights compares airlines. It sits on a real Siri screenshot (the
	 * request goes in Siri's own bubble); rows sort, and tapping one opens its bill.
	 */
	const sorts = [
		{ id: 'price', label: 'Cheapest', by: (a, b) => a.total - b.total },
		{ id: 'time', label: 'Fastest', by: (a, b) => a.minutes - b.minutes },
		{ id: 'rating', label: 'Top rated', by: (a, b) => b.rating - a.rating }
	];

	const cheapest = Math.min(...apps.map((a) => a.total));

	let sort = $state('price');
	/** the cheapest bill starts open, so the breakdown is visible straight away */
	let open = $state(apps.find((a) => a.total === cheapest).id);

	const rows = $derived([...apps].sort(sorts.find((s) => s.id === sort).by));
	const fastest = Math.min(...apps.map((a) => a.minutes));
	/** what the cheaper app saves over the dearest one, to the nearest rupee */
	const saving = Math.round(Math.max(...apps.map((a) => a.total)) - cheapest);

	/** the coloured line under each app, like Siri's "Hours Unavailable" */
	const status = (a) =>
		[a.total === cheapest ? `Cheapest · ₹${saving} less` : `₹${saving} more`, a.minutes === fastest && 'Fastest']
			.filter(Boolean)
			.join(' · ');
</script>

<div class="fp">
	<div class="device">
		<div class="screen">
			<!-- laid out like Siri's own answer cards (see /food/siri-today.webp) -->
			<div class="card" data-lenis-prevent>
				<div class="head">
					<b>{order.restaurant}</b>
					<small>{order.dish} · on 2 apps</small>
					<div class="sorts" role="group" aria-label="Sort by">
						{#each sorts as s (s.id)}
							<button class:on={sort === s.id} aria-pressed={sort === s.id} onclick={() => (sort = s.id)}>{s.label}</button>
						{/each}
					</div>
				</div>

				<ul class="rows">
					{#each rows as a (a.id)}
						<li animate:flip={{ duration: 320, easing: cubicOut }}>
							<div class="row">
								<button class="row-main" aria-expanded={open === a.id} onclick={() => (open = open === a.id ? null : a.id)}>
									<span class="icon" style:background={a.color} aria-hidden="true">{a.name.charAt(0)}</span>
									<span class="text">
										<b>{a.name}</b>
										<span class="sub">{rupees(a.total)} · {a.eta} · ★ {a.rating}</span>
										<span class="status" class:good={a.total === cheapest}>{status(a)}</span>
									</span>
								</button>
								<span class="action" aria-hidden="true">
									<span class="action-circle">
										<svg viewBox="0 0 24 24"><path d="M5.5 8.5h13l-1 10.6a2 2 0 0 1-2 1.9h-7a2 2 0 0 1-2-1.9l-1-10.6ZM9 11V7a3 3 0 0 1 6 0v4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
									</span>
									Order
								</span>
							</div>

							{#if open === a.id}
								<div class="bill" transition:slide={{ duration: 240, easing: cubicOut }}>
									{#each a.bill as line (line.label)}
										<div class="line" class:off={line.amount <= 0}>
											<span>{line.label}</span><span>{line.amount === 0 ? `Free with ${line.note}` : rupees(line.amount)}</span>
										</div>
									{/each}
									<div class="line line--total"><span>To pay</span><span>{rupees(a.total)}</span></div>
								</div>
							{/if}
						</li>
					{/each}
				</ul>

				<div class="foot">
					<span class="icon icon--sm" style:background={rows[0].color} aria-hidden="true">{rows[0].name.charAt(0)}</span>
					Open {rows[0].name} with this in your cart
				</div>
			</div>

			<!-- what was said, in Siri's own bubble -->
			<p class="ask">{order.query}</p>
		</div>
	</div>
	<p class="hint">Sort the apps, or tap one to see its bill</p>
</div>

<style>
	.fp {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		width: 100%;
	}
	.device {
		width: min(100%, 340px);
		padding: 10px;
		border-radius: 46px;
		background: #1f1f1f;
		box-shadow: 0 30px 60px -30px rgb(0 0 0 / 55%);
	}
	/* the real Siri screenshot; the card and the request are laid on top */
	.screen {
		position: relative;
		container-type: inline-size;
		aspect-ratio: 1179 / 2556;
		border-radius: 37px;
		overflow: hidden;
		background: #111 url('/food/siri.webp') center / cover no-repeat;
		color: #fff;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	/* Siri's answer card, measured off a real one: solid black, near the top */
	.card {
		position: absolute;
		inset: 7% 2.2% 23.4%;
		border-radius: 6cqw;
		background: #000;
		box-shadow: 0 0 0 1px rgb(255 255 255 / 6%);
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width: none;
	}
	.card::-webkit-scrollbar { display: none; }

	/* "Good afternoon." was cleared from the screenshot; this fills the bubble */
	.ask {
		position: absolute;
		top: 78.25%;
		left: 2.1%;
		width: 95.8%;
		height: 7.1%;
		display: grid;
		place-items: center;
		margin: 0;
		padding: 0 6%;
		box-sizing: border-box;
		color: #fff;
		font-size: 4.3cqw;
		font-weight: 600;
		text-align: center;
	}

	/* stands where Siri's map sits */
	.head {
		margin: 2cqw;
		padding: 4cqw;
		border-radius: 4.5cqw;
		background: #1c1c1e;
	}
	.head b {
		display: block;
		font-size: 4.8cqw;
	}
	.head small {
		color: rgb(235 235 245 / 60%);
		font-size: 3.6cqw;
	}
	.sorts {
		display: flex;
		margin-top: 3.5cqw;
		padding: 0.6cqw;
		border-radius: 2.6cqw;
		background: rgb(118 118 128 / 24%);
	}
	.sorts button {
		flex: 1;
		padding: 1.6cqw 0;
		border: 0;
		border-radius: 2cqw;
		background: none;
		color: #fff;
		font: inherit;
		font-size: 3.4cqw;
		font-weight: 600;
	}
	.sorts button.on { background: #636366; }

	.rows {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.rows li + li .row { border-top: 1px solid rgb(84 84 88 / 65%); }
	.row {
		display: flex;
		align-items: center;
		gap: 2cqw;
		/* dividers start under the text, as in Siri */
		margin-left: 22.9cqw;
		padding: 3.4cqw 3.6cqw 3.4cqw 0;
	}
	.row-main {
		display: flex;
		flex: 1;
		align-items: center;
		gap: 3.7cqw;
		min-width: 0;
		margin-left: -18.9cqw;
		padding: 0;
		border: 0;
		background: none;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}
	.icon {
		display: grid;
		place-items: center;
		flex: none;
		width: 15.2cqw;
		height: 15.2cqw;
		border-radius: 3.6cqw;
		color: #fff;
		font-size: 7cqw;
		font-weight: 800;
	}
	.icon--sm {
		width: 5.4cqw;
		height: 5.4cqw;
		border-radius: 1.4cqw;
		font-size: 3cqw;
	}
	.text {
		display: flex;
		flex-direction: column;
		min-width: 0;
		line-height: 1.3;
	}
	.text b { font-size: 4.8cqw; }
	.sub {
		color: rgb(235 235 245 / 60%);
		font-size: 3.8cqw;
	}
	.status {
		color: #ff9f0a;
		font-size: 3.8cqw;
	}
	.status.good { color: #30d158; }
	.action {
		display: flex;
		flex: none;
		flex-direction: column;
		align-items: center;
		gap: 1cqw;
		color: #0a84ff;
		font-size: 3.2cqw;
		font-weight: 600;
	}
	.action-circle {
		display: grid;
		place-items: center;
		width: 9.4cqw;
		height: 9.4cqw;
		border-radius: 50%;
		background: #1c1c2e;
	}
	.action-circle svg { width: 4.6cqw; height: 4.6cqw; }

	.bill {
		margin: 0 3.6cqw 3cqw 22.9cqw;
		padding: 2.4cqw 3cqw;
		border-radius: 3cqw;
		background: #1c1c1e;
	}
	.line {
		display: flex;
		justify-content: space-between;
		gap: 2cqw;
		padding: 0.6cqw 0;
		color: rgb(235 235 245 / 86%);
		font-size: 3.3cqw;
	}
	.line.off { color: #30d158; }
	.line--total {
		margin-top: 1.4cqw;
		padding-top: 1.8cqw;
		border-top: 1px solid rgb(84 84 88 / 65%);
		color: #fff;
		font-weight: 700;
	}

	/* like Siri's "Open Maps" footer */
	.foot {
		display: flex;
		align-items: center;
		gap: 3cqw;
		padding: 4cqw;
		background: #0e0e0f;
		color: rgb(235 235 245 / 72%);
		font-size: 3.9cqw;
	}
	.hint {
		margin: 0;
		font-size: 13px;
		color: #5f6368;
	}
</style>
