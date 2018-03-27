import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import auth from 'resources/auth/reducer'

const appReducer = combineReducers({
  form,
  auth,
})

export const reducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }

  return appReducer(state, action)
}

export default reducer
