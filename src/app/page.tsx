import promo_placeholder from '../../public/promo_placeholder.png';
import Image from "next/image";
import MiniCatalogue from './components/MiniCatalogue';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 mt-24">
      <Image
        src={promo_placeholder}
        alt=''
      />
      {/* <MiniCatalogue/> */}
    </div>
  );
}
