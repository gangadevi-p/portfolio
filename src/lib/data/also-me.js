/**
 * Images for the "Also me" layout (GaniLayout.svelte), in display order.
 *
 * The layout has 6 frames, shown as 3 columns × 2 rows below the copy, in order.
 * Anything after the 6th is kept here but not shown — move a photo into the
 * first 6 to use it.
 *
 * Frames are a shared landscape tile, so photos are cropped to fit; set
 * `position` (any CSS object-position, e.g. 'center 30%') to keep the
 * subject in view.
 */

export const gallery = [
	{ src: '/img/me/paragliding%201.jpg', alt: 'Paragliding over a green valley', label: 'Me' },
	{ src: '/img/me/drawing%201.jpg', alt: 'Hand-drawn swan sketch' },
	{ src: '/img/me/dmbl.jpg', alt: 'Holding a dumbbell at the gym', label: 'Me' },
	{ src: '/img/me/mirrorimg%201.jpg', alt: 'Mirror selfie', label: 'Me' },
	{ src: '/img/me/kitten.jpg', alt: 'Two kittens cuddling outdoors' },
	{ src: '/img/me/pencil%201.jpg', alt: 'Pencil portrait sketch', position: 'center 14%' },

	// not shown — the layout has 6 frames (sideways source, needs rotating first)
	{ src: '/img/me/draing2.jpeg', alt: 'Drawing 2' }
];
