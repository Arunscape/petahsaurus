import axios from 'axios'

const loc = "http://localhost:5000/"

export const checkEmail = (email) =>
  axios({
    method: 'post',
    url: loc + 'api/checkemail',
    data: { email },
  });
