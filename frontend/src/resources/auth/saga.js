import { takeEvery, put, call } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'

import { authWithServer } from './service'
import { login } from './routines'


function * handleLogin ({ payload: { values } }) {
  yield put(login.request())

  try {
    const { data } = yield call(authWithServer)
    yield put(login.success(data))
  } catch (error) {
    console.error(error)
    yield put(login.failure(new SubmissionError({ _error: error.message })))
  } finally {
    yield put(login.fulfill())
  }
}


export default function * defaultAuthSaga () {
  yield * [
    takeEvery(login.TRIGGER, handleLogin),
  ]
}
