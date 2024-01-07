import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Select from "react-select";
import { useClasses } from "../contexts/classContext";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import AddPerson from "../components/AddPerson";
import { createClass } from "../api/backend";
import HeaderProfile from "../components/HeaderProfile";

const AddClass = () => {
  const {
    allStudents,
    allSubjects,
    allSkills,
    currentTeacher,
    refreshData,
    setRefreshData,
    accessToken,
  } = useClasses();
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);

  useEffect(() => {
    setStudentOptions(
      allStudents.map((student) => {
        return { value: student.id, label: student.full_name };
      })
    );

    setSubjectOptions(
      Object.entries(allSubjects).map((subject) => {
        return { value: subject[0], label: subject[1] };
      })
    );
    setSkillOptions(
      Object.entries(allSkills).map((skill) => {
        return { value: skill[0], label: skill[1] };
      })
    );
  }, []);

  const [gradeOptions, setGradeOptions] = useState(
    [...Array(6).keys()].map((num) => {
      return { value: num + 1, label: num + 1 };
    })
  );

  const [selectedName, setSelectedName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSkills, setSelectedSkills] = useState("");
  const [addStudentsDropdown, setAddStudentsDropdown] = useState("");

  const handleSubmit = async () => {
    if (selectedName && selectedSubject && selectedGrade && selectedSkills) {
      const newClass = await createClass(
        selectedName,
        selectedSubject.value,
        selectedGrade.value,
        currentTeacher.id,
        addStudentsDropdown.map((student) => {
          return student.value;
        }),
        selectedSkills.map((skill) => {
          return skill.value;
        }),
        accessToken
      )
        .then(alert("Class created!"))
        .catch((err) => {
          alert("Unable to create class.");
          console.log(err);
        });
      setRefreshData(refreshData + 1);
      setSelectedName("");
      setSelectedSubject([]);
      setSelectedGrade([]);
      setSelectedSkills([]);
      setAddStudentsDropdown([]);
    } else {
      alert("All fields are required.");
    }
  };

  return (
    <div className="flex flex-col w-full max-h-screen min-h-screen overflow-y-scroll">
      <div
        className={classNames({
          "flex w-full justify-between sticky top-0 z-10 min-h-[57px] px-3 items-center gap-2": true,
          "border-b bg-white border-b-zinc-200": true,
          "text-zinc-700 font-semibold text-xl": true,
        })}
      >
        <div className="flex items-center gap-2">
          <Link
            className="hover:underline hover:text-zinc-600 cursor-pointer"
            to="/classes"
          >
            Classes
          </Link>
          <ChevronRightIcon className="w-5 h-5 mt-1" />
          <div>Add Class</div>
        </div>
        <HeaderProfile />
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
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e)}
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
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e)}
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
          <AddPerson
            people="students"
            peopleOptions={studentOptions}
            addPeopleDropdown={addStudentsDropdown}
            setAddPeopleDropdown={setAddStudentsDropdown}
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
