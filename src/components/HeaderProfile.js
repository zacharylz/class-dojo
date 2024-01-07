import React from "react";
import { useClasses } from "../contexts/classContext";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const HeaderProfile = () => {
  const { currentTeacher, logout, loginWithRedirect, isAuthenticated } =
    useClasses();

  return (
    <div className="flex items-center gap-x-2 text-base font-normal text-zinc-700">
      <UserCircleIcon className="w-6 h-6" />
      {currentTeacher && currentTeacher.full_name}
    </div>
  );
};

export default HeaderProfile;
