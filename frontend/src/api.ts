import axios from 'axios';
import type { AxiosResponse } from 'axios';

const apiPath = "http://localhost:5000"

// Signup code
export const checkEmail = (email) =>
  axios({
    method: 'post',
    url: `${apiPath}/api/checkemail`,
    data: { email },
  });

export const signup = (email, username) =>
  axios({
    method: 'post',
    url: `${apiPath}/api/signup`,
    data: { email, username },
  });

export const signin = (email) =>
  axios({
    method: 'post',
    url: `${apiPath}/api/signin`,
    data: { email },
  });

export const upgrade = () =>
  axios({
    method: 'get',
    url: `${apiPath}/api/upgrade`,
  });

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

export const createFinding = (finding: NewFinding): Promise<AxiosResponse<{id: number}>> =>
    axios.post(`${apiPath}/api/finding`, finding);

export const getAllFindings = (): Promise<AxiosResponse<Finding[]>> =>
    axios.get(`${apiPath}/api/findings/all`);
