import axios from 'axios';
import type { AxiosResponse } from 'axios';

const apiPath = "http://localhost:5000"

// Signup code
export const checkEmail = (email) =>
  axios({
    method: 'post',
    url: apiPath + 'api/checkemail',
    data: { email },
  });

export const signup = (email, username) =>
  axios({
    method: 'post',
    url: apiPath + 'api/signup',
    data: { email, username },
  });

interface NewFinding {
    content: string,
    coords: {
        lat: number,
        long: number
    }
}

interface Finding extends NewFinding {
    date: string,
    id: string
};

export const getFinding = (id: string): Promise<AxiosResponse<Finding>> =>
    axios.get(`${apiPath}/api/finding/${id}`);

export const createFinding = (finding: NewFinding): Promise<AxiosResponse<{id: number}>> =>
    axios.post(`${apiPath}/api/finding`, finding);

export const getAllFindings = (): Promise<AxiosResponse<Finding[]>> =>
    axios.get(`${apiPath}/api/findings/all`);
