import { Links } from "./Links";
import { UserPanel } from "./UserPanel/UserPanel";
import { navbarLinks } from "./navbarLinks";

export const Navbar = () => {
  return (
    <nav className="pt-6 pb-4 w-full h-9 flex justify-around items-center">
      <Links links={navbarLinks}/>
      <UserPanel />
    </nav>
  );
};