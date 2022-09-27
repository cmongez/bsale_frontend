import { getAllProducts, getAllCategories } from './services.js';

const URL = 'https://bsale-backend-cesar-mongez.herokuapp.com';

document.addEventListener('DOMContentLoaded', async () => {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  await renderCards(products);
  await renderCategories(categories);
});

let inputSearch = document.getElementById('inputSearch');
inputSearch.addEventListener('keyup', (event) => {
  searchProductos(event.target.value);
});

const renderCards = async (productsData) => {
  let containerCards = document.querySelector('#productsContainer');
  containerCards.innerHTML = '';
  productsData.forEach((product) => {
    containerCards.innerHTML += `<div class="col-sm-5 col-md-3 col-lg-2 mb-4 card">
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
const renderCategories = async (categories) => {
  console.log(categories);
  let containerNav = document.getElementById('navCategories');
  containerNav.innerHTML = `
  <li class="nav-item">
  <a class="nav-link" href="#">
    Todos los productos
  </a>
  </li>`;

  categories.forEach((category) => {
    containerNav.innerHTML += ` 

  <li class="nav-item">
  <a class="nav-link" id="${category.id}" href="#">${category.name}</a>
  </li>`;
  });
};

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

const getCategory = async (category = '') => {
  try {
    const request = await fetch(`${URL}/v1/categories/${category}`);
    const response = await request.json();
    await renderCards(response);
  } catch (error) {
    console.log('Error =>:', error);
  }
};
