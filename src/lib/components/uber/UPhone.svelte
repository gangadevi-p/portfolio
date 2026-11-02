<script>
	import { fade } from 'svelte/transition';
	import { ride, views } from '$data/uber.js';

	/**
	 * Uber-style pickup screen. The rider sees a real photo of the auto, turned
	 * to the side they'll see; the driver sees the rider's photo of the spot.
	 */
	let { view = $bindable('rider'), side = $bindable('front') } = $props();

	const photo = $derived(views[side]);
	/** where the auto sits on the little map, per side */
	const marker = { front: 'translate(170px, 34px)', side: 'translate(170px, 128px)' };
</script>

<div class="up">
	<div class="switch" role="tablist" aria-label="Choose an app">
		<button role="tab" aria-selected={view === 'rider'} class:on={view === 'rider'} onclick={() => (view = 'rider')}>Rider</button>
		<button role="tab" aria-selected={view === 'driver'} class:on={view === 'driver'} onclick={() => (view = 'driver')}>Driver</button>
	</div>

	<div class="device">
		<div class="screen">
			<!-- map -->
			<svg class="map" viewBox="0 0 320 200" aria-hidden="true">
				<rect width="320" height="200" fill="#eceef1" />
				<rect x="18" y="58" width="112" height="56" rx="6" fill="#e3dcef" />
				<text x="74" y="90" text-anchor="middle" class="map-label">Majestic Metro</text>
				<rect x="220" y="20" width="84" height="70" rx="6" fill="#e2e6ea" />
				<rect x="220" y="120" width="84" height="64" rx="6" fill="#e2e6ea" />
				<path d="M170 -10V210M-10 150H330" stroke="#fff" stroke-width="22" />
				<path d="M170 -10V210M-10 150H330" stroke="#d9dde2" stroke-width="1" stroke-dasharray="6 8" />

				{#if view === 'driver'}
					<path d="M170 34V128L146 132" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
				{:else if side === 'front'}
					<path d="M170 48V124" fill="none" stroke="#111" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round" />
				{/if}

				<!-- you / pickup -->
				<circle cx="140" cy="134" r="16" fill="rgb(39 110 241 / 18%)" />
				<circle cx="140" cy="134" r="7" fill="#276ef1" stroke="#fff" stroke-width="3" />

				<!-- the auto -->
				<g class="marker" style:transform={view === 'driver' ? marker.front : marker[side]}>
					<circle r="12" fill="#111" />
					<path d="M0 6 -5 -4h10z" fill="#fff" />
				</g>
			</svg>

			<!-- bottom sheet -->
			<div class="sheet" data-lenis-prevent>
				{#if view === 'rider'}
					<div class="row">
						<div>
							<b class="status">{photo.status}</b>
							<small>{ride.spot}</small>
						</div>
						<span class="pin">PIN <b>{ride.pin}</b></span>
					</div>

					<figure class="photo">
						{#key side}
							<img src={photo.src} alt={photo.alt} in:fade={{ duration: 220 }} />
						{/key}
						<figcaption>{photo.look}</figcaption>
					</figure>
					<ul class="cues">
						{#each photo.cues as cue (cue)}<li>{cue}</li>{/each}
					</ul>

					<div class="driver">
						<span class="avatar" aria-hidden="true">{ride.driver.charAt(0)}</span>
						<span class="who">
							<b>{ride.driver}</b>
							<small>★ {ride.rating} · Auto</small>
						</span>
						<span class="plate">{ride.plate}</span>
					</div>
				{:else}
					<div class="row">
						<div>
							<b class="status">Pick up {ride.rider}</b>
							<small>1 min · {ride.spot}</small>
						</div>
					</div>

					<figure class="photo photo--spot">
						<img src="/uber/pickup-majestic.avif" alt="Entrance of Majestic metro station with a purple metro sign and potted plants" />
						<figcaption>Rider’s spot</figcaption>
					</figure>
					<p class="note">“{ride.riderNote}”</p>
					<p class="meta">Added by the rider · faces blurred</p>

					<span class="cta">I’ve arrived</span>
				{/if}
			</div>
		</div>
	</div>

	{#if view === 'rider'}
		<div class="sides" role="group" aria-label="Where is the auto?">
			{#each Object.entries(views) as [key, v] (key)}
				<button class:on={side === key} aria-pressed={side === key} onclick={() => (side = key)}>{v.label}</button>
			{/each}
		</div>
	{:else}
		<p class="hint">The rider added this photo when booking</p>
	{/if}
</div>

<style>
	.up {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		width: 100%;
	}

	.switch,
	.sides {
		display: inline-flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 4px;
		padding: 4px;
		border-radius: 999px;
		background: #fff;
		box-shadow: 0 1px 2px rgb(0 0 0 / 6%), 0 8px 24px -16px rgb(0 0 0 / 30%);
	}
	.switch button,
	.sides button {
		padding: 8px 18px;
		border: 0;
		border-radius: 999px;
		background: none;
		color: #545454;
		font: inherit;
		font-size: 14px;
		font-weight: 600;
		transition: background 180ms ease, color 180ms ease;
	}
	.switch button.on,
	.sides button.on {
		background: #000;
		color: #fff;
	}
	.sides button { padding: 7px 14px; font-size: 13px; }

	.device {
		width: min(100%, 340px);
		padding: 10px;
		border-radius: 46px;
		background: #111;
		box-shadow: 0 30px 60px -30px rgb(0 0 0 / 55%);
	}
	.screen {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 640px;
		border-radius: 37px;
		overflow: hidden;
		background: #eceef1;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.map {
		display: block;
		flex: none;
		width: 100%;
		height: auto;
	}
	.map-label {
		fill: #6b5b95;
		font-size: 10px;
		font-weight: 600;
	}
	.marker {
		transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.sheet {
		flex: 1;
		margin-top: -18px;
		padding: 16px 16px 20px;
		border-radius: 22px 22px 0 0;
		background: #fff;
		box-shadow: 0 -6px 20px rgb(0 0 0 / 8%);
		overflow-y: auto;
		scrollbar-width: none;
	}
	.sheet::-webkit-scrollbar { display: none; }
	.row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 10px;
	}
	.status {
		display: block;
		color: #000;
		font-size: 18px;
		line-height: 1.25;
	}
	.row small {
		display: block;
		margin-top: 2px;
		color: #6b6b6b;
		font-size: 12.5px;
	}
	.pin {
		flex: none;
		padding: 5px 10px;
		border-radius: 8px;
		background: #f3f3f3;
		color: #545454;
		font-size: 11px;
		font-weight: 600;
	}
	.pin b { color: #000; font-size: 13px; letter-spacing: 0.06em; }

	.photo {
		position: relative;
		margin: 12px 0 0;
		border-radius: 14px;
		overflow: hidden;
		aspect-ratio: 4 / 3;
		background: #ddd;
	}
	.photo img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.photo figcaption {
		position: absolute;
		top: 10px;
		left: 10px;
		padding: 5px 10px;
		border-radius: 999px;
		background: #000;
		color: #fff;
		font-size: 12px;
		font-weight: 600;
	}
	.photo--spot figcaption { background: #276ef1; }

	.cues {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 10px 0 0;
		padding: 0;
		list-style: none;
	}
	.cues li {
		padding: 4px 9px;
		border-radius: 999px;
		background: #eef6f0;
		color: #05944f;
		font-size: 12px;
		font-weight: 600;
	}

	.driver {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 14px;
		padding-top: 12px;
		border-top: 1px solid #eee;
	}
	.avatar {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #e8e8e8;
		color: #333;
		font-weight: 700;
	}
	.who { display: flex; flex-direction: column; line-height: 1.25; }
	.who b { color: #000; font-size: 14px; }
	.who small { color: #6b6b6b; font-size: 12px; }
	/* Indian commercial plates are black on yellow */
	.plate {
		margin-left: auto;
		padding: 4px 8px;
		border: 1.5px solid #222;
		border-radius: 5px;
		background: #f7d117;
		color: #111;
		font-size: 12px;
		font-weight: 800;
		letter-spacing: 0.04em;
		white-space: nowrap;
	}

	.note {
		margin: 10px 0 0;
		color: #000;
		font-size: 14px;
		font-weight: 600;
		line-height: 1.4;
	}
	.meta {
		margin: 4px 0 0;
		color: #6b6b6b;
		font-size: 12px;
	}
	.cta {
		display: block;
		margin-top: 14px;
		padding: 13px;
		border-radius: 10px;
		background: #000;
		color: #fff;
		font-size: 15px;
		font-weight: 600;
		text-align: center;
	}

	.hint {
		margin: 0;
		font-size: 13px;
		color: #545454;
	}

	@media (max-width: 400px) {
		.screen { height: 600px; }
	}
</style>
