/**
 * A custom capital "G" — a logo mark, not a typeface: a heavy, slightly squared
 * ring whose cuts all share one slant (the terminal, the crossbar's tip and a
 * small tooth on the stem). It is one vector path, edited one point at a time
 * the way you would in Figma's vector editor: select a vertex, drag it (or one
 * of its handles) and only that point moves.
 *
 * Coordinates live in a 1155 × 1362 box, the same as the still image this
 * replaces. Handles are stored as absolute positions.
 */

const rad = (deg) => (deg * Math.PI) / 180;
const f = (n) => Math.round(n * 10) / 10;
const lerp = (a, b, u) => a + (b - a) * u;
const ease = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
const clamp = (u) => Math.min(1, Math.max(0, u));

/** handle length for a cubic that follows an arc of `deg` degrees */
const arc = (deg) => (4 / 3) * Math.tan(rad(deg) / 4);

/** nodes along an ellipse at the given angles, handles following the curve;
 *  the first node has no incoming handle and the last none outgoing */
function chain(cx, cy, rx, ry, angles, square = 1) {
	return angles.map((deg, i) => {
		const a = rad(deg);
		const x = cx + rx * Math.cos(a);
		const y = cy + ry * Math.sin(a);
		const dx = -rx * Math.sin(a);
		const dy = ry * Math.cos(a);
		const before = i > 0 ? arc(deg - angles[i - 1]) * square : 0;
		const after = i < angles.length - 1 ? arc(angles[i + 1] - deg) * square : 0;
		return { x, y, ix: x - before * dx, iy: y - before * dy, ox: x + after * dx, oy: y + after * dy };
	});
}

const LIFT = 0;
const SHIFT = 55; // centres the letter across the canvas

/** the starting outline: one contour */
function base() {
	const SQ = 1.12; // a touch squarer than a circle: the ring reads as a mark
	const cx = 578;
	const cy = 650;
	const outer = chain(cx, cy, 430, 430, [90, 180, 270, 318], SQ); // Bot, L, T, A
	const inner = chain(cx, cy, 250, 215, [-48, -90, -180, -270], SQ); // A', IT, IL, IB
	const [Bot, L, T, A] = outer;
	const [A2, IT, IL, IB] = inner;

	// every cut shares one slant: the terminal, the crossbar's tip and the stem's tooth
	const corner = (x, y) => ({ x, y, ix: x, iy: y, ox: x, oy: y });
	const B2 = corner(552, 762); // crossbar tip, lower
	const B3 = corner(708, 632); // crossbar tip, upper
	const B5 = corner(814, 632); // where the tooth starts
	const B4 = corner(898, 562); // the tooth's tip
	// the closing is all straight lines: a flat floor, a square corner, a
	// vertical stem, and a square pocket under the crossbar
	const C = corner(898, 1080); // the stem's outer foot
	const F = corner(750, 865); // the pocket's floor, meeting the stem
	const E = corner(750, 762); // the stem's inner wall, meeting the crossbar
	A.ox = A.x;
	A.oy = A.y;
	A2.ix = A2.x;
	A2.iy = A2.y;

	const contour = [A, A2, IT, IL, IB, F, E, B2, B3, B5, B4, C, Bot, L, T];
	for (const n of contour) {
		for (const k of ['x', 'ix', 'ox']) n[k] += SHIFT;
		for (const k of ['y', 'iy', 'oy']) n[k] += LIFT;
	}
	return [contour];
}

/** one closed outline through the nodes */
function outline(nodes) {
	let d = `M${f(nodes[0].x)} ${f(nodes[0].y)}`;
	for (let i = 1; i <= nodes.length; i++) {
		const a = nodes[i - 1];
		const b = nodes[i % nodes.length];
		d += `C${f(a.ox)} ${f(a.oy)} ${f(b.ix)} ${f(b.iy)} ${f(b.x)} ${f(b.y)}`;
	}
	return d + 'Z';
}

/**
 * The edits, in order. Each picks one point — a vertex, or one of its handles —
 * and drags it by `d`. Dragging a vertex carries its own handles along; dragging
 * a handle moves that handle alone. Nothing else changes.
 */
const EDITS = [
	{ c: 0, i: 0, part: 'anchor', d: { x: 28, y: -64 } }, // the terminal's tip: a longer blade
	{ c: 0, i: 8, part: 'anchor', d: { x: -70, y: 0 } }, // the crossbar's tip: a sharper point
	{ c: 0, i: 14, part: 'out', d: { x: 110, y: -46 } }, // one handle on the top: a squarer shoulder
	{ c: 0, i: 10, part: 'anchor', d: { x: 0, y: -76 } }, // the tooth: taller
	{ c: 0, i: 13, part: 'anchor', d: { x: -44, y: 0 } } // the left edge: a wider ring
];

const FADE = 0.35; // the canvas dips to its background between loops
const START = 0.55;
const MOVE = 0.55; // the cursor travels to the point
const PRESS = 0.14; // click: the point is selected and its handles appear
const DRAG = 0.85; // drag
const HOLD = 0.4; // let go
const STEP = MOVE + PRESS + DRAG + HOLD;
const LOOP = START + STEP * EDITS.length + 0.55 + FADE;
const ENTRY = { x: 1010, y: 1290 }; // where the cursor comes in from

/** the position of a vertex, or of one of its handles */
const at = (n, part) =>
	part === 'in' ? { x: n.ix, y: n.iy } : part === 'out' ? { x: n.ox, y: n.oy } : { x: n.x, y: n.y };

/** drag one point by `u` of an edit's distance */
function apply(contours, edit, u) {
	const n = contours[edit.c][edit.i];
	const dx = edit.d.x * u;
	const dy = edit.d.y * u;
	if (edit.part === 'anchor') {
		// a vertex brings its own handles with it
		n.x += dx;
		n.ix += dx;
		n.ox += dx;
		n.y += dy;
		n.iy += dy;
		n.oy += dy;
	} else if (edit.part === 'in') {
		n.ix += dx;
		n.iy += dy;
	} else {
		n.ox += dx;
		n.oy += dy;
	}
}

/** the whole editor at `time` seconds into the loop */
export function frame(time) {
	const t = time % LOOP;
	const contours = base();

	const local = t - START;
	const finished = local < 0 ? 0 : Math.min(EDITS.length, Math.floor(local / STEP));
	for (let e = 0; e < finished; e++) apply(contours, EDITS[e], 1);

	let cursor = { ...ENTRY };
	let selected = null; // { c, i, part }
	let dragging = false;
	const pick = (edit) => ({ c: edit.c, i: edit.i, part: edit.part });

	if (finished === EDITS.length) {
		// every edit made: rest on the last point
		const last = EDITS[EDITS.length - 1];
		selected = pick(last);
		cursor = at(contours[last.c][last.i], last.part);
	} else if (local >= 0) {
		const edit = EDITS[finished];
		const prev = finished > 0 ? EDITS[finished - 1] : null;
		const within = local - finished * STEP;
		const start = at(contours[edit.c][edit.i], edit.part);

		if (within < MOVE) {
			if (prev) selected = pick(prev);
			const from = prev ? at(contours[prev.c][prev.i], prev.part) : ENTRY;
			const u = ease(within / MOVE);
			cursor = { x: lerp(from.x, start.x, u), y: lerp(from.y, start.y, u) };
		} else if (within < MOVE + PRESS) {
			selected = pick(edit);
			cursor = start;
		} else if (within < MOVE + PRESS + DRAG) {
			selected = pick(edit);
			apply(contours, edit, ease((within - MOVE - PRESS) / DRAG));
			cursor = at(contours[edit.c][edit.i], edit.part);
			dragging = true;
		} else {
			selected = pick(edit);
			apply(contours, edit, 1);
			cursor = at(contours[edit.c][edit.i], edit.part);
		}
	}

	const vertices = [];
	contours.forEach((nodes, c) =>
		nodes.forEach((n, i) => {
			vertices.push({ x: n.x, y: n.y, selected: selected?.c === c && selected?.i === i });
		})
	);

	// handles show only for the selected vertex, as in Figma
	const handles = [];
	if (selected) {
		const n = contours[selected.c][selected.i];
		for (const part of ['in', 'out']) {
			const h = at(n, part);
			if (Math.hypot(h.x - n.x, h.y - n.y) < 2) continue;
			handles.push({ x1: n.x, y1: n.y, x2: h.x, y2: h.y, active: selected.part === part });
		}
	}

	// the canvas dips to its background at either end of the loop
	let fade = 0;
	if (t < FADE) fade = 1 - t / FADE;
	else if (t > LOOP - FADE) fade = (t - (LOOP - FADE)) / FADE;

	return {
		fill: contours.map(outline).join(''),
		outlines: contours.map(outline),
		vertices,
		handles,
		cursor,
		dragging,
		fade: clamp(fade)
	};
}

/** a moment to rest on when motion is reduced: the first point selected */
export const STILL = START + MOVE + PRESS + DRAG + 0.2;
