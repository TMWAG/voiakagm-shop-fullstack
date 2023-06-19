import { Links } from "./Links";
import { UserPanel } from "./UserPanel";
import { navbarLinks } from "./navbarLinks";

export const Navbar = () => {
  return (
    <nav className="mx-32 mt-6 mb-4 w-full h-9 flex justify-between items-center">
      <Links links={navbarLinks}/>
      <UserPanel />
    </nav>
  );
};