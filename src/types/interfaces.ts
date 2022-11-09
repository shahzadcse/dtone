export interface Product {
  id: number;
  name?: string;
  qty: number;
  description?: string;
  type?: string;

  operator?: {
    id: number;
    name: string;
    country: {
      name: string;
      iso_code: string;
      regions: [
        {
          name: string;
          code: string;
        }
      ];
    };
  };
  destination?: {
    unit_type: string;
    unit: string;
    amount: number;
  };
  validity?: {
    unit: string;
    quantity: number;
  };
  benefits?: Array<Benefits>;
  promotions?: Array<Promotions>;
  source?: {
    unit_type: string;
    unit: string;
    amount: number;
  };
}

export interface Benefits {
  type: string;
  unit_type: string;
  unit: string;
  amount: {
    base: number;
    promotion_bonus: number;
    total_excluding_tax: number;
    total_including_tax: number;
  };
  additional_information: string;
}

export interface Balances {
  id: number;
  unit_type: string;
  unit: string;
  available: number;
  holding: number;
  credit_limit: number;
}

export interface Promotions {
  id: number;
  title: string;
  description: string;
  terms: string;
  start_date: string;
  end_date: string;
}

export interface DisplayCart {
  id: number;
  name: string;
  price: number;
  currency: string;
  qty: number;
}

export interface Cart {
  cid: string;
  products: Array<Product>;
}

export interface User {
  username: string;
  password: string;
}
