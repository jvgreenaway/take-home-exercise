import React from 'react'
import { withProps } from 'recompose'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Box } from 'rebass'

import { restrictToLoggedOut, restrictToLoggedIn } from 'resources/auth/hoc'
import Login from 'components/Login'
import Results from 'components/Results'

const RedirectToLogin = withProps({ to: '/login' })(Redirect)
const ProtectedLogin = restrictToLoggedOut('/results')(Login) 
const ProtectedResults = restrictToLoggedIn('/login')(Results)

const Routes = () => (
  <Switch>
    <Route path="/login" component={ProtectedLogin} />
    <Route path="/results" component={ProtectedResults} />
    <Route component={RedirectToLogin} />
  </Switch>
)

const App = () => [
  <Box key="header" is="header" bg="gray" color="white" p={2}>
    <span>My app</span>
  </Box>,
  <main key="main" id="main">
    <Routes />
  </main>,
]

export default App
