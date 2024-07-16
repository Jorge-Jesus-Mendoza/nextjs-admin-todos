"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

interface Props {
  title: string;
  url: string;
  Icon: React.ReactNode;
}

export const SideBarItem = ({ Icon, url, title }: Props): React.ReactNode => {
  const actualPath = usePathname();
  return (
    <li>
      <Link
        href={url}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl
          hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white
          ${
            actualPath === url
              ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
              : ""
          }`}
      >
        {Icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
