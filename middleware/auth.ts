export default function (ctx: any) {
  const isUserLoggedIn = ctx.store.state.users.authUser
  const isHomeRoute = ctx.route.name === 'index'
  const isLoginRoute = ctx.route.name === 'login'

  if (!isUserLoggedIn && !isLoginRoute && !isHomeRoute) {
    return ctx.redirect('/login')
  }

  if (isUserLoggedIn && isLoginRoute) {
    ctx.redirect('/chat')
  }
}
