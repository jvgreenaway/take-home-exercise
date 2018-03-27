import { connect } from 'react-redux'
import { compose, branch, renderComponent, withProps } from 'recompose'
import { Redirect } from 'react-router-dom'

import { selectIsLoggedIn, isLoggedIn, isNotLoggedIn } from 'resources/auth/selectors'


export const connectLoggedIn = connect(state => ({
  isLoggedIn: selectIsLoggedIn(state),
}))

export const restrictToLoggedIn = to => compose(
  connectLoggedIn,
  branch(isNotLoggedIn,
    renderComponent(withProps({ to })(Redirect))))

export const restrictToLoggedOut = to => compose(
  connectLoggedIn,
  branch(isLoggedIn,
    renderComponent(withProps({ to })(Redirect))))
