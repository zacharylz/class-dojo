import React, { useEffect, useState } from "react";
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
  const [studentFilter, setStudentFilter] = useState("");

  const [selectedName, setSelectedName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [addStudentsDropdown, setAddStudentsDropdown] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState("");

  useEffect(()=> {
    const selectedStudentsIds = selectedStudents ? selectedStudents.map((student) => student.studentId) : [];
    const filteredStudents = allStudents.filter((student) => student.studentName.toLowerCase().includes(studentFilter.toLowerCase()) && !(selectedStudentsIds.includes(student.studentId)))
    setStudentOptions(filteredStudents.map((student) => {
      return { value: student.studentId, label: student.studentName };
    }))
  }, [studentFilter,selectedStudents]);

  

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
          {/* Student Name Filter */}
          <input
            className={classNames({
              "w-[300px] border border-zinc-300 rounded-[4px] p-[6px]": true,
              "focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-indigo-500": true,
            })}
            type="text"
            name="studentFilter"
            placeholder="Filter students by name"
            value={studentFilter}
            onChange={(e) => setStudentFilter(e.target.value)}
          />
          {/* Student dropdown select */}
          <Select
            className="w-[300px]"
            isMulti
            name="addStudents"
            placeholder="Add Students"
            options={studentOptions}
            value={addStudentsDropdown}
            onChange={(e) =>{
              setAddStudentsDropdown(e);
            }
            }
          />
          {/* Add students to selected students */}
          <button 
            className="border"
            onClick={() => {
            const studentsToAdd = addStudentsDropdown.map((student) => {return {studentId: student.value, studentName: student.label}})
            setSelectedStudents([...selectedStudents, ...studentsToAdd]);
            setAddStudentsDropdown([]);
            }}
          >Add Students</button>
          {/* Display selected students */}
          <div className="flex flex-col gap-1 p-2 border w-[300px] h-28 overflow-auto">
            {selectedStudents.map((student) => (
            <div className="flex w-full">
              <div className="w-4/5 overflow-hidden">{student.studentName}</div>
              <button 
                className="w-1/5 items-center border" 
                onClick={() => {setSelectedStudents(selectedStudents.filter((selectedStudent) => !(selectedStudent.studentId === student.studentId)))}}
              >
                ✕
              </button>
            </div>
            ))}
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddClass;
