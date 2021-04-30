import configData from '../constants/config.json'
import { SET_STEP } from '../constants'

const signingProcessReducer = (state = { process: configData.SIGNING_PROCESS, step: 0 }, action) => {
  switch (action.type) {
    case SET_STEP: return { step: action.payload, ...state }
    default: return state
  }
}

export default signingProcessReducer
