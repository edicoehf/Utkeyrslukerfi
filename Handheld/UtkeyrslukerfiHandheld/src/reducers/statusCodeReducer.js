const statusCode = { 1: 'Í ferli', 2: 'Á leiðinni', 3: 'Móttekið' } // TODO: make status codes configurable

const statusCodeReducer = (state = statusCode, action) => {
  switch (action.type) {
    default: return state
  }
}

export default statusCodeReducer
