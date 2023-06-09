'use client';

import { useRouter } from "next/navigation";
import logoutIcon from "@/common/icons/logout.svg";
import Image from "next/image";

export default function LogoutButton(){
  const router = useRouter();
  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      fetch('/api/auth/logout')
        .then(() =>router.refresh());
    };
  return (
    <button
      onClick={logout}
    >
      <Image
        alt=""
        src={logoutIcon}
      />
    </button>
  );
};