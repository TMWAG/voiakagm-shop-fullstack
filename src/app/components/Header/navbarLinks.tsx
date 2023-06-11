import VoiakaGMSVG from "@/common/icons/VoiakaGMSVG";

export interface INavbarLink {
  href: string;
  content: JSX.Element | string;
}

export const navbarLinks: INavbarLink[] = [
  {
    href: '/',
    content: <VoiakaGMSVG />,
  },
  {
    href: '/catalogue',
    content: 'Каталог',
  },
  {
    href: '/sales',
    content: 'Акции',
  },
  {
    href: '/services',
    content: 'Услуги',
  },
  {
    href: '/how_to_buy',
    content: 'Как купить',
  },
  {
    href: '/contacts',
    content: 'Контакты',
  },
  {
    href: '/recommendations',
    content: 'Рекомендации',
  },
];
