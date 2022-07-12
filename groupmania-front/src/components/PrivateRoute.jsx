import React, { useContext } from 'react'
import AuthContext from '../contexts/authContext'
import { Redirect, Route, useHistory } from 'react-router-dom'

const PrivateRoute = ({ path, component }) => {
      const { isAuthenticated } = useContext(AuthContext)
      const { location } = useHistory()

      if (isAuthenticated) {
            return <Route path={path} component={component} />
      } else if (!isAuthenticated && location.pathname === 'login') {
            return <Redirect to="/" />
      } else {
            return <Redirect to="/" />
      }
}

export default PrivateRoute
