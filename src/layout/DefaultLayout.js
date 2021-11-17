import React from 'react'
import { useHistory } from 'react-router-dom'
import { AppContent, AppFooter, AppHeader, AppSidebar } from '../components/index'

const DefaultLayout = () => {
  const history = useHistory()
  const authData = JSON.parse(localStorage.getItem('auth'))

  const isTokenValid = authData?.expireTimestamp && authData.expireTimestamp > +new Date()

  if (!isTokenValid) {
    console.log('redirecionando usuário para login a partir de DefaultLayouts')
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
