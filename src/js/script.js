import { getAllProducts } from './services.js';

document.addEventListener('DOMContentLoaded', async () => {
  const products = await getAllProducts();
});
