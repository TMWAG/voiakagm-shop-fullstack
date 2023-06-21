'use client';
import React, { useState } from "react";

export default function Hoverable({
  item,
  children,
  childrenClassName,
}: {
  item: string | JSX.Element,
  children: JSX.Element,
  itemClassName?: string | undefined,
  childrenClassName?: string | undefined,
}) {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseOver = () => {
    setIsHovering(true);
  };
  const onMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      {item}
      {isHovering &&
        <div
          className={`absolute animate-[showHidden_0.1s_ease-in-out_1] opacity-100 duration-300 ${childrenClassName}`}
        >
          {children}
        </div>
      }
    </div>
  );
}