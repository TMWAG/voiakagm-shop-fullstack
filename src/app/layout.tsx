import { Header } from './components/Header';
import './globals.css';
import localFont from 'next/font/local';

const SFProDisplay = localFont({
  src: '../common/fonts/SF-Pro-Display-Regular.otf',
}); 

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout( props: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={SFProDisplay.className}>
        <Header />
        {props.children}
      </body>
    </html>
  );
}
