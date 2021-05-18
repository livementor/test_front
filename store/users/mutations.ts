import Vue from 'vue'
import { User } from '~/models/user'

export default {
  ON_AUTH_STATE_CHANGED_MUTATION (state: any, ctx: any) {
    if (ctx.authUser) {
      const { uid, email, displayName, photoURL } = ctx.authUser
      const user: User = {
        id: uid,
        username: 'username',
        name: displayName ?? 'name',
        email: email ?? '',
        avatar: photoURL ?? 'avatar_url',
      }
      state.authUser = user.id
      Vue.set(this, user.id, user)
    }
  },
  SET_USER (user: User) {
    Vue.set(this, user.id, user)
  },
  SET_AUTH_USER (state: any, id: string) {
    state.authUser = id
  },
  LOGOUT_USER (state: any) {
    delete state[state.authUser]
    state.authUser = undefined
  },
}
