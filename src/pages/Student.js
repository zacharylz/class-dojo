import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useClasses } from "../contexts/classContext";
import classNames from "classnames";
import SkillCard from "../components/SkillCard";
import FeedbackDetails from "../components/FeedbackDetails";
import FeedbackForm from "../components/FeedbackForm";

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

  const [studentProfile, setStudentProfile] = useState([
    { label: "Parent/Guardian:", content: "Parent Name" },
    { label: "Email:", content: "placeholder@gmail.com" },
    { label: "Phone:", content: "+1 234567890" },
  ]);

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

  const [newFeedbackDetails, setNewFeedbackDetails] = useState("");
  const [newFeedbackScore, setNewFeedbackScore] = useState("");

  const submitFeedback = () => {
    console.log(selectedSkill, newFeedbackDetails, newFeedbackScore);
    setNewFeedbackDetails("");
    setNewFeedbackScore([]);
  };

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
        <Link
          className="hover:underline hover:text-zinc-600 cursor-pointer"
          to={`/class/${classId}`}
        >
          {currentClass.className}
        </Link>
        <ChevronRightIcon className="w-5 h-5 mt-1" />
        <div>{currentStudent.studentName}</div>
      </div>
      {/* Profile and Skill Cards */}
      <div className="flex max-w-screen-lg w-full mx-auto">
        {/* Profile */}
        <div className="flex flex-col w-1/3 px-4 pt-8 pb-4 gap-4">
          <div className="text-2xl font-semibold text-zinc-700">
            {currentStudent.studentName}
          </div>
          {studentProfile.map((item) => {
            return (
              <div className="flex flex-col">
                <div className="font-semibold text-zinc-500">{item.label}</div>
                <div className="text-lg">{item.content}</div>
              </div>
            );
          })}
        </div>
        {/* Skill Cards */}
        <div className="w-2/3 gap-6 pt-8 pb-4 px-4 grid grid-cols-5">
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
      </div>
      <div className="flex max-w-screen-lg w-full mx-auto">
        {/* Feedback Form and Details */}
        <div className="flex flex-col w-1/3 p-4 gap-2">
          <div className="text-xl font-semibold text-zinc-700">
            {selectedSkill
              ? `Current Skill: ${selectedSkill.skillName}`
              : "Select a Skill"}
          </div>
          <div className="mb-2">
            {selectedSkill &&
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non ex mi. Maecenas posuere dui quis lectus lobortis vulputate."}
          </div>
          {selectedSkill && (
            <FeedbackForm
              selectedSkill={selectedSkill}
              newFeedbackDetails={newFeedbackDetails}
              setNewFeedbackDetails={setNewFeedbackDetails}
              newFeedbackScore={newFeedbackScore}
              setNewFeedbackScore={setNewFeedbackScore}
              submitFeedback={submitFeedback}
            />
          )}
        </div>
        <div className="flex flex-col w-2/3 p-4">
          {/* Feedback Form */}

          {/* Feedback Details */}
          {studentFeedback
            .filter((feedback) => feedback.skillId === selectedSkill.skillId)
            .map((feedback) => (
              <FeedbackDetails feedback={feedback} teachers={teachers} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Student;
