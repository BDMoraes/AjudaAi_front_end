import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Events = React.lazy(() => import('./views/events/Events'))
const User_events = React.lazy(() => import('./views/events/User_events'))
const User_events_particip = React.lazy(() => import('./views/events/User_events'))
const Edit_events = React.lazy(() => import('./views/events/Edit_events'))
const Register_events = React.lazy(() => import('./views/icons/flags/Register_events'))
const Edit_register = React.lazy(() => import('./views/pages/register/Edit_register'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/events', name: 'Eventos', component: Events },
  { path: '/register-events', name: 'Cadastrar evento', component: Register_events },
  { path: '/edit-events', name: 'Editar evento', component: Edit_events },
  { path: '/edit-register', name: 'Editar cadastro', component: Edit_register },
  { path: '/user-events', name: 'Meus eventos criados', component: User_events },
  {
    path: '/user-events-particip',
    name: 'Meus eventos participando',
    component: User_events_particip,
  },
]

export default routes
