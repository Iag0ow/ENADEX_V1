import { customFetch, customFetchNoAuth } from "./custom-fetch";

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

export async function getCourses(){
   const config = {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
   }

   const response = await fetch(`${API}/courses`, config);
   const data = await response.json()

   return { data, status: response.status };
}

export async function getQuestions(filters){
  const token = localStorage.getItem("token");

  const config = {
   method: "GET",
   headers: {
     "content-type": "application/json",
     "Authorization": `Bearer ${token}`,
   }
  }
  const queryParams = [filters.searchText && `searchText=${filters.searchText}`, filters.year && `year=${filters.year}`, filters.isSpecific && `isSpecific=${filters.isSpecific}`, filters.course_id && `course_id=${filters.course_id}`].filter(Boolean).join('&');
  const response = await fetch(`${API}/questions?${queryParams}`, config);
  const data = await response.json();

  return {data: data, status: response.status};
}


export async function getBankQuestionsResponseByStudent(){
  const token = localStorage.getItem("token");

  const config = {
   method: "GET",
   headers: {
     "content-type": "application/json",
     "Authorization": `Bearer ${token}`,
   }
  }

  const response = await fetch(`${API}/me/answers-questions`, config);
  const data = await response.json();

  return {data: data, status: response.status};
}

export async function postBankQuestionResponse(questionObjectResponse){
  const bodyForm = JSON.stringify(questionObjectResponse);
  const token = localStorage.getItem("token");
  const config = {
   method: "POST",
   headers: {
     "content-type": "application/json",
     "Authorization": `Bearer ${token}`,
   },
   body: bodyForm
  }

  const response = await fetch(`${API}/me/answers-questions`, config);
  const data = await response.json();

  return {data: data, status: response.status};

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
  const response = await fetch(`${API}/mock-exams/${simulatedId}/questions`, config);
  return response;
}
  
export async function getStudents(){
  const token = localStorage.getItem("token");
  const config = {
   method: "GET",
   headers: {
     "content-type": "application/json",
     Authorization: `Bearer ${token}`,
   }
  }

  const response = await fetch(`${API}/students`, config);
  const data = await response.json();
  console.log(data)
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
  console.log(idStudent)
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${API}/students/${idStudent}/deactivate`, config);
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
  const response = await fetch(`${API}/managers/${idManager}/deactivate`, config);
  return response;
}

export async function getSimulated() {
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