import React, { useState, useMemo } from "react";
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

  const { classes } = useClasses();

  const MultiSelectFilter = (rows, column, filterValue) => {
    return filterValue.length === 0
      ? rows
      : rows.filter((row) => filterValue.includes(row.values[column]));
  };

  const columns = useMemo(
    () => [
      {
        Header: "Class Name",
        accessor: "className",
      },
      {
        Header: "Subject",
        accessor: "subjectName",
        filter: MultiSelectFilter,
      },
      {
        Header: "Grade",
        accessor: "grade",
        filter: MultiSelectFilter,
      },
      {
        Header: "Owner",
        accessor: "owner",
      },
      {
        Header: "Co-teachers",
        accessor: "coTeachers",
        // Cell: ({value}) => value.map((item)=> <div className="border">{item}</div>)
        Cell: ({value}) => value.join(", ")
      },
    ],
    []
  );

  const subjectOptions = [
    { value: "Art", label: "Art" },
    { value: "History", label: "History" },
    { value: "English", label: "English" },
    { value: "Math", label: "Math" },
  ];

  const gradeOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];

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
      data: classes,
    },
    useFilters,
    useSortBy // SORT
  );

  return (
    <div className="flex flex-col w-full justify-center">
      <div
        className={classNames({
          "flex w-full h-[57px] px-3 items-center": true,
          "border-b border-b-zinc-200": true,
          "text-zinc-700 font-semibold text-xl": true,
        })}
      >
        Classes
      </div>
      {/* Filters and Buttons*/}
      <div className="flex justify-start items-center p-4 gap-6">
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
            setFilter("className", e.target.value);
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
              "subjectName",
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
        {/* Add Classes Button */}
        <Link
          className={classNames({
            "rounded-[4px] py-[6px] px-4 cursor-pointer": true,
            "bg-green-600 text-zinc-50 font-semibold": true,
          })}
          to="/classes/add-class"
        >
          Add Class +
        </Link>
      </div>
      {/* Table */}
      <table className="table-auto w-[98%] mx-auto" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="py-2 text-left font-semibold text-zinc-700"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span className="inline-block whitespace-pre w-6 text-sm">{column.isSorted ? column.isSortedDesc ? ' ▼' : ' ▲' : '  '}</span>
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
                onClick={() => navigate(`/class/${row.original.classId}`)}
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
