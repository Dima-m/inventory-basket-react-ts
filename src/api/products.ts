interface Products {
  limit: number;
  total: number;
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  category?: string;
}

const fetchProducts = (limit = 5): Promise<Products> =>
  fetch(`https://dummyjson.com/products?limit=${limit}`).then((res) =>
    res.json()
  );

const fetchSingleProduct = (id: number): Promise<Products> =>
  fetch(`https://dummyjson.com/products/${id}`).then((res) => res.json());

export { fetchProducts, fetchSingleProduct };
