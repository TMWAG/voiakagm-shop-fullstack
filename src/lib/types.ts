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