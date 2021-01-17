import axios from 'axios';
import type { AxiosResponse } from 'axios';

const apiPath = "http://localhost:5000";
const recieveToken = (data) => {
  return data.then((e) => {
      let tok = e.data.tok;
      localStorage.setItem("tok", tok)
      console.log('Success. Got token', localStorage.getItem("tok"));
      return e;
  })
}
// Signup code
export const checkEmail = (email) =>
  axios({
    method: 'post',
    url: `${apiPath}/api/checkemail`,
    data: { email },
  });

export const signup = (email, username) =>
  recieveToken(axios({
    method: 'post',
    url: `${apiPath}/api/signup`,
    data: { email, username },
  }));

export const signin = (email) =>
  recieveToken(axios({
    method: 'post',
    url: `${apiPath}/api/signin`,
    data: { email },
  }));

const authapi = (data) => {
  data.data = { ...data.data, tok: localStorage.getItem('tok') };
  return axios(data)
}

export const upgrade = () =>
  recieveToken(authapi({
    method: 'post',
    url: `${apiPath}/api/upgrade`,
  }));

export interface UserInfo {
  sub: string, // subscriber (user id)
  email: string,
  exp: number, // expiry date (unix time stamp)
  isfull: boolean | Array<boolean>, // true if token is good, empty list if not validated
}

export const getUserIdInfo = (): UserInfo => {
  const tok = window.localStorage.getItem('tok')
  const usr = JSON.parse(atob(tok.split(".")[1]))
  return usr as UserInfo
}



export interface NewFinding {
    content: string,
    image: string,
    date: number,
    coords: {
        lat: number,
        long: number
    }
}

export interface Finding extends NewFinding {
    tags?: {[key:string]: string},
    id: string
};

export const setTag = (id: string, key: string, value: string): Promise<AxiosResponse<void>> =>
    axios.post(`${apiPath}/api/finding/${id}/tags`, {key, value});

export const getFinding = (id: string): Promise<AxiosResponse<Finding>> =>
    axios.get(`${apiPath}/api/finding/${id}`);

export const createFinding = (finding: NewFinding): Promise<AxiosResponse<{id: string}>> =>
    axios.post(`${apiPath}/api/finding`, finding);

export const editFinding = (finding: NewFinding): Promise<AxiosResponse<{id: string}>> =>
    axios.put(`${apiPath}/api/finding`, finding);

export const getAllFindings = (): Promise<AxiosResponse<Finding[]>> =>
    axios.post(`${apiPath}/api/findings/all`, { data: {tags: false} });

export const getAllFindingsWithTags = (): Promise<AxiosResponse<Finding[]>> =>
    axios.get(`${apiPath}/api/findings/all?tags=true`);
