import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import {
  RiDashboardFill,
  RiTeamFill,
  RiProductHuntFill,
  RiFileListFill,
  RiShoppingCartFill,
  RiLogoutBoxRFill,
} from "react-icons/ri";

interface Menu {
  title: string;
  icon: any;
}
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus: Menu[] = [
    {
      title: "Products",
      icon: RiProductHuntFill,
    },
    {
      title: "Orders",
      icon: RiShoppingCartFill,
    },
    {
      title: "Inventory",
      icon: RiFileListFill,
    },
    {
      title: "Users",
      icon: RiTeamFill,
    },
    {
      title: "Logout",
      icon: RiLogoutBoxRFill,
    },
  ];
  return (
    <div
      className={`bg-dark-purple h-screen p-5 pt-8 ${
        open ? "w-72" : "w-20"
      } relative duration-300`}
    >
      <BsArrowLeftShort
        className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />
      <div className="inline-flex">
        <RiDashboardFill
          className={`bg-amber-200 duration-300 text-3xl rounded cursor-pointer block float-left mr-2 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white duration-300 origin-left font-medium text-2xl ${
            !open && "scale-0"
          }`}
        >
          SCM
        </h1>
      </div>

      <ul className="pr-2">
        {Menus.map((menu: Menu, index: number) => (
          <>
            <li
              key={index}
              className={`text-grey-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 ${
                !open && "w-10"
              }`}
            >
              <span className="text-2xl block float-left">
                <menu.icon className={`text-white `} />
              </span>
              <span
                className={`text-base font-medium flex-1 text-white ${
                  !open && "hidden"
                }`}
              >
                {menu.title}
              </span>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
