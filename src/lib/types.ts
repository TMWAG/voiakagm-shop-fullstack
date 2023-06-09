export interface IValidateableTextInput {
  error: string;
  valid: boolean;
  value: any;
};

export interface ICategoryItem {
  id: number;
  name: string;
  picture: string | null;
}

export interface IVendorItem {
  id: number;
  name: string;
  picture: string | null;
}

export interface IProductInfo {
  id: number;
  name: string;
  vendorId: number;
  categoryId: number;
  price: number;
  discount: number | null;
  description: string;
  amount: number;
  sold: number;
  used: boolean;
  category: {
    id: number;
    name: string;
    picture: string | null;
  };
  vendor: {
    id: number;
    name: string;
  };
  pictures: { filename: string }[];
  characteristics: {
    parameter: { name: string };
    value: string;
  }[];
}