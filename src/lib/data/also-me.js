/**
 * Images for the "Also me" gallery, grouped into three rows.
 *
 * Each row is an independent flex strip: every image's flex-grow equals its
 * own width/height ratio, so with a zero flex-basis the row splits
 * proportionally and every image in that row ends up the same height while
 * keeping its own natural width — nothing is cropped, and no row needs a
 * background behind it. Because each row sizes itself independently, the top
 * row naturally ends up a different height than the two below it.
 *
 * `ratio` is the image's DISPLAYED width / height — for the two rotated
 * photos that means width and height are swapped from the source file's own
 * dimensions, since the rotation turns the box on its side.
 */

export const row1 = [
	{ src: '/img/me/draing2.jpeg', alt: 'Drawing 2', ratio: 1852 / 1960, rotation: -90 },
	{ src: '/img/me/paragliding%201.jpg', alt: 'Paragliding over a green valley', ratio: 1080 / 607 },
	{ src: '/img/me/helmet.jpg', alt: 'Wearing a helmet', ratio: 1904 / 1908 }
];

export const row2 = [
	{ src: '/img/me/mirrorimg%201.jpg', alt: 'Mirror selfie', ratio: 627 / 607 },
	{ src: '/img/me/drawing%201.jpg', alt: 'Hand-drawn swan sketch', ratio: 680 / 637 },
	{ src: '/img/me/animerain%201.jpg', alt: 'Illustration of a girl looking up in the rain', ratio: 1 },
	{ src: '/img/me/kitten.jpg', alt: 'Two kittens cuddling outdoors', ratio: 736 / 981 }
];

export const row3 = [
	{ src: '/img/me/dmbl.jpg', alt: 'Holding a dumbbell at the gym', ratio: 810 / 1080 },
	{
		src: '/img/me/pencil%201.jpg',
		alt: 'Pencil portrait sketch',
		ratio: 632 / 850,
		position: 'center 80%'
	},
	{ src: '/img/me/im%20fine%201.jpg', alt: '"I’m fine" flaming-skeleton sticker', ratio: 444 / 593 },
	{ src: '/img/me/love%201.jpg', alt: 'Illustration of a person hugging themselves', ratio: 632 / 611 }
];
