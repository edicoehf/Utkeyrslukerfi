import { SET_EMAIL, GET_EMAIL } from '../constants'
import loginService from '../services/loginService'

export const setLogin = (email, password) => async (dispatch) => {
  try {
    
    const token = await loginService.login({ email, password })

    localStorage.setItem('email', JSON.stringify(email))
    localStorage.setItem('token', JSON.stringify(token.token))
    
    dispatch(setEmailSuccess(email))
    
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const setEmailSuccess = (email) => ({
    type: SET_EMAIL,
    payload: email
  })

export const getLogin = () => async (dispatch) => {
  try {
    const email = await JSON.parse(localStorage.getItem('email'))
    dispatch(getEmailSuccess(email))
    
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getEmailSuccess = (email) => ({
    type: GET_EMAIL,
    payload: email
  })