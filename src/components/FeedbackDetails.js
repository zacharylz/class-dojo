import React from "react";
import classNames from "classnames";

const FeedbackDetails = ({ feedback, teachers }) => {
  const currentTeacher = teachers.find(
    (teacher) => teacher.teacherId === feedback.teacherId
  );

  return (
    <div
      className={classNames({
        "flex w-full py-4 items-center": true,
        "border-b border-zinc-300": true,
      })}
    >
      <div className="flex flex-col w-2/5">
        <div className="text-sm text-zinc-500">
          {currentTeacher.teacherName}, {feedback.feedbackDate}
        </div>
        <div className="pt-2">{feedback.feedbackDetails}</div>
      </div>
      <div
        className={classNames({
          "text-2xl font-semibold p-2 border w-16 rounded-md text-center text-zinc-50": true,
          "bg-green-600": feedback.skillValue > 0,
          "bg-red-600": feedback.skillValue < 0,
          "bg-zinc-500": feedback.skillValue === 0,
        })}
      >
        {feedback.skillValue < 0 ? "-" : "+"}
        {Math.abs(feedback.skillValue)}
      </div>
    </div>
  );
};

export default FeedbackDetails;
