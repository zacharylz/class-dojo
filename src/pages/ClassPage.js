import React, { useEffect, useState, useMemo } from "react";
import classNames from "classnames";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useClasses } from "../contexts/classContext";
import { Link, useParams } from "react-router-dom";
import { useTable, useFilters } from "react-table";
import { useNavigate } from "react-router";
import AddPerson from "../components/AddPerson";
import { addStudentsToClass, addTeacherToClass } from "../api/backend";
import Select from "react-select";

const ClassPage = () => {
  const { classId } = useParams();
  const {
    allStudents,
    allTeachers,
    allClasses,
    currentClass,
    setCurrentClass,
    currentClassFeedback,
    currentClassTeachers,
    currentTeacher,
    refreshData,
    setRefreshData,
    accessToken,
  } = useClasses();

  useEffect(() => {
    setCurrentClass(
      allClasses.find((classData) => {
        return classData.id === parseInt(classId);
      })
    );
  }, [allClasses]);

  const navigate = useNavigate();

  const [nameFilter, setNameFilter] = useState("");

  const [addCoteachersStudentsBool, setAddCoteachersStudentsBool] =
    useState(false);

  const [addCoteacherOptions, setAddCoteacherOptions] = useState([]);
  const [addCoteacherDropdown, setAddCoteacherDropdown] = useState([]);

  const [addStudentOptions, setAddStudentOptions] = useState([]);
  const [addStudentDropdown, setAddStudentDropdown] = useState([]);

  useEffect(() => {
    const studentsForDropdown = allStudents.filter(
      (student) =>
        !currentClassFeedback
          .map((currStudent) => currStudent.id)
          .includes(student.id)
    );
    setAddStudentOptions(
      studentsForDropdown.map((student) => {
        return { value: student.id, label: student.full_name };
      })
    );
    const teachersForDropdown = allTeachers.filter(
      (teacher) =>
        !currentClassTeachers
          .map((classTeacher) => classTeacher.id)
          .includes(teacher.id)
    );
    setAddCoteacherOptions(
      teachersForDropdown.map((teacher) => {
        return { value: teacher.id, label: teacher.full_name };
      })
    );
  }, []);

  const submitAddStudents = async () => {
    if (
      !currentClassTeachers
        .map((teacher) => teacher.id)
        .includes(currentTeacher.id)
    ) {
      alert("You are not assigned to this class.");
    } else {
      await addStudentsToClass(
        addStudentDropdown.map((student) => {
          return student.value;
        }),
        currentClass.id,
        accessToken
      )
        .then(alert("Students added!"))
        .catch((err) => {
          alert("Unable to add students.");
          console.log(err);
        });
      setAddStudentDropdown([]);
      setRefreshData(refreshData + 1);
    }
  };

  const submitAddCoteachers = async () => {
    if (
      !currentClassTeachers
        .map((teacher) => teacher.id)
        .includes(currentTeacher.id)
    ) {
      alert("You are not assigned to this class.");
    } else {
      await addTeacherToClass(
        currentClass.id,
        addCoteacherDropdown.value,
        accessToken
      )
        .then(alert("Co-teacher added!"))
        .catch((err) => {
          alert("Unable to add co-teacher.");
          console.log(err);
        });
      setAddCoteacherDropdown([]);
      setRefreshData(refreshData + 1);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Student Id",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "full_name",
      },
      {
        Header: "Net Feedback Score",
        accessor: "net_feedback",
      },
      // {
      //   Header: "Negative Skills",
      //   accessor: "negativeSkills",
      // },
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
      data: currentClassFeedback,
    },
    useFilters
  );

  return (
    <div className="flex flex-col w-full max-h-screen min-h-screen overflow-y-scroll">
      <div
        className={classNames({
          "flex w-full sticky top-0 z-10 min-h-[57px] px-3 items-center gap-2": true,
          "border-b border-b-zinc-200 bg-white": true,
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
        <div>{currentClass && currentClass.class_name}</div>
      </div>
      {/* Filters and Utility */}
      <div className="flex max-w-screen-xl w-full mx-auto justify-between items-center p-4 gap-6">
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
            setFilter("full_name", e.target.value);
            setNameFilter(e.target.value);
          }}
        />
        <button onClick={() => console.log(currentTeacher)}>LOG</button>
        {/* <button
          onClick={() =>
            console.log(
              currentClassFeedback.find((student) => {
                return student.id === parseInt("2");
              }).recent_feedback
            )
          }
        >
          LOG
        </button> */}
        {/* Add co-teachers and students button */}
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
      {/* Add students and co-teachers form */}
      <div
        className={classNames({
          "flex flex-col w-full items-center justify-center": true,
          "bg-zinc-200": true,
          "transition-all duration-50 ease-in-out": true,
          "h-[0px]": !addCoteachersStudentsBool,
          "py-2 h-[350px]": addCoteachersStudentsBool,
        })}
      >
        {addCoteachersStudentsBool && (
          <div className="flex p-2 gap-6 bg-white rounded-sm">
            <div className="flex flex-col gap-2 px-2 pb-2">
              <AddPerson
                people="students"
                peopleOptions={addStudentOptions}
                addPeopleDropdown={addStudentDropdown}
                setAddPeopleDropdown={setAddStudentDropdown}
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
            <div className="flex flex-col gap-2 px-2 pb-2">
              {/* <AddPerson
                people="co-teachers"
                peopleOptions={addCoteacherOptions}
                addPeopleDropdown={addCoteacherDropdown}
                setAddPeopleDropdown={setAddCoteacherDropdown}
              /> */}
              <div className="text-lg font-semibold text-zinc-700">
                Add co-teachers:
              </div>
              <Select
                className="w-[300px]"
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
      {currentClassFeedback.length != 0 ? (
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
                    navigate(`/class/${classId}/${row.original.id}`)
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
      ) : (
        <div className="text-xl font-semibold text-zinc-700 mt-8 mx-auto">
          No Students in this Class!
        </div>
      )}
    </div>
  );
};

export default ClassPage;
