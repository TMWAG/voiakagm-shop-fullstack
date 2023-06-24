import person from '@/common/icons/person.svg';
import Image from "next/image";
import Hoverable from '@/components/UI/Hoverable';
import AuthPopup from './AuthPopup';
import landmark from '@/common/icons/landmark.svg';
import cart from '@/common/icons/cart.svg';
import favorites from '@/common/icons/favorites.svg';
import { cookies } from 'next/headers';
import MiniProfile from './MiniProfile';
import Link from 'next/link';
import LogoutButton from './LogoutButton';


export const UserPanel = () => {
  
  return (
    <div className="flex items-center justify-around relative w-64">
      <Link
        href='/contacts'
        className='flex items-center text-violet-500'
      >
        <Image
          src={landmark}
          alt=''
        />
        Пермь 
      </Link>
      <Hoverable
        item={
          <Image
            src={person}
            alt=''
            width={22}
          />
        }
        childrenClassName='end-0 top-0 rounded border-[1px] bg-white'
      >
        {cookies().has('token')
          ?<MiniProfile/>
          :<AuthPopup/>
        }
      </Hoverable>
      {cookies().has('token') &&
        <>
          <Link href='/cart'>
            <Image
              src={cart}
              alt=''
            />
          </Link>
          <LogoutButton/>
          <Link href='/favorites'>
            <Image
              alt=''
              src={favorites}
            />
          </Link>
          {cookies().get('userRole')?.value === 'ADMIN' &&
            <Link href='/admin'>
              admin
            </Link>
          }
        </>
      }
      
    </div>
  );
};