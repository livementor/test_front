import { Middleware } from '@nuxt/types'

const authMiddleware: Middleware = ({ store, route, redirect }) => {
  if (!store.state.users.user) {
    if (route.name !== 'login') {
      redirect('/login')
    }
    return
  }
  if (route.name === 'login') {
    redirect('/chat')
  }
}

export default authMiddleware
