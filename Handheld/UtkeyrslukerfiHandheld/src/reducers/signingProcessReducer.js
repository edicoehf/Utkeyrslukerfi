import configData from '../constants/config.json'
import { SET_STEP } from '../constants'

const signingProcessReducer = (state = { process: configData.SIGNING_PROCESS, step: 0 }, action) => {
  switch (action.type) {
    case SET_STEP: return { ...state, step: action.payload }
    default: return state
  }
}

export default signingProcessReducer
