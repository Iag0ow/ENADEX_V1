import { customFetch, customFetchNoAuth } from "./custom-fetch";
import { calculateRemainingTime } from "../Hooks/formatTime";

const API = "https://enadex-api-v2.vercel.app";

// export const login = async (loginForm) => {
//   const bodyForm = JSON.stringify(loginForm);

//   const config = {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: bodyForm,
//   };

//   const response = await fetch(`${API}/session/signin`, config);

//   const auth = await response.json();

//   return {...auth, status: response.status};
// };

export const studentRegister = async (registerForm) => {
  const bodyForm = JSON.stringify(registerForm);
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: bodyForm,
  };

  return customFetchNoAuth(`${API}/session/signup`, config);
};

export const sendEmailRecovery = async (email) => {
  const bodyForm = JSON.stringify(email);
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: bodyForm,
  };
  const response = await fetch(`${API}/forgot-password/request`, config);
  return response;
};

export const changePassword = async (formChange) => {
  const bodyForm = JSON.stringify(formChange);
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: bodyForm,
  };
  const response = await fetch(`${API}/forgot-password/validate`, config);
  return response;
};

export async function getProfile() {
  const token = localStorage.getItem("token");
  const config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${API}/me/profile`, config);
  const data = await response.json();

  return { ...data, status: response.status };
}

export async function registerAdminTeacher(formRegisterAdminTeacher) {
  const bodyForm = JSON.stringify(formRegisterAdminTeacher);
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: bodyForm,
  };

  const response = await fetch(`${API}/managers`, config);
  return response;
}

export async function getManagers() {
  const token = localStorage.getItem("token");
  const config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${API}/managers`, config);
  const data = await response.json();

  return await data;
}

export async function getCourses() {
  const config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const response = await fetch(`${API}/courses`, config);
  const data = await response.json();

  return { data, status: response.status };
}

export async function getQuestions(filters) {
  const token = localStorage.getItem("token");

  const config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const queryParams = [
    filters.searchText && `searchText=${filters.searchText}`,
    filters.year && `year=${filters.year}`,
    filters.isSpecific && `isSpecific=${filters.isSpecific}`,
    filters.course_id && `course_id=${filters.course_id}`,
  ]
    .filter(Boolean)
    .join("&");
  const response = await fetch(`${API}/questions?${queryParams}`, config);
  const data = await response.json();

  return { data: data, status: response.status };
}

export async function getBankQuestionsResponseByStudent() {
  const token = localStorage.getItem("token");

  const config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${API}/me/answers-questions`, config);
  const data = await response.json();

  return { data: data, status: response.status };
}

export async function postBankQuestionResponse(questionObjectResponse) {
  const bodyForm = JSON.stringify(questionObjectResponse);
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: bodyForm,
  };

  const response = await fetch(`${API}/me/answers-questions`, config);
  const data = await response.json();

  return { data: data, status: response.status };
}

export async function createQuestion(questionData) {
  const bodyForm = JSON.stringify(questionData);
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: bodyForm,
  };
  const response = await fetch(`${API}/questions`, config);
  return response;
}

export async function createSimulated(simulatedData) {
  const bodyForm = JSON.stringify(simulatedData);
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: bodyForm,
  };
  const response = await fetch(`${API}/mock-exams`, config);
  return response;
}

export async function createSimulatedQuestion(simulatedId, questionData) {
  const bodyForm = JSON.stringify(questionData);
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: bodyForm,
  };
  const response = await fetch(
    `${API}/mock-exams/${simulatedId}/questions`,
    config
  );
  return response;
}

export async function getStudents() {
  const token = localStorage.getItem("token");
  const config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${API}/students`, config);
  const data = await response.json();
  return await data;
}

export async function activateStudents(idStudent) {
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${API}/students/${idStudent}/activate`, config);
  return response;
}

export async function deactivateStudents(idStudent) {
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `${API}/students/${idStudent}/deactivate`,
    config
  );
  return response;
}

export async function activateManagers(idManager) {
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${API}/managers/${idManager}/activate`, config);
  return response;
}

export async function deactivateManagers(idManager) {
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `${API}/managers/${idManager}/deactivate`,
    config
  );
  return response;
}
export async function getQuestionsAndMockById(idMock) {
  try {
    const token = localStorage.getItem("token");
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const [responseQuestions, responseMockInProgress] = await Promise.all([
      fetch(`${API}/me/exams/${idMock}/questions`, config),
      fetch(`${API}/me/exams/progress`, config),
    ]);

    if (responseMockInProgress.status !== 200) return { data: [], status: 500 };

    const examInProgress = await responseMockInProgress.json();
    const responseDataMock = await fetch(`${API}/me/exams/${idMock}`, config);

    if (responseQuestions.status !== 200 || responseDataMock.status !== 200)
      return { data: [], status: 500 };

    const dataQuestion = await responseQuestions.json();
    let dataMock = await responseDataMock.json();

    const createdDate = new Date(examInProgress[0].createdAt)
      .toISOString()
      .split("T")[0];
    const remainingTimeInSeconds = calculateRemainingTime(
      examInProgress[0].createdAt,
      examInProgress[0].mock_exam_id.duration
    );
    dataMock = {
      ...dataMock,
      inicializeExamDate: createdDate,
      duration: remainingTimeInSeconds,
      mockName: examInProgress[0].mock_exam_id.name,
    };

    return { data: dataQuestion, status: 200, dataMock };
  } catch (error) {
    return { data: [], status: 500 };
  }
}
export async function getExamInProgress() {
  const token = localStorage.getItem("token");
  const config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${API}/me/exams/progress`, config);
  const data = await response.json();
  return { data: data, status: response.status };
}
export async function putExamAnswers(sendAnswers, examId) {
  const bodyForm = JSON.stringify(sendAnswers);
  const token = localStorage.getItem("token");
  const config = {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: bodyForm,
  };

  const response = await fetch(`${API}/me/exams/${examId}/answers`, config);
  const data = await response.json();

  return { data: data, status: response.status };
}

export async function getExamAnswers(examId) {
  const token = localStorage.getItem("token");
  const config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${API}/me/exams/${examId}/answers`, config);
  const data = await response.json();

  return { data: data, status: response.status };
}

export async function getAvaiableSimulated() {
  const token = localStorage.getItem("token");
  const config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${API}/me/exams/available`, config);
  const data = await response.json();
  return await data;
}

export async function startSimulated(mock_exam_id) {
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mock_exam_id }),
  };
  const response = await fetch(`${API}/me/exams`, config);
  const data = await response.json();
  return data;
}

export async function editStudent(formEditStudent, idStudent) {
  const token = localStorage.getItem("token");
  const bodyForm = JSON.stringify(formEditStudent);
  const config = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: bodyForm,
  };
  const response = await fetch(`${API}/students/${idStudent}`, config);
  return response;
}

export async function editManagerUser(formEditManagerUser, idManagerUser) {
  const token = localStorage.getItem("token");
  const bodyForm = JSON.stringify(formEditManagerUser);
  const config = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: bodyForm,
  };
  const response = await fetch(`${API}/managers/${idManagerUser}`, config);

  return response;
}
export async function finishExam(idExam) {
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${API}/me/exams/${idExam}/finish`, config);
  return response;
}

export async function getAllSimulated() {
  const token = localStorage.getItem("token");
  const config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${API}/mock-exams`, config);
  const data = await response.json();
  return await data;
}

export async function registerCourse(formRegisterCourse){
  const token = localStorage.getItem("token")
  const bodyForm = JSON.stringify(formRegisterCourse)
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: bodyForm,
  }
  const response = await fetch(`${API}/courses`, config);
  return response;
}


export async function getAllSimulatedQuestions(id){
  const token = localStorage.getItem("token");
  const config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${API}/mock-exams/${id}/questions`, config);
  const data = await response.json();
  return await data;
}

export async function editSimulated(id, updatedData) {
  const token = localStorage.getItem("token");
  const config = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  };
  const response = await fetch(`${API}/mock-exams/${id}`, config);
  const data = await response.json();
  return data;
}

export async function provideSimulated(id) {
  const token = localStorage.getItem("token");
  const config = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${API}/mock-exams/${id}/available`, config);
  const data = await response.json();
  return data;
}

export async function finishSimulated(id) {
  const token = localStorage.getItem("token");
  const config = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${API}/mock-exams/${id}/finish`, config);
  const data = await response.json();
  return data;
}

export async function editSimulatedQuestion(id, questionID, updatedData) {
  const token = localStorage.getItem("token");
  const config = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  };
  const response = await fetch(`${API}/mock-exams/${id}/questions/${questionID}`, config);
  const data = await response.json();
  return data;
}

export async function deleteSimulatedQuestion(id, questionID) {
  const token = localStorage.getItem("token");
  const config = {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${API}/mock-exams/${id}/questions/${questionID}`, config);
  const data = await response.json();
  return data;
}