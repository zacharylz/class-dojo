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
        "hover:ring-1 hover:ring-inset hover:ring-indigo-500 transition-all duration-300": true,
        "text-zinc-50 font-semibold  bg-indigo-500":
          classSkill.id === selectedSkill.id,
      })}
    >
      <div className="max-w-full text-center text-sm text-wrap text-ellipsis overflow-hidden">
        {classSkill.skill_name}
      </div>
      <div
        className={classNames({
          "text-xl font-bold": true,
          "text-zinc-600": classSkill.id != selectedSkill.id,
          "text-zinc-50": classSkill.id === selectedSkill.id,
        })}
      >
        {skillScore}
      </div>
    </div>
  );
};

export default SkillCard;
