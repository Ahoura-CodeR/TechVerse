let request;

// Fetches the dataset once and shares the result between all components.
export function getProducts() {
  request ??= fetch("Data/products.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load products.");
      return response.json();
    })
    .then((data) => data.products ?? [])
    .catch((error) => {
      console.error(error);
      request = undefined; // let the next call retry
      return [];
    });

  return request;
}
