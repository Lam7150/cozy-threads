// MOCK API ENDPOINT USING JSON DB
const fetchProducts = async () => {
  const response = await fetch(`./consts/consts.products.json`, {});

  if (!response.ok) {
    throw new Error('A network error occurred');
  }

  return response.json();
};

export { fetchProducts };
