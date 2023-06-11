'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";
import { INavbarLink } from "./navbarLinks";

export const Links = ({
  links,
}: {
  links: INavbarLink[]
}) => {
  const pathname = usePathname();
  return (
    <div className="flex w-1/2 items-baseline justify-between">
      {links.map((l) => {
        const isActive = pathname.startsWith(l.href);
        return (
          <Link
            className={`${isActive && 'text-violet-600'} text-base`}
            href={l.href}
            key={l.href}
          >
            {l.content}
          </Link>
        );
        })}
    </div>
  );
};