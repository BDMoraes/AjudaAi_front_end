import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useHistory } from 'react-router-dom'

const DefaultLayout = () => {
  const history = useHistory()
  const authData = JSON.parse(localStorage.getItem('auth'))

  const isTokenValid = authData?.expireTimestamp && authData.expireTimestamp > +new Date()

  if (!isTokenValid) {
    localStorage.removeItem('auth')
    history.push('/login')
    return <div />
  }
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
