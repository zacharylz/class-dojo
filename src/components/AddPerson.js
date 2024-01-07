import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Select from "react-select";

const AddPerson = ({
  people,
  peopleOptions,
  addPeopleDropdown,
  setAddPeopleDropdown,
}) => {
  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="text-lg font-semibold text-zinc-700">Add {people}:</div>
      {/* Student dropdown select */}
      <Select
        className="w-[300px]"
        isMulti
        name="addStudents"
        maxMenuHeight={200}
        controlShouldRenderValue={false}
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
        placeholder={`Add ${people}`}
        options={peopleOptions}
        value={addPeopleDropdown}
        onChange={(e) => {
          setAddPeopleDropdown(e);
        }}
      />
      {/* Display selected people */}
      <div className="flex flex-col gap-1 p-2 border w-[300px] h-28 overflow-auto border-zinc-300 rounded-[4px]">
        {addPeopleDropdown.length ? (
          addPeopleDropdown.map((person) => (
            <div className="flex w-full">
              <div className="w-4/5 overflow-hidden">{person.label}</div>
              <button
                className="w-1/5 items-center hover:font-bold"
                onClick={() => {
                  setAddPeopleDropdown(
                    addPeopleDropdown.filter(
                      (selectedPerson) =>
                        !(selectedPerson.label === person.label)
                    )
                  );
                }}
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <div className="text-zinc-500">No {people} added</div>
        )}
      </div>
      {/* <div className="flex flex-col gap-1 p-2 border w-[300px] h-28 overflow-auto border-zinc-300 rounded-[4px]">
        {selectedStudents.length ? (
          selectedStudents.map((person) => (
            <div className="flex w-full">
              <div className="w-4/5 overflow-hidden">{person.studentName}</div>
              <button
                className="w-1/5 items-center hover:font-bold"
                onClick={() => {
                  setSelectedStudents(
                    selectedStudents.filter(
                      (selectedPerson) =>
                        !(selectedPerson.studentId === person.studentId)
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
      </div> */}
    </div>
  );
};

export default AddPerson;
