import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Events = React.lazy(() => import('./views/events/Events'))
const User_events_particip = React.lazy(() => import('./views/events/User_events_particip'))
const EventList = React.lazy(() => import('./views/events/EventList'))
const EventEdit = React.lazy(() => import('./views/events/EventEdit'))
const Register_events = React.lazy(() => import('./views/icons/flags/Register_events'))
const Edit_register = React.lazy(() => import('./views/pages/register/Edit_register'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/events', name: 'Eventos', component: Events },
  { path: '/register-events', name: 'Cadastrar evento', component: Register_events },
  { path: '/edit-events', name: 'Editar evento', component: EventEdit },
  { path: '/edit-register', name: 'Editar cadastro', component: Edit_register },
  {
    path: '/user-events-particip',
    name: 'Meus eventos participando',
    component: User_events_particip,
  },
  { path: '/user-events', name: 'Meus eventos', component: EventList },
]

export default routes
