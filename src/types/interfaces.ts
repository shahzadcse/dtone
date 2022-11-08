export interface Product {
  id: number;
  qty: number;
}

export interface DisplayCart {
  name: string;
  price: number;
  currency: string;
  qty: number;
  id: number;
}

export interface Cart {
  cid: string;
  products: Array<Product>;
}
