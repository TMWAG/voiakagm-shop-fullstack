import { Header } from './components/Header/Header';
import Categories from './components/Header/Categories';
import Greeting from './components/Header/Greeting';
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
      <body className={`${SFProDisplay.className} flex flex-col `}>
        <Header />
        <main className='flex flex-1 flex-wrap'>
          <Greeting/>
          <Categories/>
          {props.children}
        </main>
      </body>
    </html>
  );
}
