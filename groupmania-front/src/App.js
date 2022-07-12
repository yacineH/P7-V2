import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Posts from './pages/Posts'
import Post from './pages/Post'
import Login from './pages/Login'
import NewUser from './pages/NewUser'
import AuthContext from './contexts/authContext'
import AdminContext from './contexts/adminContext'
import EmployeeContext from './contexts/employeeContext'
import { checkAdmin, checkId, isAuth } from './services/authAPI'
import NewPost from './pages/NewPost'
import PrivateRoute from './components/PrivateRoute'
import Error from './components/Error'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(isAuth)
  const [isAdmin, setIsAdmin] = useState(checkAdmin)
  const [employeeId, setEmployeeId] = useState(checkId)

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
        <EmployeeContext.Provider value={{ employeeId, setEmployeeId }}>
          <div className="container h-100">
            <Router>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={NewUser} />
                <PrivateRoute path="/home" component={Posts} />
                <PrivateRoute path="/post/:id" component={Post} />
                <PrivateRoute path="/newPost" component={NewPost} />
                <Route component={Error} />
              </Switch>
            </Router>
          </div>
        </EmployeeContext.Provider>
      </AdminContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
