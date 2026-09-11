<script>
	import { onMount } from 'svelte';

	const selector = '[data-dev-source], [data-dev-page-source]';

	onMount(() => {
		let frame;
		const overlay = document.createElement('div');
		overlay.className = 'dev-file-overlay';
		document.body.append(overlay);

		async function copyFile(label, file) {
			await navigator.clipboard.writeText(file);
			label.textContent = 'Copied';
			label.classList.add('copied');
			window.setTimeout(() => {
				if (!label.isConnected) return;
				label.textContent = file;
				label.classList.remove('copied');
			}, 900);
		}

		function draw() {
			frame = undefined;
			overlay.replaceChildren();
			const labelOffsets = new Map();
			const labelledFiles = new Set();

			for (const element of document.querySelectorAll(selector)) {
				const rect = element.getBoundingClientRect();
				if (!rect.width || !rect.height || rect.bottom < 0 || rect.top > window.innerHeight) continue;

				for (const file of [element.dataset.devSource, element.dataset.devPageSource]) {
					if (!file || labelledFiles.has(file)) continue;
					labelledFiles.add(file);
					const left = Math.max(4, rect.left);
					const top = Math.max(4, rect.top);
					const positionKey = `${Math.round(left / 8)}:${Math.round(top / 8)}`;
					const offset = labelOffsets.get(positionKey) ?? 0;
					labelOffsets.set(positionKey, offset + 17);
					const label = document.createElement('button');
					label.type = 'button';
					label.title = `Copy ${file}`;
					label.setAttribute('aria-label', `Copy ${file}`);
					label.textContent = file;
					label.style.left = `${left}px`;
					label.style.top = `${top + offset}px`;
					label.addEventListener('click', () => copyFile(label, file));
					overlay.append(label);
				}
			}
		}

		function schedule() {
			if (frame === undefined) frame = requestAnimationFrame(draw);
		}

		const observer = new MutationObserver((records) => {
			if (records.some((record) => !overlay.contains(record.target))) schedule();
		});
		observer.observe(document.body, { childList: true, subtree: true });
		window.addEventListener('scroll', schedule, true);
		window.addEventListener('resize', schedule);
		schedule();

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', schedule, true);
			window.removeEventListener('resize', schedule);
			if (frame !== undefined) cancelAnimationFrame(frame);
			overlay.remove();
		};
	});
</script>

<style>
	:global([data-dev-source]),
	:global([data-dev-page-source]) {
		outline: 1px dashed rgb(255 80 65 / 72%);
		outline-offset: -1px;
	}
	:global(.dev-file-overlay) {
		position: fixed;
		inset: 0;
		z-index: 2147483646;
		pointer-events: none;
	}
	:global(.dev-file-overlay button) {
		position: fixed;
		max-width: min(320px, calc(100vw - 8px));
		overflow: hidden;
		padding: 3px 6px;
		border: 1px solid rgb(255 151 0 / 86%);
		border-radius: 4px;
		background: rgb(35 20 18 / 92%);
		box-shadow: 0 2px 8px rgb(0 0 0 / 30%);
		color: #fff;
		cursor: copy;
		font: 600 10px/1.2 ui-monospace, SFMono-Regular, Consolas, monospace;
		letter-spacing: 0;
		text-overflow: ellipsis;
		user-select: text;
		white-space: nowrap;
		pointer-events: auto;
	}
	:global(.dev-file-overlay button:hover),
	:global(.dev-file-overlay button:focus-visible) {
		border-color: #fff;
		background: #5a2619;
		outline: none;
	}
	:global(.dev-file-overlay button.copied) {
		background: #155f3b;
	}
</style>
