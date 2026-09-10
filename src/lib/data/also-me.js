/**
 * Images for the "Also me" section, grouped by layout row.
 * Each layout is rendered by its own component (Layout1, Layout2, …) and the
 * AlsoMeSection stacks them.
 */

/**
 * Row 1 — an equal-height strip: paragliding, hill, sticker, gym collage.
 * `ratio` is the image's natural width / height; the strip splits by it so the
 * four images share one height, keep their own proportions, and together fill
 * the full row width.
 */
export const layout1 = [
	{ src: '/img/me/draing2.jpeg', alt: 'Drawing 2', ratio: 1.084, rotation: -90 },
	{ src: '/img/me/paragliding%201.jpg', alt: 'Paragliding over a green valley', ratio: 1.779 },
	{ src: '/img/me/im%20fine%201.jpg', alt: '"I’m fine" flaming-skeleton sticker', ratio: 0.749 },
	{ src: '/img/me/Group%201.jpg', alt: 'At the gym — arm flex and dumbbell lifts', ratio: 0.851 }
];

/**
 * Row 2 — an equal-height strip: rain illustration, mirror selfie, swan sketch.
 * `ratio` is the image's natural width / height; it drives the flex split so the
 * three images share one height while keeping their own widths.
 */
export const layout2 = [
	{ src: '/img/me/mirrorimg%201.jpg', alt: 'Mirror selfie', ratio: 1.033 },
	{ src: '/img/me/animerain%201.jpg', alt: 'Illustration of a girl looking up in the rain', ratio: 1 },
	{ src: '/img/me/drawing%201.jpg', alt: 'Hand-drawn swan sketch', ratio: 1.068 }
];

/**
 * Row 3 — an equal-height strip: waterfall viewpoint + monochrome portrait.
 * Same technique as Layout 2 (flex-grow = natural ratio) but spans the full
 * 100% width. `ratio` is natural width / height.
 */
export const layout3 = [
	{ src: '/img/me/painting.jpeg', alt: 'Painting', ratio: 1, rotation: -90 },
	{ src: '/img/me/anime%201.jpg', alt: 'Monochrome anime-style portrait', ratio: 1 }
];

/**
 * Layout 4 — a vertical column that sits beside Layout 2 + Layout 3 and matches
 * their combined height. Two images stacked with a 40px gap; the pencil portrait
 * (`size: 'big'`) takes more of the height than the hug illustration.
 */
export const layout4 = [
	{ src: '/img/me/pencil%201.jpg', alt: 'Pencil portrait sketch', size: 'big' },
	{ src: '/img/me/love%201.jpg', alt: 'Illustration of a person hugging themselves', size: 'small' }
];
