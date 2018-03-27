import React from 'react'
import PropTypes from 'prop-types'
import { Provider as Redux } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { initGlobalStyles } from 'styles'
import store from 'store'
import App from 'components/App'


initGlobalStyles()

export const Providers = ({ children }) => (
  <Redux store={store}>
    <Router>  
      {children}
    </Router>
  </Redux>
)

Providers.propTypes = {
  children: PropTypes.node.isRequired,
}

const Root = () => <Providers children={<App />} />

export default Root
