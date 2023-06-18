'use client';

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function MiniProfile() {
  const router = useRouter();
  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      deleteCookie('userId');
      deleteCookie('userName');
      deleteCookie('userRole');
      deleteCookie('isUserActive');
      deleteCookie('authToken');
      router.refresh();
    };
  return (
    <div
      className="w-96 h-[40rem]"
    >
      <button
        className="border-violet-500 rounded-sm border-2"
        onClick={logout}
      >
        logout
      </button>
    </div>
  );
}