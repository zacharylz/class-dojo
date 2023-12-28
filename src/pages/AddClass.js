import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Select from "react-select";
import { useClasses } from "../contexts/classContext";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import AddStudents from "../components/AddStudents";

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
  const [skillOptions, setSkillOptions] = useState([
    { value: 1, label: "Critical Thinking" },
    { value: 2, label: "Effort" },
    { value: 3, label: "Helping Others" },
  ]);
  const { allStudents } = useClasses();
  const [studentOptions, setStudentOptions] = useState(
    allStudents.map((student) => {
      return { value: student.studentId, label: student.studentName };
    })
  );
  const [studentFilter, setStudentFilter] = useState("");

  const [selectedName, setSelectedName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [addStudentsDropdown, setAddStudentsDropdown] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const selectedStudentsIds = selectedStudents
      ? selectedStudents.map((student) => student.studentId)
      : [];
    const filteredStudents = allStudents.filter(
      (student) =>
        student.studentName
          .toLowerCase()
          .includes(studentFilter.toLowerCase()) &&
        !selectedStudentsIds.includes(student.studentId)
    );
    setStudentOptions(
      filteredStudents.map((student) => {
        return { value: student.studentId, label: student.studentName };
      })
    );
  }, [studentFilter, selectedStudents]);

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
    <div className="flex flex-col w-full max-h-screen min-h-screen overflow-y-scroll">
      <div className="w-full min-h-[57px]"></div>
      <div
        className={classNames({
          "flex w-full fixed h-[57px] px-3 items-center gap-2": true,
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
      <div className="flex justify-evenly max-w-screen-lg w-full mx-auto p-6">
        <div className="flex flex-col gap-4">
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
          {/* Skill Input */}
          <div className="flex flex-col gap-2 items-start">
            <div className="text-lg font-semibold text-zinc-700 w-[100px]">
              Skills:
            </div>
            <Select
              className="w-[300px]"
              isMulti
              closeMenuOnSelect={false}
              name="selectedSkills"
              placeholder="Select Skills"
              options={skillOptions}
              value={selectedSkills}
              onChange={(e) => setSelectedSkills(e)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {/* Student Input */}
          <AddStudents
            title="Students:"
            studentFilter={studentFilter}
            setStudentFilter={setStudentFilter}
            studentOptions={studentOptions}
            addStudentsDropdown={addStudentsDropdown}
            setAddStudentsDropdown={setAddStudentsDropdown}
            selectedStudents={selectedStudents}
            setSelectedStudents={setSelectedStudents}
          />

          <button
            className={classNames({
              "w-[300px] rounded-[4px] py-[6px] px-4 mt-1 cursor-pointer": true,
              "bg-green-600 text-zinc-50 font-semibold": true,
            })}
            onClick={handleSubmit}
          >
            Create Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
