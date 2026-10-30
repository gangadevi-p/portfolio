import { prefersReducedMotion } from './gsap.js';

/**
 * Svelte action: counts a stat up from 0 to the number already in the text,
 * holds the final value for `pause` seconds, then counts up again. Loops while
 * it is on screen. Keeps prefix/suffix, commas and decimals, so "6,061",
 * "1.8k" and "9+" all work.
 *
 *   <b use:countUp>6,061</b>
 *   <b use:countUp={{ duration: 1.6, delay: 0.4, pause: 5 }}>1.8k</b>
 *
 * Fail-safe: no-ops (final value stays in the markup) when the visitor has
 * asked for reduced motion or the text has no number in it.
 */
export function countUp(node, { duration = 1.4, delay = 0.25, pause = 5 } = {}) {
	const finalText = node.textContent.trim();
	const match = finalText.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);
	if (!match || prefersReducedMotion()) return;

	const [, prefix, figure, suffix] = match;
	const target = parseFloat(figure.replace(/,/g, ''));
	const decimals = figure.includes('.') ? figure.split('.')[1].length : 0;
	const grouped = figure.includes(',');
	const format = (n) =>
		prefix +
		n.toLocaleString('en-US', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
			useGrouping: grouped
		}) +
		suffix;

	let frame = 0;
	let timer = 0;
	node.textContent = format(0);

	const stop = () => {
		clearTimeout(timer);
		cancelAnimationFrame(frame);
	};

	const run = () => {
		let begin;
		const tick = (now) => {
			begin ??= now;
			const t = Math.min((now - begin) / (duration * 1000), 1);
			const eased = 1 - Math.pow(1 - t, 3);
			node.textContent = t < 1 ? format(target * eased) : finalText;
			if (t < 1) {
				frame = requestAnimationFrame(tick);
			} else {
				// hold the final number, then start over from 0
				timer = setTimeout(() => {
					node.textContent = format(0);
					timer = setTimeout(run, 250);
				}, pause * 1000);
			}
		};
		frame = requestAnimationFrame(tick);
	};

	// play while visible; leaving the screen rests on the real number
	const observer = new IntersectionObserver(
		([entry]) => {
			stop();
			if (entry.isIntersecting) {
				node.textContent = format(0);
				timer = setTimeout(run, delay * 1000);
			} else {
				node.textContent = finalText;
			}
		},
		{ threshold: 0.6 }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
			stop();
		}
	};
}
