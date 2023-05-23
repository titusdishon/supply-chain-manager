import { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import {
  RiDashboardFill,
  RiTeamFill,
  RiProductHuntFill,
  RiFileListFill,
  RiShoppingCartFill,
  RiLogoutBoxRFill,
  RiHome8Fill,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface Menu {
  title: string;
  icon: any;
  onClick: (path: string) => void;
  path: string;
}
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const logout = (path: string) => {
    localStorage.clear();
    navigate(`/${path}`);
  };
  const routeChange = (path: string) => {
    navigate(`/home${path}`);
  };
  const Menus: Menu[] = [
    {
      title: "Home",
      icon: RiHome8Fill,
      onClick: (path: string) => routeChange(path),
      path: "",
    },
    {
      title: "Products",
      icon: RiProductHuntFill,
      onClick: (path: string) => routeChange(path),
      path: "/products",
    },
    {
      title: "Orders",
      icon: RiShoppingCartFill,
      onClick: (path: string) => routeChange(path),
      path: "/orders",
    },
    {
      title: "Inventory",
      icon: RiFileListFill,
      onClick: (path: string) => routeChange(path),
      path: "/inventory",
    },
    {
      title: "Users",
      icon: RiTeamFill,
      onClick: (path: string) => routeChange(path),
      path: "/users",
    },
    {
      title: "Logout",
      icon: RiLogoutBoxRFill,
      onClick: (path: string) => logout(path),
      path: "",
    },
  ];

  return (
    <div
      className={`bg-dark-purple h-screen p-5 pt-8 ${
        open ? "w-72" : "w-20"
      } relative duration-300`}
      data-testid="sidebar"
    >
      <BsArrowLeftShort
        data-testid="arrow-icon"
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
          <li
            key={index}
            className={`text-grey-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 transition-all duration-300 ${
              !open && "w-10"
            }`}
            onClick={() => menu.onClick(menu.path)}
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
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
