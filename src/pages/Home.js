import React, { useState, useEffect } from "react";
import classNames from "classnames";
import HomeCard from "../components/HomeCard";
import { BookOpenIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

const Home = () => {
  return (
    <div className="flex flex-col w-full max-h-screen min-h-screen overflow-y-scroll">
      <div className="w-full min-h-[57px]"></div>
      <div
        className={classNames({
          "flex w-full fixed h-[57px] px-3 items-center gap-2": true,
          "border-b border-b-zinc-200 bg-white": true,
          "text-zinc-700 font-semibold text-xl": true,
        })}
      >
        Home
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
    </div>

    // <div className="flex flex-col w-full justify-start items-center">
    //   Home
    //   <div className="flex flex-col border-2">
    //     <button onClick={() => console.log(allStudents)}>
    //       Log all students
    //     </button>
    //     <button onClick={() => console.log(allTeachers)}>
    //       Log all teachers
    //     </button>
    //     <button onClick={() => console.log(allClasses)}>Log all classes</button>
    //     <button onClick={() => console.log(allSubjects)}>
    //       Log all subjects
    //     </button>
    //     <button onClick={() => console.log(allSkills)}>Log all skills</button>
    //     <button onClick={() => console.log(allClassSkills)}>
    //       Log all classSkills
    //     </button>
    //     <button onClick={() => console.log(currentClass)}>
    //       Log currentClass
    //     </button>
    //     <button onClick={() => console.log(currentClassFeedback)}>
    //       Log currentClassFeedback
    //     </button>
    //     <button
    //       onClick={() =>
    //         console.log(
    //           allClassSkills.filter((skillData) => {
    //             return skillData.class_id === currentClass.id;
    //           })
    //         )
    //       }
    //     >
    //       Log find class func
    //     </button>
    //   </div>
    // </div>
  );
};

export default Home;
