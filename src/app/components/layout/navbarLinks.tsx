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
    href: '/info',
    content: 'Инфо',
  },
  {
    href: '/recommendations',
    content: 'Рекомендации',
  },
];
