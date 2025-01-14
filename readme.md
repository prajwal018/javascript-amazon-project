# Amazon Project

## Overview

This project is a simplified version of an e-commerce platform similar to Amazon. It includes functionalities such as product listing, cart management, order processing, and tracking.

## Project Structure

The project is organized into several directories, each serving a specific purpose:

- **data/**: Contains data models and functions for handling products, cart, and orders.
- **scripts/**: Contains JavaScript files for rendering different parts of the application.
- **styles/**: Contains CSS files for styling the application.
- **tests/**: Contains test files for ensuring the functionality of the application.

## Key Files and Directories

### data/

- `products.js`: Manages product data and provides functions to load and retrieve products.
- `cart.js`: Manages the shopping cart, including adding, removing, and updating items.
- `order.js`: Manages order data, including saving and retrieving orders from local storage.

### scripts/

- `amazon.js`: Entry point for the main page, responsible for loading products and rendering the product grid.
- `checkout.js`: Entry point for the checkout page, responsible for rendering the checkout header, order summary, and payment summary.
- `orderDetails.js`: Handles rendering of the orders page, including order details and product grid.
- `trackPackage.js`: Handles rendering of the package tracking page.

### styles/

- `general.css`: Contains general styles shared across the application.
- `amazon-header.css`: Styles specific to the header section of the application.
- `checkout.css`: Styles specific to the checkout page.
- `orders.css`: Styles specific to the orders page.

### tests/

- `jasmine-5.1.1/`: Contains Jasmine library files for running tests.
- `moneyTest.js`: Tests for utility functions related to money formatting.
- `cartTest.js`: Tests for cart functionalities.
- `orderSummaryTest.js`: Tests for rendering the order summary.

## How to Run

1. Clone the repository.
2. Open `index.html` in a web browser to view the main page.
3. Open `checkout.html` to view the checkout page.
4. Open `orders.html` to view the orders page.
5. Open `tracking.html` to view the package tracking page.

## Testing

The project uses Jasmine for testing. To run the tests, open `tests/tests.html` in a web browser.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contributing

We welcome contributions to improve this project. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Contact

For any questions or feedback, please open an issue or contact the project maintainers.

## Acknowledgements

We would like to thank all the contributors and the open-source community for their support and contributions.

## Badges

![GitHub issues](https://img.shields.io/github/issues/prajwal018/javascript-amazon-project)
![GitHub forks](https://img.shields.io/github/forks/prajwal018/javascript-amazon-project)
![GitHub stars](https://img.shields.io/github/stars/prajwal018/javascript-amazon-project)
![GitHub license](https://img.shields.io/github/license/prajwal018/javascript-amazon-project)

## Authors

- **Your Name** - _Initial work_ - [prajwal018](https://github.com/prajwal018)

See also the list of [contributors](https://github.com/prajwal018/javascript-amazon-project/contributors) who participated in this project.
