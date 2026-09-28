<script>
	import KStickyNote from './KStickyNote.svelte';
	import { revealScale } from '$motion/reveal.js';
	let { steps = [] } = $props();

	const tilt = [-3, 2.5, -2, 3, -1.5];
	const lift = [8, 70, 0, 78, 14];
	const tape = ['sky', 'blush', 'mint', 'butter', 'sky'];
</script>

<div class="proc" use:revealScale>
	{#each steps as s, i}
		<div class="slot" style="--mt:{lift[i % lift.length]}px">
			<KStickyNote
				title={s.title}
				text={s.text}
				tone={s.tone}
				tilt={tilt[i % tilt.length]}
				tape={tape[i % tape.length]}
			/>
			{#if i < steps.length - 1}
				<svg class="link" class:flip={i % 2 === 1} viewBox="0 0 120 70" aria-hidden="true">
					<path
						d="M6 40 C 34 6, 58 6, 66 34 S 96 60, 114 30"
						fill="none"
						stroke="var(--k-orange)"
						stroke-width="2.2"
						stroke-linecap="round"
						stroke-dasharray="1 8"
					/>
					<path
						d="M106 20 l10 10 -12 7"
						fill="none"
						stroke="var(--k-orange)"
						stroke-width="2.2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{/if}
		</div>
	{/each}
</div>

<style>
	.proc {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		gap: 1rem 0.25rem;
		padding-block: 1rem 2rem;
	}
	.slot {
		display: flex;
		align-items: flex-start;
		gap: 0.25rem;
		margin-top: var(--mt);
	}
	.link {
		flex: none;
		width: 78px;
		height: 60px;
		margin-top: 46px;
		opacity: 0.9;
	}
	.link.flip {
		transform: scaleY(-1);
	}

	@media (max-width: 760px) {
		.proc {
			flex-direction: column;
			align-items: center;
		}
		.slot {
			flex-direction: column;
			align-items: center;
			margin-top: 0;
		}
		.link {
			transform: rotate(90deg);
			margin: -0.25rem 0;
		}
		.link.flip {
			transform: rotate(90deg) scaleY(-1);
		}
	}
</style>
