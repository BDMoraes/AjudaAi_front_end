import { CContainer, CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
// routes config
import routes from '../routes'

const renderEventRoute = (route, props) => {
  return <route.component {...props} />
}

const renderDefaultRoute = (route, props) => {
  return (
    <div style={{ justifyContent: 'center', width: '100%' }}>
      <div style={{ maxWidth: '1350px', marginRight: 'auto', marginLeft: 'auto' }}>
        <route.component {...props} />
      </div>
    </div>
  )
}

const AppContent = () => {
  return (
    <CContainer fluid>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => {
                    return route.isEvent
                      ? renderEventRoute(route, props)
                      : renderDefaultRoute(route, props)
                  }}
                />
              )
            )
          })}
          <Redirect from="/" to="/events" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
