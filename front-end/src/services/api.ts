import axios from "axios";

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_BACK_END_URL,
});

interface UserData {
  email: string;
  password: string;
}

interface CodeData {
  code: string | (string | null)[] | null;
}

function getConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function signUp(signUpData: UserData) {
  await baseAPI.post("/sign-up", signUpData);
}

async function signIn(signInData: UserData) {
  return await baseAPI.post<{ token: string }>("/sign-in", signInData);
}

async function signInWithGitHub(code: CodeData) {
  return await baseAPI.post<{ token: string }>("/sign-in/github", code);
}

export interface Term {
  id: number;
  number: number;
}

export interface Discipline {
  id: number;
  name: string;
  teacherDisciplines: TeacherDisciplines[];
  term: Term;
}

export interface TeacherDisciplines {
  id: number;
  discipline: Discipline;
  teacher: Teacher;
  tests: Test[];
}

export interface Teacher {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Test {
  id: number;
  name: string;
  pdfUrl: string;
  category: Category;
}

export type TestByDiscipline = Term & {
  disciplines: Discipline[];
};

export type TestByTeacher = TeacherDisciplines & {
  teacher: Teacher;
  disciplines: Discipline[];
  tests: Test[];
};

export interface NewTestData {
  teacher: string;
  discipline: string;
  category: string;
  pdfUrl: string;
  name: string;
}

async function getTestsByDiscipline(token: string) {
  const config = getConfig(token);
  const request = await baseAPI.get(
    "/tests/terms",
    config
  );
  return request;
}

async function getTestsByTeacher(token: string) {
  const config = getConfig(token);
  const request = await baseAPI.get(
    "/tests/teachers",
    config
  );
  return request;
}

async function getCategories(token: string) {
  const config = getConfig(token);
  const request = await baseAPI.get(
    "/categories",
    config
  );
  return request;
}

async function newTest(newTestData: NewTestData, token: string) {
  const config = getConfig(token);
  const request = await baseAPI.post(
    "/tests",
    newTestData,
    config
  );
  return request;
}

const api = {
  signUp,
  signIn,
  signInWithGitHub,
  getTestsByDiscipline,
  getTestsByTeacher,
  getCategories,
  newTest
};

export default api;
