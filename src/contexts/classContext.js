import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllStudents,
  getAllTeachers,
  getAllClasses,
  getAllSubjects,
  getAllSkills,
  getAllClassSkills,
  getClassFeedback,
  addTeacher,
} from "../api/backend";
import { useAuth0 } from "@auth0/auth0-react";

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
  const [currentClassTeachers, setCurrentClassTeachers] = useState([]);
  const [currentTeacher, setCurrentTeacher] = useState([]);

  const [refreshData, setRefreshData] = useState(1);

  const [accessToken, setAccessToken] = useState("");

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
    logout,
    isLoading,
  } = useAuth0();

  // Authentication and user data
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    } else if (isAuthenticated) {
      const getToken = async () => {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
      };
      getToken();
    }
  }, [isAuthenticated, isLoading]);

  // Setting currentTeacher, and creating new teacher if necessary
  useEffect(() => {
    if (isAuthenticated && allTeachers.length != 0) {
      const newTeacher = async () => {
        await addTeacher(
          user.given_name,
          user.family_name,
          user.email,
          accessToken
        );
      };
      if (
        !allTeachers
          .map((teacher) => teacher.email_address)
          .includes(user.email)
      ) {
        newTeacher();
      }
      setCurrentTeacher(
        allTeachers.find((teacher) => {
          return teacher.email_address === user.email;
        })
      );
    }
  }, [allTeachers]);

  // Getting base data with getAll
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const [
        //   studentData,
        //   teacherData,
        //   classData,
        //   subjectData,
        //   skillData,
        //   classSkillData,
        // ] = await Promise.all([
        //   getAllStudents(accessToken),
        //   getAllTeachers(accessToken),
        //   getAllClasses(accessToken),
        //   getAllSubjects(accessToken),
        //   getAllSkills(accessToken),
        //   getAllClassSkills(accessToken),
        // ]);

        const studentData = await getAllStudents(accessToken);
        const teacherData = await getAllTeachers(accessToken);
        const classData = await getAllClasses(accessToken);
        const subjectData = await getAllSubjects(accessToken);
        const skillData = await getAllSkills(accessToken);
        const classSkillData = await getAllClassSkills(accessToken);

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
    if (isAuthenticated) {
      console.log("base data");
      fetchData();
    }
  }, [refreshData, isAuthenticated]);

  // Fetching current class daata
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentClass) {
          const classFeedback = await getClassFeedback(
            currentClass.id,
            accessToken
          );
          setCurrentClassFeedback(
            classFeedback.data.students.map((student) => {
              return {
                ...student,
                full_name: `${student.first_name} ${student.last_name}`,
              };
            })
          );
          setCurrentClassTeachers(
            classFeedback.data.Teachers.map((teacher) => {
              return {
                ...teacher,
                full_name: `${teacher.first_name} ${teacher.last_name}`,
              };
            })
          );
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    if (isAuthenticated && accessToken) {
      fetchData();
    }
  }, [currentClass, allClasses]);

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
    currentClassTeachers,
    currentTeacher,
    setRefreshData,
    refreshData,
    isAuthenticated,
    loginWithRedirect,
    accessToken,
    user,
    logout,
  };

  return (
    <ClassContext.Provider value={state}>
      {props.children}
    </ClassContext.Provider>
  );
};

export const useClasses = () => useContext(ClassContext);
