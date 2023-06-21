export interface IRegisterDataItem {
  error: string;
  valid: boolean;
  value: string;
};

export interface IAuthObject {
  access_token: string;
  id: number;
  isActive: boolean;
  name: string;
  role: 'USER' | 'SUPERVISOR' | 'ADMIN';
}

export interface ICategoryItem {
  id: number;
  name: string;
  picture: string | null;
}

export interface IProductItem {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  discount: number | null;
  description: string;
  amount: number | null;
  sold: number;
  used: boolean;
  category: { name: string };
  vendor: { name : string };
  pictures: { filename: string }[];
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