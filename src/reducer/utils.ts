import { Product } from '../api/products';

export type BasketProduct = Product & { count: number };

// I've created and planned to use this function to update each product's count in the basket
// But after a consideration I've decided not to go this way because I didn't think this was the right one
// Instead I'm using "/products/{id}" endpoint to fetch unique products each time New button is pressed

export const updatedCount = (list: BasketProduct[]) =>
  list.reduce((acc: BasketProduct[], curr) => {
    const duplicate = acc.find((p) => curr.id === p.id);
    duplicate
      ? (duplicate.count += curr.count)
      : acc.push({ ...curr, count: 1 });
    return acc;
  }, []);
