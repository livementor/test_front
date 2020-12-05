export default function (ctx: any) {
  if (!ctx.store.state.users.authUser) {
    if (ctx.route.name !== 'login') { ctx.redirect('/login') }
    return
  }
  if (ctx.route.name === 'login') {
    ctx.redirect('/chat')
  }
}
