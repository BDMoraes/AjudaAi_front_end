import { CToast, CToastBody, CToaster, CToastHeader } from '@coreui/react'
import React, { Component, useEffect, useRef, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'

import { toasterCallback } from 'src/services/services'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// class App extends Component {
const App = () => {
  const [toast, addToast] = useState(0)

  const toaster = useRef()

  useEffect(() => {
    toasterCallback((message) =>
      addToast(
        <CToast title={message.title}>
          <CToastHeader close>
            <svg
              className="rounded me-2"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              role="img"
            >
              <rect width="100%" height="100%" fill={message.color}></rect>
            </svg>
            <strong className="me-auto">{message.title}</strong>
          </CToastHeader>
          <CToastBody>{message.body}</CToastBody>
        </CToast>,
      ),
    )
  }, [])

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Página de Login"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/events"
              name="Eventos"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    </>
  )
  // }
}

export default App
