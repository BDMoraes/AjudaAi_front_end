import React from 'react'

const Events = React.lazy(() => import('./views/events/Events'))
const VolunteeredEvents = React.lazy(() => import('./views/events/VolunteeredEvents'))
const MyEvents = React.lazy(() => import('./views/events/MyEvents'))
const CreateEvents = React.lazy(() => import('./views/events/CreateEvents'))
const EditUser = React.lazy(() => import('./views/pages/register/EditUser'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/events', name: 'Eventos', component: Events },
  { path: '/register-events', name: 'Cadastrar evento', component: CreateEvents },
  { path: '/edit-register', name: 'Editar cadastro', component: EditUser },
  {
    path: '/volunteer-events',
    name: 'Eventos que participo',
    component: VolunteeredEvents,
  },
  { path: '/user-events', name: 'Eventos que criei', component: MyEvents },
]

export default routes
