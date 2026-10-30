<script>
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import AtheraReel from '$components/athera/AtheraReel.svelte';
	import ToolkitReel from '$components/toolkit/ToolkitReel.svelte';
	import AtheraMobileReel from '$components/athera/AtheraMobileReel.svelte';
	import ToolkitMobileReel from '$components/toolkit/ToolkitMobileReel.svelte';

	/* each animated card plays its desktop loop and a phone-sized twin of it */
	const reels = {
		athera: [AtheraReel, AtheraMobileReel],
		toolkit: [ToolkitReel, ToolkitMobileReel]
	};

	/** A compact project overview: logo, name, description, and date. */
	let { item, index = 0 } = $props();

	let broken = $state(false);
	const internal = $derived(item.href?.startsWith('/'));
	const openInNewTab = $derived(item.openInNewTab ?? !internal);
</script>

<svelte:element
	this={item.href ? 'a' : 'article'}
	class="card"
	class:linked={Boolean(item.href)}
	class:has-shot={Boolean(item.preview)}
	href={item.href || undefined}
	target={item.href && openInNewTab ? '_blank' : undefined}
	rel={item.href && openInNewTab ? 'noreferrer' : undefined}
	use:reveal={{ delay: (index % 2) * 0.08 }}
	use:cursorLabel={{ label: item.hoverLabel ?? (item.href ? 'Read case study' : 'Under development'), variant: 'card' }}
>
	<div class="meta">
		{#if !item.hideLogo}
			<div
				class="visual"
				class:framed={item.framed}
				class:named={Boolean(item.logoName)}
				class:visual--kiet={item.logoVariant === 'kiet'}
			>
				{#if item.logo && !broken}
					<img
						class:theme-logo={Boolean(item.darkLogo)}
						class:theme-logo--light={Boolean(item.darkLogo)}
						src={item.logo}
						alt={item.logoName ? '' : item.title}
						loading="lazy"
						style={item.logoHeight ? `width: auto; height: ${item.logoHeight}px; justify-self: start;` : undefined}
						onerror={() => (broken = true)}
					/>
					{#if item.darkLogo}
						<img
							class="theme-logo theme-logo--dark"
							src={item.darkLogo}
							alt=""
							aria-hidden="true"
							loading="lazy"
							style={item.logoHeight ? `width: auto; height: ${item.logoHeight}px; justify-self: start;` : undefined}
						/>
					{/if}
				{:else}
					{@const mono = item.monogram ?? item.title.charAt(0)}
						<span class="mono" class:long={mono.length > 1} aria-hidden="true">{mono}</span>
				{/if}
				{#if item.logoName}<span class="logo-name">{item.logoName}</span>
				{/if}
			</div>
		{:else}
			<span class="brand-name">{item.title}</span>
		{/if}
		<span class="period">
			{#if item.period}<span>{item.period}</span>{/if}
			<svg class="ic" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
				<path
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M7 17 17 7M9 7h8v8"
				/>
			</svg>
		</span>
	</div>

	{#if item.preview}
		<div
			class="shot shot--{item.preview.kind}"
			class:shot--bare={!item.preview.tone && !item.preview.backdrop}
			class:shot--brand={Boolean(item.preview.backdrop)}
			style:--tone={item.preview.tone}
			style:--backdrop={item.preview.backdrop}
			aria-hidden="true"
		>
			{#if item.preview.kind === 'phones'}
				{#each item.preview.shots as src, i (src)}
					<img class="phone phone--{i ? 'back' : 'front'}" {src} alt="" loading="lazy" />
				{/each}
			{:else if item.preview.kind === 'screens'}
				<div class="pair">
					{#each item.preview.shots as src, i (src)}
						<div
							class="zoom-phone zoom-phone--{i ? 'back' : 'front'}"
							style:--trim={item.preview.trim}
						>
							<div class="clip" class:trimmed={Boolean(item.preview.trim)}>
								<img {src} alt="" loading="lazy" decoding="async" />
							</div>
						</div>
					{/each}
				</div>
			{:else if reels[item.preview.kind]}
				{@const [Desktop, Phone] = reels[item.preview.kind]}
				<div class="laptop">
					<div class="lid"><div class="lid-screen"><Desktop /></div></div>
					<div class="deck"></div>
				</div>
				<div class="handset">
					<div class="handset-screen">
						<Phone />
						<i class="island"></i>
					</div>
				</div>
			{/if}
		</div>
	{/if}

	<div class="body" class:body--logo-hidden={item.hideLogo}>
		{#if !item.hideLogo}<h3>{item.heading ?? item.title}</h3>{/if}
		<div class="details" class:details--logo-hidden={item.hideLogo}>
			{#if item.subheading}<p class="subheading">{item.subheading}</p>{/if}
			{#if item.outcome}<p class="outcome">{item.outcome}</p>{/if}
		</div>
	</div>
</svelte:element>

<style>
	.card {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 20px;
		min-height: 304px;
		/* Frosted project tiles make the grid feel raised without competing with
		   the project marks and copy. */
		background: var(--c-surface);
		color: var(--c-ink);
		text-decoration: none;
		border-radius: 24px;
		padding: 24px;
		box-shadow:
			0 14px 34px rgb(29 29 31 / 8%),
			0 2px 5px rgb(29 29 31 / 4%);
		transition:
			transform var(--dur-fast) var(--ease-out),
			box-shadow var(--dur-fast) var(--ease-out);
	}
	/* Mockup panel — the work itself, before any words. Apps are two phones
	   rising from the bottom edge; sites play a short brand loop on a backdrop
	   taken from the site's own palette. */
	.shot {
		position: relative;
		flex: none;
		aspect-ratio: 16 / 10;
		border-radius: 16px;
		overflow: hidden;
		background: var(--backdrop, var(--tone));
		/* stays clipped to the rounded corners while children transform */
		isolation: isolate;
		/* lets the device frames below size themselves off the panel's width */
		container-type: inline-size;
	}
	/* a touch darker than the brand backdrop, so the screens on it read as lit */
	.shot--brand:is(.shot--athera, .shot--toolkit) {
		box-shadow: inset 0 0 0 999px rgb(0 0 0 / 22%);
	}
	/* Relay — two app screens shown up close: big phones the panel crops, so the
	   interface fills the card. The pair zooms in a little further on hover. */
	.pair {
		position: absolute;
		inset: 0;
		transform-origin: 50% 0;
		transition: transform 0.9s var(--ease-out);
	}
	.card.linked:hover .pair,
	.card.linked:focus-visible .pair {
		transform: scale(1.08);
	}
	.zoom-phone {
		position: absolute;
		width: 46cqw;
		padding: 1.2cqw;
		border-radius: 6.4cqw;
		background: #0b0b0d;
		box-shadow:
			inset 0 0 0 0.22cqw rgb(255 255 255 / 16%),
			0 0 0 0.28cqw #2b2b30,
			0 3cqw 6cqw -1.5cqw rgb(15 30 60 / 45%);
		animation: float 7s ease-in-out infinite alternate;
	}
	/* the island */
	.zoom-phone::before {
		content: '';
		position: absolute;
		z-index: 1;
		top: 2.5cqw;
		left: 50%;
		width: 12cqw;
		height: 3.4cqw;
		border-radius: 99px;
		background: #000;
		transform: translateX(-50%);
	}
	.clip {
		position: relative;
		overflow: hidden;
		aspect-ratio: 1572 / 3408;
		border-radius: 5.2cqw;
	}
	.clip img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	/* a baked-in phone frame is cut away: the image is drawn slightly larger than
	   its box and pulled up-left by the frame's thickness, so only the screen shows.
	   (Margin percentages are of the box's width, which keeps the cut even all round.) */
	.clip.trimmed img {
		width: calc(100% / (1 - 2 * var(--trim)) + 1%);
		height: auto;
		max-width: none;
		margin: calc(var(--trim) / (1 - 2 * var(--trim)) * -100% - 0.5%) 0 0
			calc(var(--trim) / (1 - 2 * var(--trim)) * -100% - 0.5%);
	}
	.zoom-phone--front {
		left: 4cqw;
		top: 6.5cqw;
		z-index: 2;
	}
	.zoom-phone--back {
		left: 49.5cqw;
		top: 17.5cqw;
		animation-delay: -3.5s;
	}
	@keyframes float {
		from { translate: 0 0; }
		to { translate: 0 -1.3cqw; }
	}

	/* The devices stand on one baseline, a laptop and a phone, each card in its
	   own finish: Athera is a silver laptop seen front-on, with the phone on the
	   right; Tool-Kit is a dark laptop turned a little, with the phone on the left. */
	.laptop {
		position: absolute;
		bottom: 9cqw;
		z-index: 1;
		width: 73cqw;
		transition: translate var(--dur-fast) var(--ease-out);
	}
	.lid {
		position: relative;
		width: 66cqw;
		margin-inline: auto;
		padding: 0.9cqw 0.9cqw 1.1cqw;
		border-radius: 1.8cqw 1.8cqw 0.3cqw 0.3cqw;
		background: #101012;
		box-shadow:
			0 0 0 0.3cqw #2a2a2e,
			inset 0 0 0 0.2cqw rgb(255 255 255 / 10%);
	}
	/* webcam */
	.lid::before {
		content: '';
		position: absolute;
		top: 0.35cqw;
		left: 50%;
		width: 0.5cqw;
		height: 0.5cqw;
		border-radius: 50%;
		background: #2c2c32;
		transform: translateX(-50%);
	}
	.lid-screen {
		position: relative;
		aspect-ratio: 16 / 10;
		border-radius: 0.5cqw;
		overflow: hidden;
		background: var(--backdrop, #000);
	}
	.deck {
		position: relative;
		height: 2.4cqw;
		border-radius: 0 0 2.2cqw 2.2cqw / 0 0 1.6cqw 1.6cqw;
		background: linear-gradient(#e9e9ed, #c6c6cd 60%, #9a9aa3);
		box-shadow:
			inset 0 0.15cqw 0 rgb(255 255 255 / 70%),
			0 3cqw 4cqw -1cqw rgb(0 0 0 / 55%);
	}
	/* thumb notch for opening the lid */
	.deck::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		width: 11cqw;
		height: 0.8cqw;
		border-radius: 0 0 1cqw 1cqw;
		background: linear-gradient(#a6a6ae, #c9c9d0);
		transform: translateX(-50%);
	}

	/* Athera — silver, flat to the camera, phone in titanium on the right */
	.shot--athera .laptop {
		left: 2cqw;
	}
	.shot--athera .handset {
		right: 3cqw;
		box-shadow:
			inset 0 0 0 0.25cqw rgb(255 255 255 / 22%),
			0 0 0 0.35cqw #bfae99,
			0 2.4cqw 4.4cqw rgb(0 0 0 / 50%);
	}

	/* Tool-Kit — space black, with the keyboard deck showing, phone on the left */
	.shot--toolkit .laptop {
		right: 1.5cqw;
		width: 76cqw;
		filter: drop-shadow(0 2.6cqw 3cqw rgb(0 0 0 / 55%));
	}
	.shot--toolkit .lid {
		width: 70cqw;
		padding: 1.2cqw 1.2cqw 1.4cqw;
		border-radius: 2cqw 2cqw 0.2cqw 0.2cqw;
		background: #060607;
		box-shadow:
			0 0 0 0.3cqw #3a3a40,
			inset 0 0 0 0.2cqw rgb(255 255 255 / 8%);
	}
	/* the deck seen from the front and a little above: a trapezoid of keys with
	   a trackpad, rather than Athera's thin silver wedge */
	.shot--toolkit .deck {
		height: 5cqw;
		border-radius: 0;
		clip-path: polygon(4% 0, 96% 0, 100% 100%, 0 100%);
		background:
			linear-gradient(#0a0a0c, #0a0a0c) 50% 78% / 13cqw 1.5cqw no-repeat,
			repeating-linear-gradient(90deg, rgb(255 255 255 / 7%) 0 0.26cqw, transparent 0.26cqw 1.9cqw) 0 18% / 100% 1.6cqw no-repeat,
			repeating-linear-gradient(90deg, rgb(255 255 255 / 7%) 0 0.26cqw, transparent 0.26cqw 1.9cqw) 0 48% / 100% 1.6cqw no-repeat,
			linear-gradient(#3b3b42, #1a1a1e 70%, #101012);
		box-shadow: none;
	}
	.shot--toolkit .deck::before {
		width: 12cqw;
		height: 0.9cqw;
		background: linear-gradient(#0d0d10, #2a2a2f);
	}
	.shot--toolkit .handset {
		left: 3cqw;
	}

	.handset {
		position: absolute;
		bottom: 9cqw;
		z-index: 2;
		width: 23cqw;
		padding: 1.1cqw;
		border-radius: 4.4cqw;
		background: #0d0d0e;
		box-shadow:
			inset 0 0 0 0.25cqw rgb(255 255 255 / 18%),
			0 0 0 0.3cqw #2a2a2e,
			0 2.4cqw 4.4cqw rgb(0 0 0 / 50%);
		transition: translate var(--dur-fast) var(--ease-out);
	}
	.handset-screen {
		position: relative;
		aspect-ratio: 390 / 844;
		border-radius: 3.4cqw;
		overflow: hidden;
		background: var(--backdrop);
	}
	.island {
		position: absolute;
		z-index: 5;
		top: 0.9cqw;
		left: 50%;
		width: 5.6cqw;
		height: 1.6cqw;
		border-radius: 99px;
		background: #000;
		transform: translateX(-50%);
	}
	.card.linked:hover .laptop,
	.card.linked:focus-visible .laptop {
		translate: 0 -4px;
	}
	.card.linked:hover .handset,
	.card.linked:focus-visible .handset {
		translate: 0 -8px;
	}
	/* plain tints dim in dark mode; brand backdrops stay as the brand made them */
	:global(html[data-theme='dark']) .shot:not(.shot--bare, .shot--brand) {
		background: color-mix(in srgb, var(--tone) 14%, #262626);
	}
	.phone {
		position: absolute;
		width: 32%;
		height: auto;
		filter: drop-shadow(0 14px 20px rgb(29 29 31 / 18%));
		transition: transform var(--dur-fast) var(--ease-out);
	}
	.phone--front {
		left: 20%;
		top: 10%;
		z-index: 1;
	}
	.phone--back {
		right: 20%;
		top: 20%;
	}
	.card.linked:hover .phone--front,
	.card.linked:focus-visible .phone--front {
		transform: translateY(-6px);
	}
	.card.linked:hover .phone--back,
	.card.linked:focus-visible .phone--back {
		transform: translateY(-10px);
	}

	/* Top row: the project's mark and name on the left, its date on the right,
	   the same way the UX cards open */
	.meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		min-width: 0;
		min-height: 40px;
	}
	.visual {
		flex: none;
		display: grid;
		place-items: center;
		height: 40px;
		border-radius: 24px;
	}
	.visual img {
		width: auto;
		height: 40px;
		object-fit: contain;
	}
	.theme-logo--dark {
		display: none;
	}
	/* logo with the project name written beside it */
	.visual.named {
		width: auto;
		grid-auto-flow: column;
		justify-content: start;
		gap: 10px;
	}
	.logo-name {
		font-size: clamp(1.2rem, 1.75vw, 1.45rem);
		font-weight: 700;
		letter-spacing: -0.01em;
		color: var(--c-ink);
	}
	.visual.framed {
		background: var(--c-surface-subtle);
		box-shadow: 0 14px 32px -16px rgba(255, 106, 61, 0.4);
		padding: 16px;
	}
	.mono {
		font-family: var(--font-display);
		font-size: clamp(2.25rem, 7vw, 3.5rem);
		color: #c8c2bb;
	}
	/* multi-letter monograms (e.g. "GDS") shrink to fit the 80px logo slot */
	.mono.long {
		font-size: 2.25rem;
		white-space: nowrap;
	}

	/* Project details */
	.body {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: flex-start;
		min-width: 0;
	}
	h3 {
		font-size: clamp(1.2rem, 1.75vw, 1.45rem);
		font-weight: 700;
		letter-spacing: -0.01em;
	}
	.body:not(.body--logo-hidden) > h3 {
		color: #626262;
		font-size: clamp(1.075rem, calc(1.75vw - 2px), 1.325rem);
		opacity: 1;
	}
	.subheading {
		margin-top: 4px;
		color: var(--c-ink);
		font-size: clamp(0.92rem, 1.25vw, 1rem);
		font-weight: 600;
	}
	.details--logo-hidden .subheading {
		margin-top: 0;
		color: #626262;
		font-size: clamp(1.075rem, calc(1.75vw - 2px), 1.325rem);
		font-weight: 700;
		letter-spacing: -0.01em;
		opacity: 1;
	}
	.outcome {
		margin-top: 8px;
		max-width: 44ch;
		color: var(--c-ink-soft);
		font-size: clamp(0.92rem, 1.25vw, 1rem);
		font-weight: 600;
		line-height: 1.4;
	}

	/* date pill — Thinking-style, with the arrow that says the card opens */
	.period {
		display: inline-flex;
		flex: none;
		align-items: center;
		gap: 8px;
		padding: 5px 12px;
		border-radius: 999px;
		background: var(--c-surface-subtle);
		color: var(--c-ink);
		font-size: var(--fs-small);
		white-space: nowrap;
		box-shadow:
			0 1px 2px rgb(29 29 31 / 6%),
			0 6px 14px -6px rgb(29 29 31 / 16%);
	}
	.period > span:first-child {
		color: inherit;
	}
	.period .ic {
		flex: none;
		color: inherit;
	}
	.brand-name {
		font-size: clamp(1.2rem, 1.75vw, 1.45rem);
		font-weight: 700;
		letter-spacing: -0.01em;
		color: var(--c-ink);
	}
	/* keeps "Designer's Tool-Kit" on one line beside its date on a phone */
	@media (max-width: 480px) {
		.brand-name {
			font-size: 1.05rem;
			white-space: nowrap;
		}
	}
	/* no arrow until the card actually opens something */
	.card:not(.linked) .period .ic {
		display: none;
	}
	/* Only cards that actually open a page react to hover; static ones (no
	   link, "Under development") stay flat. The highlight is a lift, a thin
	   light ring and a bright top edge — it never changes the surface colour,
	   since swapping to --c-surface-subtle read as a grey/dark wash. */
	.card.linked:hover,
	.card.linked:focus-visible {
		transform: translateY(-4px);
		box-shadow:
			0 0 0 1px rgba(var(--c-ink-rgb), 0.07),
			inset 0 1px 0 rgb(255 255 255 / 70%),
			0 18px 40px rgb(29 29 31 / 8%),
			0 4px 10px rgb(29 29 31 / 4%);
	}
	/* the arrow in the date pill nudges toward its corner */
	.period .ic {
		transition: transform var(--dur-fast) var(--ease-out);
	}
	.card.linked:hover .period .ic,
	.card.linked:focus-visible .period .ic {
		transform: translate(2px, -2px);
	}
	@media (prefers-reduced-motion: reduce) {
		.card.linked:hover,
		.card.linked:focus-visible {
			transform: none;
		}
		.period .ic,
		.phone,
		.laptop,
		.handset,
		.pair {
			transition: none;
		}
		.zoom-phone {
			animation: none;
		}
		.card.linked:hover .pair,
		.card.linked:focus-visible .pair {
			transform: none;
		}
		.card.linked:hover .phone,
		.card.linked:focus-visible .phone {
			transform: none;
		}
		.card.linked:hover :is(.laptop, .handset),
		.card.linked:focus-visible :is(.laptop, .handset) {
			translate: none;
		}
		.card.linked:hover .period .ic,
		.card.linked:focus-visible .period .ic {
			transform: none;
		}
	}

</style>
