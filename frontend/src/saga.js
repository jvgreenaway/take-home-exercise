import { fork } from 'redux-saga/effects'
import { routinePromiseWatcherSaga } from 'redux-saga-routines'

import authSaga from 'resources/auth/saga'

export default function * rootSaga () {
  yield * [
    // vendor
    routinePromiseWatcherSaga,

    // resources
    authSaga,
  ].map(fork)
}
