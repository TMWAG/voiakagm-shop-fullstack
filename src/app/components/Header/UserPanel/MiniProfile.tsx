'use client';

import { useRouter } from "next/navigation";

export default function MiniProfile() {
  const router = useRouter();
  const onLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    fetch('/api/auth/logout', { method: 'GET' })
    .then(() => router.refresh());
  };
  return (
    <div
      className="w-96 h-[40rem]"
    >
      <button
        className="border-violet-500 rounded-sm border-2"
        onClick={onLogout}
      >
        logout
      </button>
    </div>
  );
}