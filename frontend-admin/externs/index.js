/**
 * @typedef {{ _id: string, article: string, cdnImage: string, description: string, image: string, imageContainer: string, imageLocation: string, seo: string, title: string }}
 */
var Category

/**
 * @typedef {{ _id: string, category: string, categorySeo: string, cdnImage: string, description: string, seo: string, title: string, price: string, numberOfPhotos: number }}
 */
var Property

/**
 * @typedef {{ _id: string, href: string, price: string, cdnImage: string, description: string, title: string, show_on_main: string }}
 */
var Special
/**
 * @typedef {{ _id: string, cdnImage: string, description: string, title: string, photos: Array<Photo> }}
 */
var Gallery

/**
 * @typedef {{_id: string, file: string, galleryId: string, width: number, height: number }}
 */
var Photo