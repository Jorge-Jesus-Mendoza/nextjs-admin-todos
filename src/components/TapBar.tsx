"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TapBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}: Props) => {
  const [selected, setSelected] = useState(currentTab);

  const router = useRouter();

  const onSelect = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
    router.refresh();
  };

  return (
    <div
      className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 grid-cols-4`}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            type="radio"
            id="1"
            className="peer hidden"
            checked={selected === tab}
            onChange={() => {}}
          />
          <label
            onClick={() => onSelect(tab)}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            1
          </label>
        </div>
      ))}
    </div>
  );
};
