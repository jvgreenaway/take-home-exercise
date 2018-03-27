import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines'

export const login = createRoutine('LOGIN')
export const loginHandler = bindRoutineToReduxForm(login)
