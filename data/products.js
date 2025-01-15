import { formatCurrency } from '../scripts/utils/money.js';

export let products;

export function getProduct(productId) {
	let matchingProduct;

	products.forEach(product => {
		if (product.id === productId) matchingProduct = product;
	});

	return new Product(matchingProduct);
}

export class Product {
	id;
	image;
	name;
	rating;
	priceCents;
	keywords;

	constructor(productDetails) {
		this.id = productDetails.id;
		this.image = productDetails.image;
		this.name = productDetails.name;
		this.rating = productDetails.rating;
		this.priceCents = productDetails.priceCents;
		this.keywords = productDetails.keywords;
	}

	getStarsUrl() {
		return `images/ratings/rating-${this.rating.stars * 10}.png`;
	}

	getPrice() {
		return `$${formatCurrency(this.priceCents)}`;
	}

	extraInfoHtml() {
		return '';
	}
}

class Clothing extends Product {
	sizeChartLink;

	constructor(productDetails) {
		super(productDetails);
		this.sizeChartLink = productDetails.sizeChartLink;
	}

	extraInfoHtml() {
		return `
		<a href="${this.sizeChartLink}" target="_blank" class="size-chart-link link-primary">Size Chart</a>	`;
	}
}

class Appliance extends Product {
	instructionsLink;
	warrantyLink;

	constructor(productDetails) {
		super(productDetails);
		this.instructionsLink = productDetails.instructionsLink;
		this.warrantyLink = productDetails.warrantyLink;
	}

	extraInfoHtml() {
		return `
			<a href="${this.instructionsLink}" target="_blank" class="size-chart-link link-primary">Instructions</a>	
			<a href="${this.warrantyLink}" target="_blank" class="size-chart-link link-primary">Warranty</a>	`;
	}
}

export async function loadProducts() {
	try {
		const response = await fetch('https://supersimplebackend.dev/products');
		const productData = await response.json();
		products = productData.map(productDetails => {
			if (productDetails.type === 'clothing') {
				return new Clothing(productDetails);
			} else if (productDetails.type === 'appliance') {
				return new Appliance(productDetails);
			}
			return new Product(productDetails);
		});
	} catch (error) {
		console.error('Unexpected error. Please try again later.', error);
	}
}
