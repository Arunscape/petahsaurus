import axios from 'axios'

axios({
    method: 'post',
    url: '/user/12345',
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
  });

export const checkEmail = (email) =>
  axios({
    method: 'get',
    url: '/api/checkemail',
    data: { email },
  });
