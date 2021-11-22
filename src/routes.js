import React from 'react'

const Events = React.lazy(() => import('./views/events/Events'))
const User_events_particip = React.lazy(() => import('./views/events/VolunteeredEvents'))
const MyEvents = React.lazy(() => import('./views/events/MyEvents'))
const Register_events = React.lazy(() => import('./views/icons/flags/Register_events'))
const Edit_register = React.lazy(() => import('./views/pages/register/Edit_register'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/events', name: 'Eventos', component: Events },
  { path: '/register-events', name: 'Cadastrar evento', component: Register_events },
  { path: '/edit-register', name: 'Editar cadastro', component: Edit_register },
  {
    path: '/user-events-particip',
    name: 'Eventos que participo',
    component: User_events_particip,
  },
  { path: '/user-events', name: 'Eventos que criei', component: MyEvents },
]

export default routes
