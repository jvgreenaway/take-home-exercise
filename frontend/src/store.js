import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'
import saga from './saga'

export const configureStore = ({ reducer, saga }) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(
      sagaMiddleware,
    )),
  )

  if (saga) sagaMiddleware.run(saga)

  return store
}

const store = configureStore({ reducer, saga })

export default store
