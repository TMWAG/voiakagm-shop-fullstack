export interface IModalLinks {
  href: string;
  content: string; 
}

export const links: IModalLinks[] = [{
  href: '/login',
  content: 'Войти',
}, {
  href: '/register',
  content: 'Регистрация',
}];