import { SET_LOGIN, GET_LOGIN} from '../constants'
import loginService from '../services/loginService'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLogin = (email, password) => async (dispatch) => {
    try {
        const body = await loginService.login({ email, password })
        if (body?.token) {
            //TODO: Work out localstorage alternative
            //localStorage.setItem('token', JSON.stringify(body.token))
            //console.log(body.token)
            await AsyncStorage.setItem('token', JSON.stringify(body.token));
            dispatch(setLoginSuccess(body))
        }
    } catch (err) {
        console.log(err)
    }
}

export const getLogin = () => async (dispatch) => {
    try {
        //TODO: Work out localstorage alternative
        //const token = await JSON.parse(localStorage.getItem('token'))
        const token = await AsyncStorage.getItem('token');
        dispatch(getLoginSuccess(token))
    } catch (err) {
        console.log('Bad request, please try loading again.')
    }
}

const getLoginSuccess = (token) => ({
    type: GET_LOGIN,
    payload: token
})

const setLoginSuccess = (body) => ({
    type: SET_LOGIN,
    payload: body
})