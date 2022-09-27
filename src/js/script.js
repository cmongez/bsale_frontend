const URL = 'https://bsale-backend-cesar-mongez.herokuapp.com';

document.addEventListener('DOMContentLoaded', async () => {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  await renderCards(products);
  await renderCategories(categories);
});

//Get data from api

const getAllProducts = async () => {
  try {
    const request = await fetch(`${URL}/v1/products/`);
    const response = await request.json();
    return response;
  } catch (error) {
    console.log('Error =>:', error);
  }
};

const getAllProductsNav = async () => {
  try {
    const products = await getAllProducts();
    await renderCards(products);
  } catch (error) {
    console.log('Error: ', error);
  }
};

const getAllCategories = async () => {
  try {
    const request = await fetch(`${URL}/v1/categories/`);
    const response = await request.json();
    return response;
  } catch (error) {
    console.log('Error =>:', error);
  }
};

const getCategory = async (id) => {
  try {
    const request = await fetch(`${URL}/v1/products/category/${id}`);
    const response = await request.json();
    await console.log(response);
    await renderCards(response);
  } catch (error) {
    console.log('Error =>:', error);
  }
};

//Renders
//Render cards
const renderCards = async (productsData) => {
  let containerCards = document.querySelector('#productsContainer');
  containerCards.innerHTML = '';
  productsData.forEach((product) => {
    containerCards.innerHTML += `
  <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
    <div class="card h-100">
        <div class="card-img-container"> <img src="${
          product.url_image == '' || product.url_image == null ? `./src/img/img-not-available.png` : product.url_image
        }" class="card-img-top" alt="..."></div>
        <div class="card-body d-flex flex-column justify-content-end">
            <h5 class="card-title">${product.name}</h5>
            ${
              product.discount > 0
                ? `
            <div class="card-price">
                <span>$${((100 - product.discount) * product.price) / 100}
                </span>
                <span>$${product.price}</span>
            </div>`
                : `<div>$${product.price}</div>`
            }
            <a href="#" class="btn btn-bsale text-white">Comprar</a>
        </div>
    </div>
</div>`;
  });
};

//Render navbar
const renderCategories = async (categories) => {
  let containerNav = document.getElementById('navCategories');
  containerNav.innerHTML = `
  <li class="nav-item">
  <a class="nav-link" onclick="getAllProductsNav()" href="#">
    Todos los productos
  </a>
  </li>`;
  categories.forEach((category) => {
    containerNav.innerHTML += `

  <li class="nav-item">
  <a class="nav-link" onclick="getCategory(${category.id})" id="${category.id}" href="#">${category.name}</a>
  </li>`;
  });
};

//Search realtime
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
