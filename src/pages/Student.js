import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useClasses } from "../contexts/classContext";
import classNames from "classnames";
import SkillCard from "../components/SkillCard";
import FeedbackDetails from "../components/FeedbackDetails";
import FeedbackForm from "../components/FeedbackForm";
import { giveStudentsFeedback } from "../api/backend";

const Student = () => {
  const { classId, studentId } = useParams();
  const {
    allClasses,
    currentClass,
    setCurrentClass,
    allStudents,
    allSkills,
    allClassSkills,
    currentClassFeedback,
    currentClassTeachers,
    currentTeacher,
    setRefreshData,
    refreshData,
    accessToken,
  } = useClasses();
  const [classSkills, setClassSkills] = useState([]);
  const [currentStudent, setCurrentStudent] = useState([]);
  const [currentStudentFeedback, setCurrentStudentFeedback] = useState([]);

  useEffect(() => {
    const currentClassData = allClasses.find((classData) => {
      return classData.id === parseInt(classId);
    });
    const classSkillData = allClassSkills.filter((skillData) => {
      return skillData.class_id === currentClassData.id;
    });
    setCurrentClass(currentClassData);
    setClassSkills(
      classSkillData.map((classSkill) => {
        return { ...classSkill, skill_name: allSkills[classSkill.skill_id] };
      })
    );
    setCurrentStudent(
      allStudents.find((studentObj) => {
        return studentObj.id === parseInt(studentId);
      })
    );
    currentClassFeedback.length != 0 &&
      setCurrentStudentFeedback(
        currentClassFeedback.find((student) => {
          return student.id === parseInt(studentId);
        }).recent_feedback
      );
    // setCurrentStudentFeedback(
    //   currentClassFeedback.find((student) => {
    //     return student.student_id === parseInt(studentId);
    //   }).recent_feedback
    // );
  }, [allClasses, currentClass, currentClassFeedback]);

  const [studentProfile, setStudentProfile] = useState([
    { label: "Parent/Guardian:", content: "Parent Name" },
    { label: "Email:", content: "placeholder@gmail.com" },
    { label: "Phone:", content: "+1 234567890" },
  ]);

  const [selectedSkill, setSelectedSkill] = useState("");

  const sumScore = (skillId, feedbackArr) => {
    let score = 0;
    for (let feedback of feedbackArr) {
      if (feedback.skill_id === skillId) {
        score += feedback.skills_value;
      }
    }
    return score;
  };

  const [newFeedbackDetails, setNewFeedbackDetails] = useState("");
  const [newFeedbackScore, setNewFeedbackScore] = useState("");

  const submitFeedback = async () => {
    if (
      !currentClassTeachers
        .map((teacher) => teacher.id)
        .includes(currentTeacher.id)
    ) {
      alert("You are not assigned to this class.");
    } else {
      await giveStudentsFeedback(
        currentStudent.id,
        currentClass.id,
        currentTeacher.id,
        selectedSkill.skill_id,
        newFeedbackDetails,
        newFeedbackScore.value,
        accessToken
      );
      setNewFeedbackDetails("");
      setNewFeedbackScore([]);
      setRefreshData(refreshData + 1);
    }
  };

  return (
    <div className="flex flex-col w-full max-h-screen min-h-screen overflow-y-scroll">
      {/* <div className="w-full min-h-[57px]"></div> */}
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
        <Link
          className="hover:underline hover:text-zinc-600 cursor-pointer"
          to={`/class/${classId}`}
        >
          {currentClass && currentClass.class_name}
        </Link>
        <ChevronRightIcon className="w-5 h-5 mt-1" />
        <div>{currentStudent && currentStudent.full_name}</div>
      </div>
      {/* Profile and Skill Cards */}
      <div className="flex max-w-screen-lg w-full mx-auto border-b border-zinc-200">
        {/* Profile */}
        <div className="flex flex-col px-4 pt-8 pb-4 gap-4">
          <div className="text-2xl font-semibold text-zinc-700">
            {currentStudent && currentStudent.full_name}
          </div>
          <button onClick={() => console.log(currentClassFeedback)}>LOG</button>
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
        <div className="grow gap-2 py-4 px-4 grid grid-cols-4">
          {classSkills.map((classSkill) => {
            return (
              <SkillCard
                classSkill={classSkill}
                skillScore={sumScore(
                  classSkill.skill_id,
                  currentStudentFeedback
                )}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
              />
            );
          })}
        </div>
      </div>
      <div className="flex max-w-screen-lg w-full mx-auto">
        {/* Feedback Form and Details */}
        {selectedSkill ? (
          <>
            <div className="flex flex-col w-1/3 p-4 gap-2 overflow-hidden">
              <div className="text-xl font-semibold text-zinc-700">
                Current Skill: {selectedSkill.skill_name}
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
              {currentStudentFeedback.filter(
                (feedback) => feedback.skill_id === selectedSkill.skill_id
              ).length ? (
                currentStudentFeedback
                  .filter(
                    (feedback) => feedback.skill_id === selectedSkill.skill_id
                  )
                  .map((feedback) => (
                    <FeedbackDetails feedback={feedback} teachers />
                  ))
              ) : (
                <div className="text-lg font-semibold text-zinc-700 mt-4 mx-auto">
                  No Previous Feedback
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-xl font-semibold text-zinc-700 mt-4 mx-auto">
            Select a Skill
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
