<script>
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { measure } from '$data/uber.js';

	/**
	 * The post-ride sheet: one yes / no question about the photo. "Not really"
	 * opens the reasons; any final answer swaps to a thank-you.
	 */
	let who = $state('rider');
	/** null → unanswered, 'yes', or 'no' (then pick a reason) */
	let answer = $state(null);
	let reason = $state(null);

	const sheet = $derived(measure.feedback[who]);
	const done = $derived(answer === 'yes' || reason !== null);

	function pick(next) {
		who = next;
		answer = null;
		reason = null;
	}
</script>

<div class="fb">
	<div class="switch" role="tablist" aria-label="Choose who answers">
		<button role="tab" aria-selected={who === 'rider'} class:on={who === 'rider'} onclick={() => pick('rider')}>Rider</button>
		<button role="tab" aria-selected={who === 'driver'} class:on={who === 'driver'} onclick={() => pick('driver')}>Driver</button>
	</div>

	<div class="sheet">
		<span class="grab" aria-hidden="true"></span>
		{#if done}
			<div class="thanks" in:slide={{ duration: 220, easing: cubicOut }}>
				<span class="tick" aria-hidden="true">✓</span>
				<b>Thanks, that helps</b>
				<small>{answer === 'yes' ? 'Glad the photo made pickup easier.' : `Noted: “${reason}”.`}</small>
				<button class="again" onclick={() => pick(who)}>Try again</button>
			</div>
		{:else}
			<p class="trip">Trip complete · Majestic Metro</p>
			<p class="q">{sheet.question}</p>
			<div class="answers">
				<button class:on={answer === 'yes'} onclick={() => (answer = 'yes')}>
					<span aria-hidden="true">👍</span> Yes
				</button>
				<button class:on={answer === 'no'} onclick={() => (answer = 'no')}>
					<span aria-hidden="true">👎</span> Not really
				</button>
			</div>
			{#if answer === 'no'}
				<div class="reasons" transition:slide={{ duration: 220, easing: cubicOut }}>
					<p>What went wrong?</p>
					<div class="chips">
						{#each sheet.reasons as r (r)}
							<button onclick={() => (reason = r)}>{r}</button>
						{/each}
					</div>
				</div>
			{/if}
			<span class="skip">Not now</span>
		{/if}
	</div>
</div>

<style>
	.fb {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		width: 100%;
	}
	.switch {
		display: inline-flex;
		gap: 4px;
		padding: 4px;
		border-radius: 999px;
		background: #f3f3f1;
	}
	.switch button {
		padding: 7px 16px;
		border: 0;
		border-radius: 999px;
		background: none;
		color: #545454;
		font: inherit;
		font-size: 13px;
		font-weight: 600;
	}
	.switch button.on {
		background: #000;
		color: #fff;
	}

	.sheet {
		width: min(100%, 340px);
		min-height: 236px;
		box-sizing: border-box;
		padding: 10px 18px 18px;
		border-radius: 24px;
		background: #fff;
		box-shadow: 0 20px 44px -22px rgb(0 0 0 / 35%), 0 0 0 1px rgb(0 0 0 / 5%);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}
	.grab {
		display: block;
		width: 36px;
		height: 4px;
		margin: 0 auto 14px;
		border-radius: 999px;
		background: #d6d6d6;
	}
	.trip {
		margin: 0;
		color: #6b6b6b;
		font-size: 12px;
	}
	.q {
		margin: 4px 0 0;
		color: #000;
		font-size: 17px;
		font-weight: 700;
		line-height: 1.3;
	}
	.answers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
		margin-top: 14px;
	}
	.answers button {
		padding: 11px;
		border: 1.5px solid #e2e2e2;
		border-radius: 12px;
		background: #fff;
		color: #000;
		font: inherit;
		font-size: 14px;
		font-weight: 600;
		transition: border-color 160ms ease, background 160ms ease;
	}
	.answers button:hover { border-color: #bdbdbd; }
	.answers button.on {
		border-color: #000;
		background: #f6f6f6;
	}
	.reasons p {
		margin: 14px 0 8px;
		color: #000;
		font-size: 13px;
		font-weight: 600;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.chips button {
		padding: 6px 11px;
		border: 0;
		border-radius: 999px;
		background: #f0f0f0;
		color: #222;
		font: inherit;
		font-size: 12.5px;
		font-weight: 600;
	}
	.chips button:hover { background: #e4e4e4; }
	.skip {
		display: block;
		margin-top: 14px;
		color: #6b6b6b;
		font-size: 13px;
		font-weight: 600;
		text-align: center;
	}

	.thanks {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 18px 0 4px;
		text-align: center;
	}
	.tick {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		margin-bottom: 8px;
		border-radius: 50%;
		background: #05944f;
		color: #fff;
		font-weight: 700;
	}
	.thanks b { color: #000; font-size: 16px; }
	.thanks small { color: #6b6b6b; font-size: 13px; }
	.again {
		margin-top: 10px;
		padding: 0;
		border: 0;
		background: none;
		color: #276ef1;
		font: inherit;
		font-size: 13px;
		font-weight: 600;
	}
</style>
