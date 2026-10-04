<script>
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';

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
	href={item.href || undefined}
	target={item.href && openInNewTab ? '_blank' : undefined}
	rel={item.href && openInNewTab ? 'noreferrer' : undefined}
	use:reveal={{ delay: (index % 2) * 0.08 }}
	use:cursorLabel={{ label: item.hoverLabel ?? (item.href ? 'Read case study' : 'Under development'), variant: 'view' }}
>
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
	{/if}

	<div class="body" class:body--logo-hidden={item.hideLogo}>
		<h3>{item.heading ?? item.title}</h3>
		<div class="details" class:details--logo-hidden={item.hideLogo}>
			{#if item.subheading}<p class="subheading">{item.subheading}</p>{/if}
			<p class="blurb">{item.blurb}</p>
		</div>

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
</svelte:element>

<style>
	.card {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 24px;
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
	/* Project logo */
	.visual {
		flex: none;
		align-self: flex-start;
		width: 80px;
		height: 80px;
		display: grid;
		place-items: center;
		border-radius: 24px;
	}
	.visual img {
		width: 100%;
		height: 100%;
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
	.body--logo-hidden {
		justify-content: initial;
	}
	.body--logo-hidden > h3 {
		display: flex;
		align-items: center;
		min-height: 80px;
	}
	.details--logo-hidden {
		margin-top: auto;
		margin-bottom: 16px;
	}
	.body--logo-hidden .period {
		margin-top: 16px;
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
	.blurb {
		margin-top: 8px;
		max-width: 26ch;
		color: var(--c-ink-soft);
		font-size: clamp(0.92rem, 1.25vw, 1rem);
		line-height: 1.45;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	/* date pill — pushed to the bottom of the card */
	.period {
		margin-top: auto;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		width: 100%;
		background: var(--c-surface-subtle);
		color: var(--c-ink);
		font-size: var(--fs-small);
		padding: 8px 16px;
		border-radius: 999px;
		box-shadow:
			0 1px 2px rgb(29 29 31 / 6%),
			0 6px 14px -6px rgb(29 29 31 / 16%);
		white-space: nowrap;
	}
	.period > span:first-child {
		color: inherit;
	}
	.period .ic {
		flex: none;
		color: inherit;
	}
	/* no arrow until the card actually opens something */
	.card:not(.linked) .period .ic {
		display: none;
	}
	.card:hover {
		transform: translateY(-4px);
		background: var(--c-surface-subtle);
		box-shadow:
			0 22px 46px rgb(29 29 31 / 12%),
			0 5px 12px rgb(29 29 31 / 5%);
	}

</style>
