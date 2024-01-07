import classNames from "classnames";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [collapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      className={classNames({
        // 👇 use grid layout
        "grid min-h-screen max-w-full": true,
        // 👇 toggle the width of the sidebar depending on the state
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        // 👇 transition animation classes
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      {/* sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
      />
      {/* content */}
      <div className=""> {children}</div>
    </div>
  );
};
export default Layout;
