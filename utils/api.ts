// MOCK API ENDPOINT USING JSON DB
const fetchProducts = async () => {
  const response = await fetch(`/products.json`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('A network error occurred');
  }

  return response.json();
};

export { fetchProducts };
