export default function({ store, route, redirect }: any) {
  const isUserLoggedIn = store.state.users.userId || userIsLoggedIn(store)
  const isHomeRoute = route.name === 'index'
  const isLoginRoute = route.name === 'login'

  if (!isUserLoggedIn && !isLoginRoute && !isHomeRoute) {
    return redirect('/login')
  }

  if (isUserLoggedIn && isLoginRoute) {
    redirect('/chat')
  }
}

// fake firebase
const userIsLoggedIn = (store: any) => {
  const localStorageUserId = localStorage.getItem('userId')
  const userIsLoggedIn = !!localStorageUserId

  if (userIsLoggedIn) {
    store.dispatch('users/setUserId', localStorageUserId)
  }

  return userIsLoggedIn
}
