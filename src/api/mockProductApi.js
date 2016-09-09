import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const products = [
  {
    id: 1,
    title: "GI Joe",
    price: 3.99,
    userId: "cory-house",
    quantity: 19
  },
  {
    id: 2,
    title: "Heman",
    price: 9.99,
    userId: "cory-house",
    quantity: 10
  },
  {
    id: 3,
    title: "Rubix Cube",
    price: 13.99,
    userId: "cory-house",
    quantity: 1
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (product) => {
  return replaceAll(product.title, ' ', '-');
};

export default class ProductApi {
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], products));
      }, delay);
    });
  }

  static saveProduct(product) {
    product = Object.assign({}, product); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minProductTitleLength = 1;
        if (product.title.length < minProductTitleLength) {
          reject(`Title must be at least ${minProductTitleLength} characters.`);
        }

        if (product.id) {
          const existingProductIndex = products.findIndex(a => a.id == product.id);
          products.splice(existingProductIndex, 1, product);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new products in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          product.id = generateId(product);
          products.push(product);
        }

        resolve(Object.assign({}, product));
      }, delay);
    });
  }

  static deleteProduct(productId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('product id is: ', productId);
        const indexOfProductToDelete = products.findIndex(product => {product.id == productId;});
        console.log('index of product to delete: ',indexOfProductToDelete);
        products.splice(indexOfProductToDelete, 1);
        resolve();
      }, delay);
    });
  }
}
