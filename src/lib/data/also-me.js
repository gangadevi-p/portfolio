/**
 * Images for the "Also me" collage (GaniLayout.svelte), in display order.
 *
 * The collage has 6 tiles of different shapes, filled in this order:
 * wide, square, tall, square, tall, extra tall. Pick the photo for each slot
 * by its shape. Anything after the 6th is kept here but not shown.
 *
 * Each tile is cropped to its shape; set `position` (any CSS object-position,
 * e.g. 'center 30%') to keep the subject in view, and `caption` for the small
 * tag that appears on hover.
 */

export const gallery = [
	{ src: '/img/me/paragliding%201.avif', alt: 'Paragliding over a green valley', label: 'Me', caption: 'Paragliding' },
	{ src: '/img/me/drawing%201.avif', alt: 'Hand-drawn swan sketch', caption: 'Sketching', position: 'center 42%' },
	{ src: '/img/me/dmbl.jpg', alt: 'Holding a dumbbell at the gym', label: 'Me', caption: 'Gym', position: '38% center' },
	{ src: '/img/me/mirrorimg%201.avif', alt: 'Mirror selfie', label: 'Me', caption: 'Me', position: 'center 30%' },
	{ src: '/img/me/kitten.jpg', alt: 'Two kittens cuddling outdoors', caption: 'Kittens', position: '62% center' },
	{ src: '/img/me/pencil%201.avif', alt: 'Pencil portrait sketch', caption: 'Pencil portraits', position: 'center 16%' },

	// not shown — the collage has 6 tiles (sideways source, needs rotating first)
	{ src: '/img/me/draing2.avif', alt: 'Drawing 2' }
];
