import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminNavLinks from "./components/AdminNavLinks";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}){
  if(cookies().get('user-role')?.value !== 'ADMIN') {
    redirect('/');
  }
  return (
    <div className="w-2/3">
      <span className="mt-11 mb-5 block text-2xl">Администрирование</span>
      <AdminNavLinks/>
      {children}
    </div>
  );
}