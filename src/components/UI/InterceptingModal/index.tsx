'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

interface IModalLinks {
  href: string;
  content: string;
}

export default function InterceptingModal({
  children,
  links,
}: {
  children: React.ReactNode;
  links?: IModalLinks[];
}){
  const overlay = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlay.current)
      if (onDismiss !== undefined) onDismiss();
  }, [onDismiss, overlay]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onDismiss();
  }, [onDismiss]);

  useEffect(()=> {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const pathname = usePathname();
  
  return (
    <div
      ref={overlay}
      className="fixed top-0 left-0 z-10 w-full h-full backdrop-blur-sm antialiased"
      onClick={onClick}
    >
      <div
        className="absolute flex flex-col items-center top-2/4 left-2/4 h-3/5 w-2/5 -translate-x-2/4 -translate-y-2/4 rounded-md border-2 border-violet-500 shadow-violet-600/90 shadow-2xl"
      >
        {links && 
          <nav className="flex h-9 w-full justify-around items-center">
            {links?.map((l) => {
              const isActive = pathname.startsWith(l.href);
              return(
                <Link
                  className={`${isActive ? 'border-transparent' : 'border-violet-500'} block w-1/2 p-1 text-center text-lg border-r-2 border-l-2 border-b-2 first:border-l-0 last:border-r-0`}
                  href={l.href}
                  key={l.href}
                  replace
                >
                  {l.content}
                </Link>
              );
            })}
          </nav>
        }
        {children}
      </div>
    </div>
  );
};