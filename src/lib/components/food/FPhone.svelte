<script>
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { order, apps } from '$data/food.js';

	/**
	 * A Google result that compares one dish across delivery apps, the way
	 * Google Flights compares airlines. Rows sort; tapping one opens its bill.
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
	/** what the cheaper app saves over the dearest one */
	const saving = Math.max(...apps.map((a) => a.total)) - cheapest;

	const rupees = (n) => (n < 0 ? '−₹' : '₹') + Math.abs(n);
</script>

<div class="fp">
	<div class="device">
		<div class="screen" data-lenis-prevent>
			<div class="search">
				<span class="g" aria-hidden="true">G</span>
				<span class="q">chicken biryani Biryani House</span>
				<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0M12 17v3" fill="none" stroke="#4285f4" stroke-width="2" stroke-linecap="round" /></svg>
			</div>
			<p class="voice">“{order.query}”</p>

			<div class="result">
				<div class="head">
					<b>{order.restaurant}</b>
					<small>{order.area} · {order.dish}</small>
				</div>

				<div class="sorts" role="group" aria-label="Sort by">
					{#each sorts as s (s.id)}
						<button class:on={sort === s.id} aria-pressed={sort === s.id} onclick={() => (sort = s.id)}>{s.label}</button>
					{/each}
				</div>

				<ul class="rows">
					{#each rows as a (a.id)}
						<li animate:flip={{ duration: 320, easing: cubicOut }}>
							<button class="row" aria-expanded={open === a.id} onclick={() => (open = open === a.id ? null : a.id)}>
								<span class="badge" style:background={a.color} aria-hidden="true">{a.name.charAt(0)}</span>
								<span class="mid">
									<b>{a.name}</b>
									<small>{a.minutes} min · ★ {a.rating} ({a.ratings})</small>
									<span class="tags">
										{#if a.total === cheapest}<em class="tag tag--price">Cheapest · saves ₹{saving}</em>{/if}
										{#if a.minutes === fastest}<em class="tag tag--time">Fastest</em>{/if}
									</span>
								</span>
								<span class="price">
									<b>₹{a.total}</b>
									<small>menu ₹{a.menu}</small>
								</span>
							</button>

							{#if open === a.id}
								<div class="bill" transition:slide={{ duration: 240, easing: cubicOut }}>
									<p class="match">Matched dish: “{a.dishName}”</p>
									{#each a.bill as line (line.label)}
										<div class="line" class:off={line.amount < 0}>
											<span>{line.label}</span><span>{rupees(line.amount)}</span>
										</div>
									{/each}
									<div class="line line--total"><span>To pay</span><span>₹{a.total}</span></div>
									<span class="go" style:background={a.color}>Order on {a.name}</span>
									<small class="handoff">Opens {a.name} with the dish in your cart and the coupon applied</small>
								</div>
							{/if}
						</li>
					{/each}
				</ul>
				<p class="fine">Prices include your coupons · checked just now</p>
			</div>
		</div>
	</div>
	<p class="hint">Sort the rows, or tap one to see its bill</p>
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
	.screen {
		height: 640px;
		padding: 40px 14px 20px;
		border-radius: 37px;
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width: none;
		background: #fff;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}
	.screen::-webkit-scrollbar { display: none; }

	.search {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		border-radius: 999px;
		background: #f1f3f4;
	}
	.g {
		color: #4285f4;
		font-weight: 800;
		font-size: 16px;
	}
	.q {
		flex: 1;
		color: #202124;
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.voice {
		margin: 10px 4px 0;
		color: #5f6368;
		font-size: 12.5px;
		font-style: italic;
	}

	.result {
		margin-top: 14px;
		padding: 14px 12px;
		border: 1px solid #e3e3e3;
		border-radius: 18px;
	}
	.head b {
		display: block;
		color: #202124;
		font-size: 17px;
	}
	.head small {
		color: #5f6368;
		font-size: 12.5px;
	}

	.sorts {
		display: flex;
		gap: 6px;
		margin-top: 12px;
	}
	.sorts button {
		padding: 6px 11px;
		border: 1px solid #dadce0;
		border-radius: 8px;
		background: #fff;
		color: #3c4043;
		font: inherit;
		font-size: 12.5px;
		font-weight: 600;
	}
	.sorts button.on {
		border-color: #d2e3fc;
		background: #e8f0fe;
		color: #1967d2;
	}

	.rows {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin: 12px 0 0;
		padding: 0;
		list-style: none;
	}
	.rows li {
		border: 1px solid #e8eaed;
		border-radius: 14px;
		overflow: hidden;
	}
	.row {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 11px 10px;
		border: 0;
		background: #fff;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}
	.badge {
		display: grid;
		place-items: center;
		flex: none;
		width: 32px;
		height: 32px;
		border-radius: 9px;
		color: #fff;
		font-weight: 800;
	}
	.mid {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
		line-height: 1.3;
	}
	.mid b { color: #202124; font-size: 14.5px; }
	.mid small { color: #5f6368; font-size: 12px; }
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		margin-top: 4px;
	}
	.tag {
		padding: 2px 7px;
		border-radius: 6px;
		font-size: 10.5px;
		font-style: normal;
		font-weight: 700;
	}
	.tag--price { background: #e6f4ea; color: #137333; }
	.tag--time { background: #e8f0fe; color: #1967d2; }
	.price {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		line-height: 1.2;
	}
	.price b { color: #202124; font-size: 18px; }
	.price small {
		color: #80868b;
		font-size: 11px;
	}

	.bill {
		padding: 4px 12px 14px;
		border-top: 1px dashed #e3e3e3;
	}
	.match {
		margin: 8px 0;
		color: #5f6368;
		font-size: 11.5px;
	}
	.line {
		display: flex;
		justify-content: space-between;
		padding: 3px 0;
		color: #3c4043;
		font-size: 13px;
	}
	.line.off { color: #137333; }
	.line--total {
		margin-top: 6px;
		padding-top: 8px;
		border-top: 1px solid #e8eaed;
		color: #202124;
		font-weight: 700;
	}
	.go {
		display: block;
		margin-top: 12px;
		padding: 11px;
		border-radius: 10px;
		color: #fff;
		font-size: 14px;
		font-weight: 700;
		text-align: center;
	}
	.handoff {
		display: block;
		margin-top: 6px;
		color: #5f6368;
		font-size: 11px;
		text-align: center;
	}
	.fine {
		margin: 10px 2px 0;
		color: #80868b;
		font-size: 11px;
	}
	.hint {
		margin: 0;
		font-size: 13px;
		color: #5f6368;
	}

	@media (max-width: 400px) {
		.screen { height: 600px; }
	}
</style>
