import React, { useEffect, useState, useMemo } from "react";
// import { useParams } from "react-router";
import classNames from "classnames";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useClasses } from "../contexts/classContext";
import { Link, useParams } from "react-router-dom";
import { useTable, useFilters } from "react-table";
import { useNavigate } from "react-router";

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

  const columns = useMemo(
    () => [
      {
        Header: "Register",
        accessor: "register",
      },
      {
        Header: "Name",
        accessor: "studentName",
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
        <div>{currentClass.className}</div>
      </div>
      {/* Filters and Utility */}
      <div className="flex justify-start items-center p-4 gap-6">
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
      </div>
      {/* Table */}
      <table className="table-auto w-[98%] mx-auto" {...getTableProps()}>
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
