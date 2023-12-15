import { createContext, useContext, useState, useEffect } from "react";

export const ClassContext = createContext();

export const ClassProvider = (props) => {
  const [classes, setClasses] = useState([
    {
      classId: 1,
      className: "5A",
      subjectName: "History",
      grade: 5,
      owner: "Placeholder name",
    },
    {
      classId: 2,
      className: "4B",
      subjectName: "English",
      grade: 4,
      owner: "Placeholder name",
    },
    {
      classId: 3,
      className: "5C",
      subjectName: "Math",
      grade: 5,
      owner: "Placeholder name",
    },
    {
      classId: 4,
      className: "2A",
      subjectName: "Art",
      grade: 2,
      owner: "Placeholder name",
    },
    {
      classId: 5,
      className: "5B",
      subjectName: "History",
      grade: 5,
      owner: "Placeholder name",
    },
  ]);

  const [allStudents, setAllStudents] = useState([
    { studentId: 14, register: 1, studentName: "Test14" },
    { studentId: 2, register: 2, studentName: "Test2" },
    { studentId: 7, register: 3, studentName: "Test7" },
    { studentId: 3, register: "", studentName: "Test3" },
    { studentId: 6, register: "", studentName: "Test6" },
    { studentId: 12, register: "", studentName: "Test12" },
  ]);

  const state = {
    classes,
    allStudents,
  };

  // const fetchData = async () => {
  //   try {
  //     const result = await productsData();
  //     setProducts(result.data);
  //   } catch (error) {
  //     console.error("Failed to fetch products:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <ClassContext.Provider value={state}>
      {props.children}
    </ClassContext.Provider>
  );
};

export const useClasses = () => useContext(ClassContext);
