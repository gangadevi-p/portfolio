/** tone name → inline CSS custom props consumed by the .k-* primitives */
export function toneVars(tone = 'dark') {
	return `--pill-fg: var(--t-${tone}); --pill-bg: var(--t-${tone}-bg);`;
}
