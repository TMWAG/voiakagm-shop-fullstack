'use client';
import Link from "next/link";

export const UserPanel = () => {
  return (
    <div className="flex items-center">
      <Link
        href='/login'
        className="text-lg"
      >
        Войти
      </Link>
    </div>
  );
};