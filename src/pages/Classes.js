import React, { useState, useEffect, useMemo } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Select from "react-select";
import { useClasses } from "../contexts/classContext";

const Classes = () => {
  const navigate = useNavigate();
  const [nameFilter, setNameFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");

  const { allClasses } = useClasses();

  const MultiSelectFilter = (rows, column, filterValue) => {
    return filterValue.length === 0
      ? rows
      : rows.filter((row) => filterValue.includes(row.values[column]));
  };

  const columns = useMemo(
    () => [
      {
        Header: "Class Name",
        accessor: "class_name",
      },
      {
        Header: "Subject",
        accessor: "subject_name",
        filter: MultiSelectFilter,
      },
      {
        Header: "Grade",
        accessor: "grade",
        filter: MultiSelectFilter,
      },
    ],
    []
  );

  const [subjectOptions, setSubjectOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);

  useEffect(() => {
    const classSubjects = [
      ...new Set(allClasses.map((classObj) => classObj.subject_name)),
    ];

    const classGrades = [
      ...new Set(allClasses.map((classObj) => classObj.grade)),
    ];

    setSubjectOptions(
      classSubjects
        .map((subject) => {
          return { value: subject, label: subject };
        })
        .sort((a, b) => {
          if (a.value < b.value) {
            return -1;
          } else if (a.value === b.value) {
            return 0;
          } else {
            return 1;
          }
        })
    );
    setGradeOptions(
      classGrades
        .map((grade) => {
          return { value: grade, label: grade };
        })
        .sort((a, b) => {
          return a.value - b.value;
        })
    );
  }, [allClasses]);

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
      data: allClasses,
    },
    useFilters,
    useSortBy // SORT
  );

  return (
    <div className="flex flex-col max-h-screen min-h-screen overflow-y-scroll">
      <div className="flex w-auto">
        <div
          className={classNames({
            "flex w-full sticky top-0 z-10 min-h-[57px] px-3 items-center gap-2": true,
            "border-b border-b-zinc-200 bg-white": true,
            "text-zinc-700 font-semibold text-xl": true,
          })}
        >
          Classes
        </div>
      </div>
      {/* Filters and Buttons*/}
      <div className="flex w-full mx-auto max-w-screen-xl justify-between items-center p-4">
        <div className="flex justify-start items-center gap-6">
          {/* Name Filter */}
          <input
            className={classNames({
              "w-[200px] border border-zinc-300 rounded-[4px] p-[6px] ": true,
              "focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-indigo-500": true,
            })}
            type="text"
            name="nameFilter"
            placeholder="Search Class Name"
            value={nameFilter}
            onChange={(e) => {
              setFilter("class_name", e.target.value);
              setNameFilter(e.target.value);
            }}
          />
          {/* Subject Filter */}
          <Select
            className="w-[300px]"
            isMulti
            name="subjectFilter"
            placeholder="Select Subjects"
            options={subjectOptions}
            onChange={(e) =>
              setFilter(
                "subject_name",
                e.map((option) => option.value)
              )
            }
          />
          {/* Grade Filter */}
          <Select
            className="w-[250px]"
            isMulti
            name="gradeFilter"
            placeholder="Select Grades"
            options={gradeOptions}
            onChange={(e) =>
              setFilter(
                "grade",
                e.map((option) => option.value)
              )
            }
          />
        </div>
        {/* Add Classes Button */}
        <Link
          className={classNames({
            " w-[150px] rounded-[4px] py-[6px] px-4 cursor-pointer text-center": true,
            "bg-green-600 text-zinc-50 font-semibold": true,
          })}
          to="/classes/add-class"
        >
          Add Class +
        </Link>
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
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span className="inline-block whitespace-pre w-6 text-sm">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " ▼"
                        : " ▲"
                      : "  "}
                  </span>
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
                onClick={() => {
                  // console.log(row.original);
                  // setCurrentClass(row.original);
                  navigate(`/class/${row.original.id}`);
                }}
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

export default Classes;
