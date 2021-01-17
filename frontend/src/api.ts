import axios from 'axios';
import type { AxiosResponse } from 'axios';

const apiPath = "http://localhost:5000";
(window as any).token = "";

const recieveToken = (data) => {
  const promise = new Promise((resolve, reject) => {
    data
      .then((e) => {
        let tok = e.data.tok;
        (window as any).token = tok;
        console.log("Success. Got token", (window as any).token)
        resolve(e);
      })
      .catch((e) => reject(e));
  });
  return promise
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
  data.data = { ...data.data, tok: (window as any).token }
  console.log(data)
  axios(data)
}

export const upgrade = () =>
  recieveToken(authapi({
    method: 'post',
    url: `${apiPath}/api/upgrade`,
  }));

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

export const getAllFindings = (): Promise<AxiosResponse<Finding[]>> =>
    axios.get(`${apiPath}/api/findings/all`);
