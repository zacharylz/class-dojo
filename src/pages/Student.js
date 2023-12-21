import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useClasses } from "../contexts/classContext";
import classNames from "classnames";
import SkillCard from "../components/SkillCard";
import FeedbackDetails from "../components/FeedbackDetails";

const Student = () => {
  const { classId, studentId } = useParams();
  const { classes, allStudents } = useClasses();
  const [currentClass, setCurrentClass] = useState(
    classes.find((classObj) => classObj.classId === parseInt(classId))
  );
  const [currentStudent, setCurrentStudent] = useState(
    allStudents.find(
      (studentObj) => studentObj.studentId === parseInt(studentId)
    )
  );
  const [selectedSkill, setSelectedSkill] = useState("");

  const [classSkills, setClassSkills] = useState([
    { skillId: 1, skillName: "Critical Thinking" },
    { skillId: 2, skillName: "Effort" },
    { skillId: 3, skillName: "Helping Others" },
  ]);

  const [studentFeedback, setStudentFeedback] = useState([
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
  ]);

  const [teachers, setTeachers] = useState([
    { teacherId: 1, teacherName: "Teacher Name1" },
    { teacherId: 2, teacherName: "Teacher Name2" },
  ]);

  const sumScore = (skillId, feedbackArr) => {
    let score = 0;
    for (let feedback of feedbackArr) {
      if (feedback.skillId === skillId) {
        score += feedback.skillValue;
      }
    }
    return score;
  };

  return (
    <div className="flex flex-col w-full">
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
        <Link
          className="hover:underline hover:text-zinc-600 cursor-pointer"
          to={`/class/${classId}`}
        >
          {currentClass.className}
        </Link>
        <ChevronRightIcon className="w-5 h-5 mt-1" />
        <div>{currentStudent.studentName}</div>
      </div>
      {/* Skill Cards */}
      <div className="flex max-w-screen-xl w-full mx-auto gap-8 p-8">
        {classSkills.map((classSkill) => {
          return (
            <SkillCard
              classSkill={classSkill}
              skillScore={sumScore(classSkill.skillId, studentFeedback)}
              selectedSkill={selectedSkill}
              setSelectedSkill={setSelectedSkill}
            />
          );
        })}
      </div>
      {/* Feedback Details */}
      <div
        className={classNames({
          "flex flex-col max-w-screen-lg w-full mx-auto": true,
        })}
      >
        {studentFeedback
          .filter((feedback) => feedback.skillId === selectedSkill)
          .map((feedback) => (
            <FeedbackDetails feedback={feedback} teachers={teachers} />
          ))}
      </div>
    </div>
  );
};

export default Student;
