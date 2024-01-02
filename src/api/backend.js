import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

export const getAllStudents = async () => {
  const students = await axios.get(`${url}/teachers/students/getAll`);
  return students.data;
};

export const getAllTeachers = async () => {
  const teachers = await axios.get(`${url}/teachers/getAll`);
  return teachers.data;
};

export const getAllClasses = async () => {
  const classes = await axios.get(`${url}/teachers/classes/getAll`);
  return classes.data;
};

export const getAllSubjects = async () => {
  const subjects = await axios.get(`${url}/teachers/subjects/getAll`);
  return subjects.data;
};

export const getAllSkills = async () => {
  const skills = await axios.get(`${url}/teachers/skills/getAll`);
  return skills.data;
};

export const getAllClassSkills = async () => {
  const classSkills = await axios.get(`${url}/teachers/classSkills/getAll`);
  return classSkills.data;
};

export const getClassFeedback = async (classId) => {
  // await axios
  //   .get(`${url}/teachers/class/feedback/getAll?class_id=${classId}`)
  //   .then((res) => {
  //     console.log(res);
  //     return res;
  //   })
  //   .catch((err) => console.log(err));
  const classFeedback = await axios
    .get(`${url}/teachers/class/feedback/getAll?class_id=${classId}`)
    .catch((err) => console.log(err));
  return classFeedback;
};

export const giveStudentsFeedback = async (
  student_id,
  class_id,
  teacher_id,
  skill_id,
  feedback_comment,
  skill_value
) => {
  await axios
    .post(`${url}/teachers/class/feedback/giveFeedback`, {
      student_id: student_id,
      class_id: class_id,
      teacher_id: teacher_id,
      skill_id: skill_id,
      feedback_comment: feedback_comment,
      skill_value: skill_value,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const addStudentsToClass = async (student_ids, class_id) => {
  await axios
    .post(`${url}/teachers/addStudentsToClass`, {
      student_ids: student_ids,
      class_id: class_id,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
