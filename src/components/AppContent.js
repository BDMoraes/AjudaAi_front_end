import { CContainer, CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer lg>
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
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
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
