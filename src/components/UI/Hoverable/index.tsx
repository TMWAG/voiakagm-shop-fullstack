'use client';
import useHover from "@/hooks/useHover";
import React, { useRef } from "react";

export default function Hoverable({
  item,
  children,
  childrenClassName,
}: {
  item: string | JSX.Element,
  children: JSX.Element,
  itemClassName?: string | undefined,
  childrenClassName?: string | undefined,
}){
  const ref = useRef<HTMLDivElement | null>(null);
  const hovering = useHover(ref);
  return (
    <div ref={ref}>
      <div className={`relative`}>
        {item}
      </div>
      <div
        className={`${!hovering && 'hidden'} absolute animate-[showHidden_0.1s_ease-in-out_1] opacity-100 duration-300 ${childrenClassName}`}
      >
        {children}
      </div>
    </div>
  );
}