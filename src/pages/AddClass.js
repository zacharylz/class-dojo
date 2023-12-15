import React, { useState } from "react";
import classNames from "classnames";
import Select from "react-select";
import { useClasses } from "../contexts/classContext";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const AddClass = () => {
  const [subjectOptions, setSubjectOptions] = useState([
    { value: "Art", label: "Art" },
    { value: "History", label: "History" },
    { value: "English", label: "English" },
    { value: "Math", label: "Math" },
  ]);
  const [gradeOptions, setGradeOptions] = useState([
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
  ]);
  const { allStudents } = useClasses();
  const [studentOptions, setStudentOptions] = useState(
    allStudents.map((student) => {
      return { value: student.studentId, label: student.studentName };
    })
  );

  const [selectedName, setSelectedName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedStudents, setSelectedStudents] = useState("");

  const handleSubmit = () => {
    console.log(
      "Name",
      selectedName,
      "Subject",
      selectedSubject,
      "Grade",
      selectedGrade,
      "Students",
      selectedStudents
    );
  };

  return (
    <div className="flex flex-col w-full justify-center">
      <div
        className={classNames({
          "flex w-full h-[57px] px-3 items-center gap-2": true,
          "border-b border-b-zinc-200": true,
          "text-zinc-700 font-semibold text-xl": true,
        })}
      >
        <Link
          className="hover:underline hover:text-zinc-600 cursor-pointer"
          to="/classes"
        >
          Classes
        </Link>
        <ChevronRightIcon className="w-5 h-5 mt-1" />
        <div>Add Class</div>
      </div>
      {/* Add Class Form */}
      <div className="flex flex-col max-w-screen-xl w-full mx-auto gap-4 p-6">
        <div className="flex flex-col gap-2 items-start">
          <div className="text-lg font-semibold text-zinc-700 w-[100px]">
            Class Name
          </div>
          {/* Name Input */}
          <input
            className={classNames({
              "w-[300px] border border-zinc-300 rounded-[4px] p-[6px] ": true,
              "focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-indigo-500": true,
            })}
            type="text"
            name="selectedName"
            placeholder="Enter a name"
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
          />
        </div>
        {/* Subject Input */}
        <div className="flex flex-col gap-2 items-start">
          <div className="text-lg font-semibold text-zinc-700 w-[100px]">
            Subject:
          </div>
          <Select
            className="w-[300px]"
            name="selectedSubject"
            placeholder="Select Subject"
            options={subjectOptions}
            onChange={(e) => setSelectedSubject(e.value)}
          />
        </div>
        {/* Grade Input */}
        <div className="flex flex-col gap-2 items-start">
          <div className="text-lg font-semibold text-zinc-700 w-[100px]">
            Grade:
          </div>
          <Select
            className="w-[300px]"
            name="selectedGrade"
            placeholder="Select Grade"
            options={gradeOptions}
            onChange={(e) => setSelectedGrade(e.value)}
          />
        </div>
        {/* Student Input */}
        <div className="flex flex-col gap-2 items-start">
          <div className="text-lg font-semibold text-zinc-700 w-[100px]">
            Students:
          </div>
          <Select
            className="w-[300px]"
            isMulti
            name="selectedStudents"
            placeholder="Select Students"
            options={studentOptions}
            onChange={(e) =>
              setSelectedStudents(e.map((option) => option.value))
            }
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddClass;
