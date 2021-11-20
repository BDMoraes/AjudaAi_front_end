import { CButton, CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import navigation from '../_nav'
import { AppSidebarNav } from './AppSidebarNav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const logoutUser = () => {
    localStorage.removeItem('auth')
    history.push('/login')
  }

  const sendUserToHome = () => {
    history.push('/')
  }

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand
        className="d-none d-md-flex"
        to="/"
        onClick={() => sendUserToHome()}
        style={{ cursor: 'pointer' }}
      >
        {'Ajuda aí!'}
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CButton style={{ width: '100%', height: '100%' }} onClick={() => logoutUser()}>
          Sair
        </CButton>
        {/* {'Sair'} */}
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
