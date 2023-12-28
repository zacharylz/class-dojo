import React from "react";
import classNames from "classnames";

const SkillCard = ({
  classSkill,
  skillScore,
  selectedSkill,
  setSelectedSkill,
}) => {
  return (
    <div
      onClick={() => {
        selectedSkill === classSkill
          ? setSelectedSkill("")
          : setSelectedSkill(classSkill);
      }}
      className={classNames({
        "flex flex-col items-center justify-between w-24 h-32 rounded-md p-4 cursor-pointer": true,
        "border border-zinc-400": true,
        "ring-2 ring-inset ring-indigo-500":
          classSkill.skillId === selectedSkill.skillId,
      })}
    >
      <div className="text-center">{classSkill.skillName}</div>
      <div className="text-xl font-bold text-zinc-600">{skillScore}</div>
    </div>
  );
};

export default SkillCard;
