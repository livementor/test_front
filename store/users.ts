import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'

import { NotificationType } from '@/models/notification'
import { User } from '../models/user'
import messages from '../mocks/messages'

export const state = () => ({
  authUser: null,
})

export const getters = {}

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION (state: any, { authUser }: { authUser: any }) {
    if (authUser) {
      const { uid, email, displayName, photoURL } = authUser
      const user = new User(uid, 'username', displayName || 'name', email || '', photoURL || '')
      state.authUser = user
    }
  },
  SET_USER (user: User) {
    Vue.set(this, user.id, user)
  },
  SET_AUTH_USER (state: any, id: string) {
    state.authUser = id
  },
  LOGOUT_USER (state: any) {
    state.authUser = null
  },
}

export const actions = {
  setAuthUser (store: any, id: string) {
    store.commit('SET_AUTH_USER', id)
  },
  async onAuthStateChangedAction (store : any, ctx: any) {
    if (!process.client) {
      return
    }
    if (ctx.authUser === null) {
      store.commit('LOGOUT_USER')
      return
    }
    if (!ctx.authUser) {
      store.dispatch('showNotification', { message: 'No user connected', type: NotificationType.ERROR }, { root: true })
    }
    const { uid, email, displayName, photoURL } = ctx.authUser
    const doc = await (this as any).$fire.firestore.collection('baechler_users').doc(uid).get()
    if (!doc.exists) {
      // Seed Data: vuex actions would be better for re-use but... time 😅

      const firestore = (this as any).$fire.firestore
      doc.ref.set({ uid, email, displayName, photoURL })

      async function createUser (data: { displayName: string, email: string, photoURL: string }) {
        const { displayName, email, photoURL } = data
        const docRef = await firestore.collection('baechler_users').add({ displayName, email, photoURL })
        await docRef.update({ uid: docRef.id })
        return docRef.id
      }

      async function createConversation (data: {
        messages: any[],
        participantId: string,
      }) {
        const { messages, participantId } = data
        const docRef = await firestore.collection('baechler_conversations').add({
          participants: [uid, participantId],
        })
        await docRef.update({
          id: docRef.id,
        })
        for (let i = 0; i < messages.length; i++) {
          const message = messages[i]
          const messageRef = await docRef.collection('messages').add({
            author: (message.userIsSender) ? uid : participantId,
            createdAt: message.createdAt.getTime(),
            text: message.text,
          })
          await messageRef.update({
            id: messageRef.id,
          })
          if (i === messages.length - 1) {
            // Update timestamps if last message
            await docRef.update({
              lastMessage: messageRef,
              updatedAt: message.createdAt.getTime(),
            })
          }
        }
      }

      const response = await (await fetch('https://randomuser.me/api/?results=7')).json()
      // Create the first 6 users
      for (let i = 0; i < response.results.length - 1; i++) {
        const result = response.results[i]
        const userId = await createUser({
          displayName: `${result.name.first} ${result.name.last}`,
          email: result.email,
          photoURL: result.picture.large,
        })
        await createConversation({
          messages: messages[i],
          participantId: userId,
        })
      }
      const user = firebase.auth().currentUser
      if (user) {
        user.updateProfile({
          photoURL: response.results[response.results.length - 1].picture.large,
        })
      }
      location.reload()
    }
  },
}
