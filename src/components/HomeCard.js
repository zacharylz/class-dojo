import { Link } from "react-router-dom";
import classNames from "classnames";

const HomeCard = ({ path, text, icon }) => {
  return (
    <Link
      className={classNames({
        "flex flex-col w-44 h-32 justify-evenly items-center text-center p-2": true,
        "border border-zinc-300 bg-indigo-500 rounded-md text-xl font-semibold text-zinc-50": true,
        "cursor-pointer hover:bg-indigo-600 transition-all duration-300": true,
      })}
      to={path}
    >
      {text} {icon}
    </Link>
  );
};

export default HomeCard;
