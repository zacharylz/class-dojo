import React, { useEffect, useState, useMemo } from "react";
// import { useParams } from "react-router";
import classNames from "classnames";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useClasses } from "../contexts/classContext";
import { Link, useParams } from "react-router-dom";
import { useTable, useFilters } from "react-table";
import { useNavigate } from "react-router";
import AddStudents from "../components/AddStudents";
import Select from "react-select";

const ClassPage = () => {
  const { classId } = useParams();
  const { classes, allStudents } = useClasses();
  const [currentClass, setCurrentClass] = useState(
    classes.find((classObj) => classObj.classId === parseInt(classId))
  );

  const navigate = useNavigate();

  const [nameFilter, setNameFilter] = useState("");

  const [students, setStudents] = useState(
    allStudents.filter((studentObj) =>
      [2, 7, 14].includes(studentObj.studentId)
    )
  );

  useEffect(() => {
    const metrics = {};

    const studentFeedback = [
      {
        skillId: 1,
        teacherId: 1,
        skillValue: 2,
        feedbackDetails: "Able to handle new types of problems",
        feedbackDate: "placeholder date",
      },
      {
        skillId: 2,
        teacherId: 1,
        skillValue: -2,
        feedbackDetails: "Occasionally loses focus in class",
        feedbackDate: "placeholder date",
      },
      {
        skillId: 3,
        teacherId: 1,
        skillValue: 1,
        feedbackDetails: "Showed willingness to help classmate",
        feedbackDate: "placeholder date",
      },
      {
        skillId: 2,
        teacherId: 1,
        skillValue: 1,
        feedbackDetails: "Test Details 1",
        feedbackDate: "placeholder date",
      },
      {
        skillId: 1,
        teacherId: 1,
        skillValue: 0,
        feedbackDetails: "Test Details 2",
        feedbackDate: "placeholder date",
      },
      {
        skillId: 1,
        teacherId: 1,
        skillValue: 3,
        feedbackDetails: "Test Details 3",
        feedbackDate: "placeholder date",
      },
    ];
    for (let feedback of studentFeedback) {
      feedback.skillId in metrics
        ? (metrics[feedback.skillId] += feedback.skillValue)
        : (metrics[feedback.skillId] = feedback.skillValue);
    }
    let netScore = 0;
    let negativeSkills = 0;

    for (let value of Object.values(metrics)) {
      netScore += value;
      negativeSkills = value < 0 ? (negativeSkills += 1) : negativeSkills;
    }

    metrics.netScore = netScore;
    metrics.negativeSkills = negativeSkills;

    setStudents(
      students.map((student) => {
        return {
          ...student,
          netScore: metrics.netScore,
          negativeSkills: metrics.negativeSkills,
        };
      })
    );
  }, []);

  const [addCoteachersStudentsBool, setAddCoteachersStudentsBool] =
    useState(false);

  const [addCoteacherOptions, setAddCoteacherOptions] = useState([
    { value: "Teacher5", label: "Teacher5" },
    { value: "Teacher6", label: "Teacher6" },
    { value: "Teacher7", label: "Teacher7" },
  ]);
  const [addCoteacherDropdown, setAddCoteacherDropdown] = useState([]);

  const [addStudentOptions, setAddStudentOptions] = useState([]);
  const [addStudentFilter, setAddStudentFilter] = useState("");
  const [addStudentDropdown, setAddStudentDropdown] = useState([]);
  const [addStudentSelected, setAddStudentSelected] = useState([]);

  useEffect(() => {
    const studentsForDropdown = allStudents.filter(
      (student) =>
        student.studentName
          .toLowerCase()
          .includes(addStudentFilter.toLowerCase()) &&
        !students
          .map((currStudent) => currStudent.studentId)
          .includes(student.studentId)
    );
    setAddStudentOptions(
      studentsForDropdown.map((student) => {
        return { value: student.studentId, label: student.studentName };
      })
    );
  }, [addStudentFilter]);

  const submitAddStudents = () => {
    console.log(addStudentSelected);
  };

  const submitAddCoteachers = () => {
    const selectedCoteachers = addCoteacherDropdown.map((coteacher) => {
      return { teacherId: coteacher.value, teacherName: coteacher.label };
    });
    console.log(selectedCoteachers);
    setAddCoteacherDropdown([]);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "studentName",
      },
      {
        Header: "Net Score",
        accessor: "netScore",
      },
      {
        Header: "Negative Skills",
        accessor: "negativeSkills",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data: students,
    },
    useFilters
  );

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
        <div>{currentClass.className}</div>
      </div>
      {/* Filters and Utility */}
      <div className="flex max-w-screen-xl w-[98%] mx-auto justify-between items-center py-4 gap-6">
        {/* Name Filter */}
        <input
          className={classNames({
            "w-[200px] border border-zinc-300 rounded-[4px] p-[6px] ": true,
            "focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-indigo-500": true,
          })}
          type="text"
          name="nameFilter"
          placeholder="Search Student Name"
          value={nameFilter}
          onChange={(e) => {
            setFilter("studentName", e.target.value);
            setNameFilter(e.target.value);
          }}
        />
        {/* Add students button */}
        <button
          className={classNames({
            "rounded-[4px] py-[6px] px-4 cursor-pointer": true,
            "bg-green-600 text-zinc-50 font-semibold": true,
            "bg-green-700 ring-1 ring-inset ring-green-800":
              addCoteachersStudentsBool,
          })}
          onClick={() => {
            setAddCoteachersStudentsBool(!addCoteachersStudentsBool);
          }}
        >
          Add Students / Co-teachers +
        </button>
      </div>
      {/* Add students or co-teachers */}
      <div
        className={classNames({
          "flex flex-col w-full items-center justify-center": true,
          "bg-zinc-200": true,
          "transition-all duration-50 ease-in-out": true,
          "h-[0px]": !addCoteachersStudentsBool,
          "h-[400px]": addCoteachersStudentsBool,
        })}
      >
        {addCoteachersStudentsBool && (
          <div className="flex p-2 gap-6 bg-white rounded-sm">
            {/* <div className="flex w-full max-w-screen-lg justify-evenly border"> */}
            <div className="flex flex-col gap-2 px-2 pb-2">
              <AddStudents
                title="Add students:"
                studentFilter={addStudentFilter}
                setStudentFilter={setAddStudentFilter}
                studentOptions={addStudentOptions}
                addStudentsDropdown={addStudentDropdown}
                setAddStudentsDropdown={setAddStudentDropdown}
                selectedStudents={addStudentSelected}
                setSelectedStudents={setAddStudentSelected}
              />
              <button
                className={classNames({
                  "w-[300px] rounded-[4px] py-[6px] px-4 cursor-pointer": true,
                  "bg-green-600 text-zinc-50 font-semibold": true,
                })}
                onClick={submitAddStudents}
              >
                Add Students to Class
              </button>
            </div>
            <div className="flex flex-col gap-2 px-2 pb-6">
              <div className="text-lg font-semibold text-zinc-700">
                Add co-teachers:
              </div>
              <Select
                className="w-[300px]"
                isMulti
                name="addCoteachers"
                closeMenuOnSelect={false}
                placeholder="Select Co-teachers"
                options={addCoteacherOptions}
                value={addCoteacherDropdown}
                onChange={(e) => {
                  setAddCoteacherDropdown(e);
                }}
              />
              <button
                className={classNames({
                  "w-[300px] rounded-[4px] py-[6px] px-4 cursor-pointer": true,
                  "bg-green-600 text-zinc-50 font-semibold": true,
                })}
                onClick={submitAddCoteachers}
              >
                Add Co-teachers to Class
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Table */}
      <table
        className="table-auto w-[98%] max-w-screen-xl mx-auto"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="py-2 text-left font-semibold text-zinc-700"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="hover:bg-zinc-100"
                onClick={() =>
                  navigate(`/class/${classId}/${row.original.studentId}`)
                }
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="py-2 px-4 border-y border-collapse border-zinc-200"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClassPage;
