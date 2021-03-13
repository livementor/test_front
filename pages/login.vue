<template>
  <div class="p-10 text-center items-center content-center">
    <p class="heading text-24 mb-10">
      {{ $t('login.welcome') }}
    </p>

    <p class="text-gray-text text-16 mb-3">
      {{ subtitle }}
    </p>

    <!-- note: should be a form -->
    <div v-if="showForm" class="w-64 m-auto">
      <input v-model="email" type="text" class="m-auto rounded-full w-full" :placeholder="$t('login.emailPlaceholder')">
      <input v-model="password" type="password" class="m-auto mt-2 rounded-full w-full" :placeholder="$t('login.passwordPlaceholder')">

      <Button :text="shouldLogin ? $t('login.loginButton') : $t('login.registerButton')" class="w-full mt-2" @click.native="submitForm" />
    </div>

    <div v-else class="w-64 m-auto">
      <Button v-if="!shouldLogin" :text="$t('login.loginButton')" class="w-full mt-2" @click.native="toggleModeTo(Mode.LOGIN)" />
      <Button v-if="!shouldRegister" :text="$t('login.registerButton')" class="w-full mt-2" @click.native="toggleModeTo(Mode.REGISTER)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { NotificationType } from '@/models/notification'

enum Mode {
  LOGIN,
  REGISTER,
}

@Component
export default class Login extends Vue {
  email: string = ''
  displayName: string = '' // not used
  password: string = ''
  shouldLogin: boolean = false
  shouldRegister: boolean = false
  Mode: any = Mode

  get subtitle() {
    if (!this.showForm) {
      return this.$t('login.default')
    }

    return this.shouldLogin ? this.$t('login.login') : this.$t('login.register')
  }

  get showForm() {
    return this.shouldLogin || this.shouldRegister
  }

  submitForm() {
    if (this.shouldRegister) {
      this.$fire.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(response => {
          if (response.user) {
            this.$store.dispatch('users/setAuthUser', response.user.uid)
            this.$router.replace('/chat')
          }
        })
        .catch(e => {
          this.$store.dispatch('showNotification', {
            message: e.message,
            type: NotificationType.ERROR,
          })
        })
    } else {
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(response => {
          if (response.user) {
            this.$store.dispatch('users/setAuthUser', response.user.uid)
            this.$router.replace('/chat')
          }
        })
        .catch(e => {
          this.$store.dispatch('showNotification', {
            message: e.message,
            type: NotificationType.ERROR,
          })
        })
    }
  }

  toggleModeTo(mode: Mode) {
    if (mode === Mode.LOGIN) {
      this.shouldRegister = false
      this.shouldLogin = true
    }

    if (mode === Mode.REGISTER) {
      this.shouldRegister = true
      this.shouldLogin = false
    }
  }
}
</script>
