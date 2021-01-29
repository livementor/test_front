<template>
  <div class="p-10 text-center items-center content-center">
    <p class="heading text-24 mb-10">
      {{ $t('login.welcome') }}
    </p>
    <p class="text-gray-text text-16 mb-3">
      {{ getSubtitle }}
    </p>
    <div v-if="shouldLogin || shouldRegister" class="w-64 m-auto">
      <input v-model="email"
             type="text"
             class="m-auto rounded-full w-full"
             :placeholder="$t('login.emailPlaceholder')"
      >
      <input v-model="password" type="password" class="m-auto mt-2 rounded-full w-full" :placeholder="$t('login.passwordPlaceholder')">
      <Button :text="shouldLogin ? $t('login.loginButton') : $t('login.registerButton') " class="w-full mt-2" @click.native="buttonClicked()" />
    </div>
    <div class="w-64 m-auto">
      <Button v-if="!shouldLogin" :text="$t('login.loginButton')" class="w-full mt-2" @click.native="shouldRegister = false; shouldLogin = true" />
      <Button v-if="!shouldRegister" :text="$t('login.registerButton')" class="w-full mt-2" @click.native="shouldRegister = true; shouldLogin = false" />
    </div>
  </div>
</template>

<script>
import { NotificationType } from '@/models/notification'

export default {
  data: () => {
    return {
      email: '',
      displayName: '',
      password: '',
      shouldLogin: false,
      shouldRegister: false,
    }
  },
  computed: {
    getSubtitle () {
      if (!this.shouldLogin && !this.shouldRegister) {
        return this.$t('login.default')
      }
      return this.shouldLogin ? this.$t('login.login') : this.$t('login.register')
    },
  },
  methods: {
    buttonClicked () {
      if (this.shouldRegister) {
        this.$fire.auth.createUserWithEmailAndPassword(this.email, this.password).then((response) => {
          if (response.user) {
            this.$store.dispatch('setAuthUser', response.user.uid)
            this.$router.replace('/chat')
          }
        }).catch((e) => {
          this.$store.dispatch('showNotification', { message: e.message, type: NotificationType.ERROR })
        })
      } else {
        this.$fire.auth.signInWithEmailAndPassword(this.email, this.password).then((response) => {
          if (response.user) {
            this.$store.dispatch('setAuthUser', response.user.uid)
            this.$router.replace('/chat')
          }
        }).catch((e) => {
          this.$store.dispatch('showNotification', { message: e.message, type: NotificationType.ERROR })
        })
      }
    },
  },
}
</script>
