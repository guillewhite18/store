import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export function fetchProducts() {
  return api.get('/products');
}

export function fetchProductsByCategory(category) {
  if (category) {
    return api.get(`/products/category/${category}`);
  } else {
    return fetchProducts();
  }
}
