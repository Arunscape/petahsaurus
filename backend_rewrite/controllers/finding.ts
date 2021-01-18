import findings from '../stubs/finding.ts'

export default {
    getAllFindings: ({response}: {response: any}) => {
        response.status = 200;
        response.body = {
        success: true,
        data: findings,
        }
    },
  };