const URL = 'https://bsale-backend-cesar-mongez.herokuapp.com';

export const getAllProducts = async () => {
  try {
    const request = await fetch(`${URL}/v1/products/`);
    const response = await request.json();
    return response;
  } catch (error) {
    console.log('Error =>:', error);
  }
};
