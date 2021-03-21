import { SET_EMAIL, GET_EMAIL, SET_TOKEN, GET_TOKEN } from '../constants'
import loginService from '../services/loginService'

export const setLogin = (email, password) => async (dispatch) => {
  try {
    
    const token = await loginService.login({ email, password })

    localStorage.setItem('email', JSON.stringify(email))
    localStorage.setItem('token', JSON.stringify(token.token))
    
    dispatch(setEmailSuccess(email))
    dispatch(setTokenSuccess(token.token))
    
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const setEmailSuccess = (email) => ({
  type: SET_EMAIL,
  payload: email
})

const setTokenSuccess = (token) => ({
  type: SET_TOKEN,
  payload: token
})

export const getLogin = () => async (dispatch) => {
  try {
    const email = await JSON.parse(localStorage.getItem('email'))
    const token = await JSON.parse(localStorage.getItem('token'))
    dispatch(getEmailSuccess(email))
    dispatch(getTokenSuccess(token))
    
  } catch (err) {
    console.log('Bad request, please try loading again.')
  }
}

const getEmailSuccess = (email) => ({
    type: GET_EMAIL,
    payload: email
})

const getTokenSuccess = (token) => ({
  type: GET_TOKEN,
  payload: token
})