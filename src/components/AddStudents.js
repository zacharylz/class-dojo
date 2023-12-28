import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Select from "react-select";

const AddStudents = ({
  title,
  studentFilter,
  setStudentFilter,
  studentOptions,
  addStudentsDropdown,
  setAddStudentsDropdown,
  selectedStudents,
  setSelectedStudents,
}) => {
  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="text-lg font-semibold text-zinc-700">{title}</div>
      {/* Student Name Filter */}
      <input
        className={classNames({
          "w-[300px] border border-zinc-300 rounded-[4px] p-[6px]": true,
          "focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-indigo-500": true,
        })}
        type="text"
        name="studentFilter"
        placeholder="Filter students in dropdown"
        value={studentFilter}
        onChange={(e) => setStudentFilter(e.target.value)}
      />
      {/* Student dropdown select */}
      <Select
        className="w-[300px]"
        isMulti
        name="addStudents"
        closeMenuOnSelect={false}
        placeholder="Select students"
        options={studentOptions}
        value={addStudentsDropdown}
        onChange={(e) => {
          setAddStudentsDropdown(e);
        }}
      />
      {/* Add students to selected students */}
      <button
        className={classNames({
          "w-[300px] rounded-[4px] py-[6px] px-4 cursor-pointer": true,
          "bg-zinc-50 text-green-600 font-semibold border-green-400 border": true,
          " hover:ring-1 hover:ring-inset hover:ring-green-400": true,
          // "bg-green-600 text-zinc-50 font-semibold": true,
        })}
        onClick={() => {
          const studentsToAdd = addStudentsDropdown.map((student) => {
            return { studentId: student.value, studentName: student.label };
          });
          setSelectedStudents([...selectedStudents, ...studentsToAdd]);
          setAddStudentsDropdown([]);
        }}
      >
        Add selected students
      </button>
      {/* Display selected students */}
      <div className="flex flex-col gap-1 p-2 border w-[300px] h-28 overflow-auto border-zinc-300 rounded-[4px]">
        {selectedStudents.length ? (
          selectedStudents.map((student) => (
            <div className="flex w-full">
              <div className="w-4/5 overflow-hidden">{student.studentName}</div>
              <button
                className="w-1/5 items-center hover:font-bold"
                onClick={() => {
                  setSelectedStudents(
                    selectedStudents.filter(
                      (selectedStudent) =>
                        !(selectedStudent.studentId === student.studentId)
                    )
                  );
                }}
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <div className="text-zinc-500">No students added</div>
        )}
      </div>
    </div>
  );
};

export default AddStudents;
