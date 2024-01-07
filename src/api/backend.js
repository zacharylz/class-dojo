import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

export const getAllStudents = async (accessToken) => {
  try {
    const students = await axios
      .get(`${url}/teachers/students/getAll`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch((err) => console.log(err));
    return students.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllTeachers = async (accessToken) => {
  try {
    const teachers = await axios
      .get(`${url}/teachers/getAll`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch((err) => console.log(err));
    return teachers.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllClasses = async (accessToken) => {
  try {
    const classes = await axios
      .get(`${url}/teachers/classes/getAll`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch((err) => console.log(err));
    return classes.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllSubjects = async (accessToken) => {
  try {
    const subjects = await axios
      .get(`${url}/teachers/subjects/getAll`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch((err) => console.log(err));
    return subjects.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllSkills = async (accessToken) => {
  try {
    const skills = await axios
      .get(`${url}/teachers/skills/getAll`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch((err) => console.log(err));
    return skills.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllClassSkills = async (accessToken) => {
  try {
    const classSkills = await axios
      .get(`${url}/teachers/classSkills/getAll`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch((err) => console.log(err));
    return classSkills.data;
  } catch (err) {
    console.log(err);
  }
};

export const getClassFeedback = async (classId, accessToken) => {
  try {
    const classFeedback = await axios
      .get(`${url}/teachers/class/feedback/getAll?class_id=${classId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .catch((err) => console.log(err));
    return classFeedback;
  } catch (err) {
    console.log(err);
  }
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
  try {
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
  } catch (err) {
    console.log(err);
  }
};

export const addStudentsToClass = async (
  student_ids,
  class_id,
  accessToken
) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

export const addTeacherToClass = async (class_id, teacher_id, accessToken) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
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
  try {
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
  } catch (err) {
    console.log(err);
  }
};

export const addTeacher = async (
  firstName,
  lastName,
  emailAddress,
  accessToken
) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};
