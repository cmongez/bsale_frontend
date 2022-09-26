import { getAllProducts } from './services.js';

const URL = 'https://bsale-backend-cesar-mongez.herokuapp.com';

document.addEventListener('DOMContentLoaded', async () => {
  const products = await getAllProducts();
  await renderCards(products);
});

const renderCards = async (productsData) => {
  const container = document.querySelector('#productsContainer');
  container.innerHTML = '';
  productsData.forEach((product) => {
    container.innerHTML += `<div class="col-sm-5 col-md-3 col-lg-2 mb-4 card">
  <img src="${
    product.url_image == '' || product.url_image == null ? `./src/img/img-not-available.png` : product.url_image
  }" 
      class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">$ ${product.price}</p>
      <a href="#" class="btn btn-primary">Comprar</a>
  </div>
</div>`;
  });
};

let inputSearch = document.getElementById('inputSearch');
inputSearch.addEventListener('keyup', (event) => {
  searchProductos(event.target.value);
});

const searchProductos = async (inputValue) => {
  try {
    const request = await fetch(`${URL}/v1/products/${inputValue}`);
    const response = await request.json();
    await renderCards(response);
    return response;
  } catch (error) {
    console.log('Error =>:', error);
  }
};
