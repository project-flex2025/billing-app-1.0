"use client";
import { useRouter } from "next/navigation";

type NavbarProps = {
  menuItems: object;
};

const HorizontalNavbar = ({ menuItems }: any) => {
  const router = useRouter();

  return (
    <nav className="p-4 w-full bg-white shadow-md">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Navigation</h2>
      <ul className="flex justify-start space-x-3">
        {menuItems?.map((item: any, index: any) => (
          <li
            key={index}
            onClick={() => router.push(`${item.name.replace(/\s/g, "")}`)}
            className="px-4 py-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium shadow-sm cursor-pointer transition"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HorizontalNavbar;
