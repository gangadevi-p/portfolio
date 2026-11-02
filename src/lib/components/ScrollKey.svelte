<script>
	import { onMount } from 'svelte';
	import { scrollByScreen } from '$motion/smoothscroll.js';

	// The 3D "scroll down" key from the home hero.
	//  - default: sits in the flow, centred under a case-study hero
	//  - fixed:   pinned to the bottom of the screen on every device; each press
	//             scrolls down one screen and it hides once the page ends
	//  - theme:   'whatsapp' (green), 'black' or 'orange' recolour the key
	let { href, label = 'Scroll to the next section', fixed = false, theme = '' } = $props();

	let atEnd = $state(false);

	function update() {
		atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
	}

	onMount(() => {
		if (!fixed) return;
		update();
		addEventListener('scroll', update, { passive: true });
		addEventListener('resize', update, { passive: true });
		return () => {
			removeEventListener('scroll', update);
			removeEventListener('resize', update);
		};
	});

	function press(e) {
		if (!fixed) return;
		e.preventDefault();
		scrollByScreen();
	}
</script>

<a
	class="scroll-key"
	class:fixed
	class:hidden={fixed && atEnd}
	class:whatsapp={theme === 'whatsapp'}
	class:black={theme === 'black'}
	class:orange={theme === 'orange'}
	{href}
	aria-label={label}
	onclick={press}
>
	<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
		<path d="M12 4v13m0 0-5.5-5.5M12 17l5.5-5.5" fill="none" stroke="currentColor"
			stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</a>

<style>
	/* 3D key: a raised body sitting on a dark slab (the 8px solid shadow),
	   with a recessed face and a glossy streak drawn by the pseudo-elements. */
	.scroll-key {
		--depth: 8px;
		position: relative;
		display: grid;
		place-items: center;
		grid-column: 1 / -1;
		justify-self: center;
		align-self: end;
		width: 60px;
		height: 60px;
		margin: 8px 0 var(--depth);
		border-radius: 18px;
		background: linear-gradient(180deg, var(--key-top, #55555b), var(--key-bot, #232326));
		color: #fff;
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 30%),
			0 var(--depth) 0 var(--key-slab, #0b0b0c),
			0 calc(var(--depth) + 3px) 0 var(--key-rim, #d6d6db),
			0 calc(var(--depth) + 14px) 22px var(--key-glow, rgb(29 29 31 / 22%));
		transition: translate 0.15s ease-out, box-shadow 0.15s ease-out;
	}
	.scroll-key::before {
		content: '';
		position: absolute;
		inset: 5px;
		border-radius: 13px;
		background: linear-gradient(180deg, var(--key-face-top, #3d3d42), var(--key-face-bot, #1d1d1f));
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 16%),
			inset 0 -3px 6px rgb(0 0 0 / 35%);
	}
	.scroll-key::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: linear-gradient(115deg, transparent 38%, rgb(255 255 255 / 9%) 38% 56%, transparent 56%);
		pointer-events: none;
	}
	.scroll-key svg {
		position: relative;
		z-index: 1;
		filter: drop-shadow(0 1.5px 0 rgb(0 0 0 / 55%));
	}
	.scroll-key:hover {
		translate: 0 3px;
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 30%),
			0 calc(var(--depth) - 3px) 0 var(--key-slab, #0b0b0c),
			0 var(--depth) 0 var(--key-rim, #d6d6db),
			0 calc(var(--depth) + 8px) 16px rgb(29 29 31 / 20%);
	}
	.scroll-key:active {
		translate: 0 calc(var(--depth) - 1px);
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 30%),
			0 1px 0 var(--key-slab, #0b0b0c),
			0 4px 0 var(--key-rim, #d6d6db),
			0 6px 10px rgb(29 29 31 / 18%);
	}

	.scroll-key.whatsapp {
		--key-top: #2bbd98;
		--key-bot: #008069;
		--key-face-top: #00977a;
		--key-face-bot: #006b58;
		--key-slab: #00453a;
		--key-rim: #bfe4da;
		--key-glow: rgb(0 128 105 / 30%);
	}

	.scroll-key.black {
		--key-top: #3a3a3a;
		--key-bot: #000;
		--key-face-top: #1f1f1f;
		--key-face-bot: #000;
		--key-slab: #000;
		--key-rim: #cfcfcb;
		--key-glow: rgb(0 0 0 / 30%);
	}
	.scroll-key.orange {
		--key-top: #ff9a45;
		--key-bot: #f26a0f;
		--key-face-top: #fb7d1f;
		--key-face-bot: #d95a06;
		--key-slab: #8a3703;
		--key-rim: #fbd3b4;
		--key-glow: rgb(242 106 15 / 32%);
	}

	/* pinned to the bottom of the viewport, whatever the screen size */
	.scroll-key.fixed {
		position: fixed;
		bottom: calc(24px + env(safe-area-inset-bottom, 0px));
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 60;
		transition: translate 0.15s ease-out, box-shadow 0.15s ease-out, opacity 0.25s ease;
	}
	.scroll-key.fixed.hidden {
		opacity: 0;
		pointer-events: none;
	}
</style>
