import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllStudents,
  getAllTeachers,
  getAllClasses,
  getAllSubjects,
  getAllSkills,
  getAllClassSkills,
  getClassFeedback,
} from "../api/backend";

export const ClassContext = createContext();

export const ClassProvider = (props) => {
  const [allStudents, setAllStudents] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allClassSkills, setAllClassSkills] = useState([]);
  const [currentClass, setCurrentClass] = useState("");
  const [currentClassFeedback, setCurrentClassFeedback] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await getAllStudents();
        const teacherData = await getAllTeachers();
        const classData = await getAllClasses();
        const subjectData = await getAllSubjects();
        const skillData = await getAllSkills();
        const classSkillData = await getAllClassSkills();

        const subjects = {};
        subjectData.forEach((subject) => {
          subjects[subject.id] = subject.subject_name;
        });

        const skills = {};
        skillData.forEach((skill) => {
          skills[skill.id] = skill.skill_name;
        });

        const classes = classData.map((classObj) => {
          return {
            ...classObj,
            subject_name: subjects[classObj.subject_id],
          };
        });

        setAllStudents(
          studentData.map((student) => {
            return {
              ...student,
              full_name: `${student.first_name} ${student.last_name}`,
            };
          })
        );
        setAllTeachers(
          teacherData.map((teacher) => {
            return {
              ...teacher,
              full_name: `${teacher.first_name} ${teacher.last_name}`,
            };
          })
        );
        setAllClasses(classes);
        setAllSubjects(subjects);
        setAllSkills(skills);
        setAllClassSkills(classSkillData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentClass) {
          const classFeedback = await getClassFeedback(currentClass.id);
          setCurrentClassFeedback(
            classFeedback.data.students.map((student) => {
              return {
                ...student,
                full_name: `${student.first_name} ${student.last_name}`,
              };
            })
          );
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, [currentClass]);

  const state = {
    allStudents,
    allTeachers,
    allClasses,
    allSubjects,
    allSkills,
    allClassSkills,
    setCurrentClass,
    currentClass,
    currentClassFeedback,
    // allClassSkills
  };

  return (
    <ClassContext.Provider value={state}>
      {props.children}
    </ClassContext.Provider>
  );
};

export const useClasses = () => useContext(ClassContext);
