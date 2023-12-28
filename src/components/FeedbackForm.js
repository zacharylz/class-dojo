import React from "react";
import Select from "react-select";
import classNames from "classnames";

const FeedbackForm = ({
  newFeedbackDetails,
  setNewFeedbackDetails,
  newFeedbackScore,
  setNewFeedbackScore,
  submitFeedback,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full ">
      <div className="text-lg font-semibold text-zinc-700">
        Submit New Feedback
      </div>
      <textarea
        className={classNames({
          "w-[300px] border border-zinc-300 rounded-[4px] p-[6px] resize-none": true,
          "focus:outline-0 focus:ring-1 focus:ring-inset focus:ring-indigo-500": true,
        })}
        type="text"
        rows="2"
        name="newFeedbackDetails"
        placeholder="Enter feedback details"
        value={newFeedbackDetails}
        onChange={(e) => {
          setNewFeedbackDetails(e.target.value);
        }}
      />
      <div className="text-lg font-semibold text-zinc-700">Feedback Score</div>
      <Select
        className="w-[150px]"
        name="newFeedbackScore"
        placeholder="Select Score"
        options={[...Array(11).keys()].map((num) => {
          return { value: num - 5, label: num - 5 };
        })}
        value={newFeedbackScore}
        onChange={(e) => {
          setNewFeedbackScore(e);
        }}
      />
      <button
        className={classNames({
          "w-[300px] rounded-[4px] py-[6px] px-4 mt-2 cursor-pointer": true,
          "bg-green-600 text-zinc-50 font-semibold": true,
        })}
        onClick={submitFeedback}
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackForm;
