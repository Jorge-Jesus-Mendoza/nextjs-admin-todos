import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiBookmarkCheck, CiLogout } from "react-icons/ci";
import {
  IoBasketOutline,
  IoCalendar,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPerson,
  IoPersonOutline,
} from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SideBarItem } from "./SideBarItem";
import { LogOutButton } from "./LogOutButton";

export const SideBar = async (): Promise<React.JSX.Element> => {
  const session = await getServerSession(authOptions);
  const mockData = [
    { url: "/dashboard", title: "Dashboard", Icon: <IoCalendarOutline /> },
    {
      url: "/dashboard/rest-todos",
      title: "Rest TODOS",
      Icon: <IoCheckboxOutline />,
    },
    {
      url: "/dashboard/server-todos",
      title: "Server Actions",
      Icon: <IoListOutline />,
    },
    {
      url: "/dashboard/cookies",
      title: "Cookies",
      Icon: <IoCodeWorkingOutline />,
    },
    {
      url: "/dashboard/products",
      title: "Productos",
      Icon: <IoBasketOutline />,
    },
    {
      url: "/dashboard/profile",
      title: "Perfil",
      Icon: <IoPersonOutline />,
    },
  ];
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="test"
              width={150}
              height={150}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={
              session?.user?.image ||
              "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
            }
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            alt="test"
            width={150}
            height={150}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session?.user?.name}
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {mockData.map((item, key) => (
            <SideBarItem key={key} {...item} />
          ))}
        </ul>
      </div>

      <LogOutButton />
    </aside>
  );
};
