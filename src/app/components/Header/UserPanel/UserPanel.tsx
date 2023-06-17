import person from '@/common/icons/person.svg';
import Image from "next/image";
import Hoverable from '@/components/UI/Hoverable';
import AuthPopup from './AuthPopup/AuthPopup';
import { cookies } from 'next/headers';
import MiniProfile from './MiniProfile';

export const UserPanel = () => {
  
  return (
    <div className="flex items-center relative">
      <Hoverable
        item={
          <Image
            className='border-2 rounded-full border-black'
            src={person}
            alt=''
            width={32}
          />
        }
        childrenClassName='end-0 top-0 rounded-2xl border-2 border-violet-500 bg-white'
      >
        {cookies().has('authToken')
          ?<MiniProfile/>
          :<AuthPopup/>
        }
      </Hoverable>
    </div>
  );
};