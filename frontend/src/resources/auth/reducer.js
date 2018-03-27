import { createReducer } from 'reduxsauce'
import { List } from 'immutable'

import { login } from './routines'


export const INITIAL_STATE = { user: null }


export const success = (state = INITIAL_STATE, { payload }) => ({ 
  ...state, 
  user: true, 
  results: List(Object.entries(payload.results)
    .map(([id, result]) => ({
      id,
      ...result,
    }))
  ),
})

export const failure = (state = INITIAL_STATE, action) => INITIAL_STATE


export const HANDLERS = {
  [login.SUCCESS]: success,
  [login.FAILURE]: failure
}

export default createReducer(INITIAL_STATE, HANDLERS)
