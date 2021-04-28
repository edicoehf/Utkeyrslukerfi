import configData from '../constants/config.json'

const statusCodeReducer = (state = configData.STATUS, action) => {
  switch (action.type) {
    default: return state
  }
}

export default statusCodeReducer
