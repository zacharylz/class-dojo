import React, { useState, useEffect } from "react";
import {
  getAllStudents,
  getAllTeachers,
  getAllClasses,
  getAllSubjects,
  getAllSkills,
  getAllClassSkills,
} from "../api/backend";
import { useClasses } from "../contexts/classContext";

const Home = () => {
  const {
    currentClassFeedback,
    currentClass,
    allStudents,
    allTeachers,
    allSkills,
    allClassSkills,
  } = useClasses();

  const [allClasses, setAllClasses] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const classData = await getAllClasses();
      const subjectData = await getAllSubjects();

      const subjects = {};
      subjectData.forEach((subject) => {
        subjects[subject.id] = subject.subject_name;
      });

      const classes = classData.map((classObj) => {
        return {
          ...classObj,
          subject_name: subjects[classObj.subject_id],
        };
      });

      setAllClasses(classes);
      setAllSubjects(subjects);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full justify-start items-center">
      Home
      <div className="flex flex-col border-2">
        <button onClick={() => console.log(allStudents)}>
          Log all students
        </button>
        <button onClick={() => console.log(allTeachers)}>
          Log all teachers
        </button>
        <button onClick={() => console.log(allClasses)}>Log all classes</button>
        <button onClick={() => console.log(allSubjects)}>
          Log all subjects
        </button>
        <button onClick={() => console.log(allSkills)}>Log all skills</button>
        <button onClick={() => console.log(allClassSkills)}>
          Log all classSkills
        </button>
        <button onClick={() => console.log(currentClass)}>
          Log currentClass
        </button>
        <button onClick={() => console.log(currentClassFeedback)}>
          Log currentClassFeedback
        </button>
        <button
          onClick={() =>
            console.log(
              allClassSkills.filter((skillData) => {
                return skillData.class_id === currentClass.id;
              })
            )
          }
        >
          Log find class func
        </button>
      </div>
    </div>
  );
};

export default Home;
