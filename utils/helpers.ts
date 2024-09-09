import type { Product } from '@/utils/types';

export function convertJsonToProduct(jsonObject: any): Product {
  return {
    id: Number(jsonObject.id),
    title: jsonObject.title,
    price: Number(jsonObject.price),
    quantity: Number(jsonObject.quantity),
    image: jsonObject.image,
    description: jsonObject.description
  };
}
