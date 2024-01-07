import React, { useState, useEffect } from "react";
import classNames from "classnames";
import HomeCard from "../components/HomeCard";
import { BookOpenIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useAuth0 } from "@auth0/auth0-react";
import { useClasses } from "../contexts/classContext";
import HeaderProfile from "../components/HeaderProfile";

const Home = () => {
  // const {
  //   user,
  //   isAuthenticated,
  //   loginWithRedirect,
  //   logout,
  //   getAccessTokenSilently,
  // } = useAuth0();

  const {
    accessToken,
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
    currentTeacher,

    allStudents,
    allTeachers,
    allClasses,
    allSubjects,
    allSkills,
    allClassSkills,
  } = useClasses();

  return (
    <div className="flex flex-col max-h-screen min-h-screen overflow-y-scroll">
      {/* <div className="w-full min-h-[57px]"></div> */}
      <div
        className={classNames({
          "flex justify-between w-full sticky top-0 z-10 min-h-[57px] px-3 items-center gap-2": true,
          "border-b border-b-zinc-200 bg-white": true,
          "text-zinc-700 font-semibold text-xl": true,
        })}
      >
        Home
        <HeaderProfile />
      </div>
      <div className="grid grid-cols-4 mx-auto max-w-screen-lg w-full justify-between items-center px-4 py-8 gap-y-8">
        <HomeCard
          path="/classes"
          text="All Classes"
          icon={<BookOpenIcon className="w-10 h-10" />}
        />
        <HomeCard
          path="/classes/add-class"
          text="Add new Class"
          icon={<PlusCircleIcon className="w-10 h-10" />}
        />
      </div>
      {/* <button onClick={() => loginWithRedirect()}>Log in</button>
      <button onClick={() => logout()}>Log out</button>
      <button onClick={() => console.log(isAuthenticated, user, accessToken)}>
        LOG USER
      </button>
      <button onClick={() => console.log(allTeachers)}>LOG TEACHER</button>
      <button onClick={() => console.log(accessToken)}>LOG</button> */}
    </div>
  );
};

export default Home;
