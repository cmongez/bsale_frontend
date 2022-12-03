const URL = 'https://bsale-backend-ic8a.onrender.com';

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

    await renderCards(response);
  } catch (error) {
    console.log('Error =>:', error);
  }
};

//Renders
//Render cards
const renderCards = async (productsData) => {
  //Render modal

  let modalContainer = document.getElementById('modalContainer');

  modalContainer.innerHTML = '';

  modalContainer.innerHTML = `

  
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Aviso de la gerencia</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal"
                      aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  A todos nuestros clientes le informamos que nuestra pagina esta en construccion. Siganos en nuestros cañales de informacion para enterarse cuando se encuentre disponible
                  Nuestras sinceras disculpas. 
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-sale bg-bsale text-white"
                      data-bs-dismiss="modal">Cerrar</button>
              </div>
          </div>
      </div>
  </div>`;

  let containerCards = document.querySelector('#productsContainer');
  containerCards.innerHTML = '';

  //Cards

  productsData.forEach((product) => {
    containerCards.innerHTML += `
  <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
    <div class="card h-100">
        <div class="card-img-container"> <img src="${
          product.url_image == '' || product.url_image == null ? `./src/img/img-not-available.png` : product.url_image
        }" class="card-img-top" alt="..."></div>
        <div class="card-body d-flex flex-column justify-content-end">
            <p class="card-title">${product.name}</p>
            ${
              product.discount > 0
                ? `
            <div class="card-price d-flex justify-content-between">
                <div class="d-inline">
                <span class="old-price">$${product.price}</span>
                <span>$${((100 - product.discount) * product.price) / 100}
                </span>
                </div>
                <span class="sale">OFERTA -${product.discount}% </span>
            </div>`
                : `<div class="card-price" >$${product.price}</div>`
            }
            <a type="button"  class="btn btn-bsale bg-bsale  text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Comprar
            </a>
        </div>
    </div>
</div>`;
  });
};

//Render navbar
const renderCategories = async (categories) => {
  let containerNav = document.getElementById('navCategories');
  containerNav.innerHTML = `
  <li class="nav-item btn-nav">
  <a class="nav-link text-white" onclick="getAllProductsNav()" href="#">
    todos los productos
  </a>
  </li>`;
  categories.forEach((category) => {
    containerNav.innerHTML += `

  <li class="nav-item btn-nav">
  <a class="nav-link text-white" onclick="getCategory(${category.id})" id="${category.id}" href="#">${category.name}</a>
  </li>`;
  });
};

//Search realtime
let inputSearch = document.getElementById('inputSearch');
let btnSearch = document.getElementById('btnSearch');
inputSearch.addEventListener('keyup', (event) => {
  searchProductos(event.target.value);
});
btnSearch.addEventListener('click', (event) => {
  searchProductos(inputSearch.value);
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
