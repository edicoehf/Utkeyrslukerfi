import { USER_URL } from '../constants'

const userService = () => {
  return {
    getUsers: () => fetch(USER_URL, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik1pa2FlZWxtYW5pOTlAZ21haWwuY29tIiwibmFtZSI6Ik1pa2FlbCBNw6FuaSBKw7Nuc3NvbiIsInRva2VuSUQiOiIxMSIsIm5iZiI6MTYxNTgxNTA3OCwiZXhwIjoxNjE1OTAxNDc4LCJpYXQiOjE2MTU4MTUwNzgsImlzcyI6ImxvY2FsaG9zdCIsImF1ZCI6ImxvY2FsaG9zdCJ9.SVyHksuCpGR2zyZU68a0_0xcOJ4ENxK5cbjmqQ-vQQw'
      }
    }).then(d => d.json()).then(d => d)
  }
}

export default userService()
