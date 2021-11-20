import { cilCalendar, cilCalendarCheck, cilPeople, cilPlus, cilStar } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem } from '@coreui/react'
import React from 'react'

const _nav = [
  {
    component: CNavItem,
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    name: 'Geleria de Eventos',
    to: '/events',
  },
  {
    component: CNavItem,
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    name: 'Eventos que criei',
    to: '/user-events',
  },
  {
    component: CNavItem,
    icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
    name: 'Eventos que participo',
    to: '/user-events-particip',
  },
  {
    component: CNavItem,
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
    name: 'Cadastrar eventos',
    to: '/register-events',
  },
  {
    component: CNavItem,
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    name: 'Editar perfil',
    to: '/edit-register',
  },
]

export default _nav
