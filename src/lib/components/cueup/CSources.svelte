<script>
	/**
	 * Sources row for the Research section: a "Sources:" label and six clickable
	 * user chips styled like the page's pill buttons. Each chip links out to the
	 * Reddit thread and, on hover or keyboard focus, floats the post itself
	 * (rebuilt as text by CRedditPost) above it.
	 */
	import { reveal } from '$motion/reveal.js';
	import { cursorLabel } from '$motion/cursor.svelte.js';
	import CRedditPost from './CRedditPost.svelte';

	let { label = 'Sources:', users = [] } = $props();
</script>

<div class="sources" use:reveal>
	<span class="lead">
		{label}
		<svg class="rd" viewBox="0 0 24 24" aria-hidden="true">
			<circle cx="12" cy="14" r="7.4" fill="none" stroke="currentColor" stroke-width="1.5" />
			<path
				d="M12 6.6 12.9 2.6 16.4 3.4"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<circle cx="17.4" cy="3.6" r="1.6" fill="currentColor" />
			<circle cx="3.4" cy="13.2" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5" />
			<circle cx="20.6" cy="13.2" r="2.5" fill="none" stroke="currentColor" stroke-width="1.5" />
			<circle cx="9.4" cy="13.4" r="1.15" fill="currentColor" />
			<circle cx="14.6" cy="13.4" r="1.15" fill="currentColor" />
			<path
				d="M9 17.4c1.8 1.3 4.2 1.3 6 0"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
		</svg>
	</span>

	<div class="users">
		{#each users as u, i (u.label)}
			<span class="user" class:end={i >= users.length - 2}>
				<a
					class="chip"
					href={u.href}
					target="_blank"
					rel="noreferrer"
					use:cursorLabel={{ label: 'Reddit', variant: 'link' }}
				>
					{u.label}
					<svg class="arw" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M7 17 17 7M9 7h8v8"
						/>
					</svg>
				</a>
				<span class="peek">
					<CRedditPost posts={u.posts} href={u.href} />
				</span>
			</span>
		{/each}
	</div>
</div>

<style>
	.sources {
		display: flex;
		align-items: center;
		gap: 14px 26px;
		flex-wrap: wrap;
		margin-top: 34px;
	}
	/* white pill behind just the "Sources:" label + Reddit icon, matching the chips */
	.lead {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		height: 44px;
		padding-inline: 20px;
		border-radius: 999px;
		background: var(--cu-card);
		box-shadow: var(--cu-shadow);
		font-size: 16px;
		font-weight: 600;
		color: #2b3440;
	}
	.lead .rd {
		width: 22px;
		height: 22px;
		color: #4b5563;
	}

	.users {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 14px 22px;
	}

	.user {
		position: relative;
	}

	/* pill button, matching the page's .pill style */
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 44px;
		padding-inline: 20px;
		border-radius: 999px;
		background: var(--cu-card);
		box-shadow: var(--cu-shadow);
		font-size: 15px;
		font-weight: 600;
		color: #2b3440;
		transition:
			color 0.16s ease,
			transform 0.16s ease,
			box-shadow 0.16s ease;
	}
	.chip .arw {
		width: 16px;
		height: 16px;
	}
	.user:hover .chip,
	.user:focus-within .chip {
		color: var(--cu-emerald);
		transform: translateY(-1px);
		box-shadow:
			0 1px 2px rgba(31, 41, 55, 0.05),
			0 22px 44px -26px rgba(31, 41, 55, 0.4);
	}

	/* post preview, floats above the chip on hover / focus */
	.peek {
		position: absolute;
		left: 0;
		bottom: calc(100% + 12px);
		width: 320px;
		padding: 20px 22px;
		border-radius: 16px;
		background: var(--cu-card);
		box-shadow:
			0 1px 2px rgba(31, 41, 55, 0.05),
			0 30px 60px -24px rgba(31, 41, 55, 0.45);
		opacity: 0;
		visibility: hidden;
		transform: translateY(6px);
		transition:
			opacity 0.18s ease,
			transform 0.18s ease,
			visibility 0.18s;
		pointer-events: none;
		z-index: 30;
	}
	.user.end .peek {
		left: auto;
		right: 0;
	}
	.user:hover .peek,
	.user:focus-within .peek {
		opacity: 1;
		visibility: visible;
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.chip,
		.peek {
			transition: none;
		}
	}
</style>
