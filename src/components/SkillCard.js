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
        selectedSkill.id === classSkill.id
          ? setSelectedSkill("")
          : setSelectedSkill(classSkill);
      }}
      className={classNames({
        "flex flex-col items-center justify-between w-30 h-32 m-4 rounded-md py-4 px-2 cursor-pointer": true,
        "border border-zinc-400": true,
        "ring-2 ring-inset ring-indigo-500": classSkill.id === selectedSkill.id,
      })}
    >
      <div className="max-w-full text-center text-sm text-wrap text-ellipsis overflow-hidden">
        {classSkill.skill_name}
      </div>
      <div className="text-xl font-bold text-zinc-600">{skillScore}</div>
    </div>
  );
};

export default SkillCard;
