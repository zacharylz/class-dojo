import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

export const getAllStudents = async (accessToken) => {
  const students = await axios.get(`${url}/teachers/students/getAll`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return students.data;
};

export const getAllTeachers = async (accessToken) => {
  const teachers = await axios.get(`${url}/teachers/getAll`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      // "Access-Control-Allow-Origin": "http://localhost:3001/"
    },
  });
  return teachers.data;
};

export const getAllClasses = async (accessToken) => {
  const classes = await axios.get(`${url}/teachers/classes/getAll`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return classes.data;
};

export const getAllSubjects = async (accessToken) => {
  const subjects = await axios.get(`${url}/teachers/subjects/getAll`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return subjects.data;
};

export const getAllSkills = async (accessToken) => {
  const skills = await axios.get(`${url}/teachers/skills/getAll`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return skills.data;
};

export const getAllClassSkills = async (accessToken) => {
  const classSkills = await axios.get(`${url}/teachers/classSkills/getAll`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return classSkills.data;
};

export const getClassFeedback = async (classId, accessToken) => {
  const classFeedback = await axios
    .get(`${url}/teachers/class/feedback/getAll?class_id=${classId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch((err) => console.log(err));
  return classFeedback;
};

export const giveStudentsFeedback = async (
  student_id,
  class_id,
  teacher_id,
  skill_id,
  feedback_comment,
  skill_value,
  accessToken
) => {
  await axios
    .post(
      `${url}/teachers/class/feedback/giveFeedback`,
      {
        student_id: student_id,
        class_id: class_id,
        teacher_id: teacher_id,
        skill_id: skill_id,
        feedback_comment: feedback_comment,
        skill_value: skill_value,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const addStudentsToClass = async (
  student_ids,
  class_id,
  accessToken
) => {
  await axios
    .post(
      `${url}/teachers/addStudentsToClass`,
      {
        student_ids: student_ids,
        class_id: class_id,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const addTeacherToClass = async (class_id, teacher_id, accessToken) => {
  await axios
    .post(
      `${url}/teachers/class/addTeacher`,
      {
        class_id: class_id,
        teacher_id: teacher_id,
        teacher_role: 2,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const createClass = async (
  class_name,
  subject_id,
  grade,
  teacher_id,
  students,
  skills,
  accessToken
) => {
  await axios
    .post(
      `${url}/teachers/classes/create`,
      {
        class_name: class_name,
        subject_id: subject_id,
        grade: grade,
        teacher_id: teacher_id,
        students: students,
        skills: skills,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log(err));
};

export const addTeacher = async (
  firstName,
  lastName,
  emailAddress,
  accessToken
) => {
  await axios
    .post(
      `${url}/teachers/add`,
      {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
