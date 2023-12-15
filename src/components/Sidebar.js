import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  HomeIcon,
  UserCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  const NavItems = [
    {
      label: "Home",
      link: "/",
      icon: <HomeIcon className="w-6 h-6" />,
    },
    {
      label: "Profile",
      link: "/profile",
      icon: <UserCircleIcon className="w-6 h-6" />,
    },
    {
      label: "Classes",
      link: "/classes",
      icon: <BookOpenIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div
      className={classNames({
        "bg-indigo-700 text-zinc-50 z-20": true,
        // "absolute min-h-screen": true,
      })}
    >
      <div
        className={classNames({
          "flex flex-col justify-between": true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={classNames({
            "flex items-center border-b border-b-indigo-800": true,
            "px-4 py-2 justify-between": !collapsed,
            "py-2 justify-center": collapsed,
          })}
        >
          {!collapsed && (
            <div className="whitespace-nowrap font-semibold text-lg">
              Class Dojo
            </div>
          )}
          <button
            className={classNames({
              "grid place-content-center": true, // position
              "hover:bg-indigo-800 ": true, // colors
              "w-10 h-10 rounded-full": true, // shape
            })}
            // 👇 set the collapsed state on click
            onClick={() => setCollapsed()}
          >
            <Icon className="w-5 h-5" />
          </button>
        </div>
        {/* default nav links */}
        <div className="my-2 flex flex-col gap-2 items-stretch">
          {NavItems.map((item) => {
            return (
              <Link
                to={item.link}
                className={classNames({
                  "text-indigo-100 hover:bg-indigo-900 flex": true,
                  "transition duration-300": true,
                  "rounded-md p-2 mx-3 gap-4": !collapsed,
                  "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                })}
              >
                <div className="flex gap-4">
                  {item.icon} <div>{!collapsed && item.label}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
