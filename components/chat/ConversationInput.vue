<template>
  <div class="bg-grey-lighter px-4 py-4 flex items-center">
    <div class="flex-1 mx-4">
      <input class="w-full h-10 border rounded px-2 py-2" type="text" :value="message">
    </div>
    <div>
      <Button text="Envoyer" :onClick="clickHandler" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { User } from '~/models/user'

@Component
export default class ConversationInput extends Vue {
    @Getter('users/getAuthUser') authUser!: User;
    message: string = '';

    mounted () {
        console.debug(this.authUser);
    }

    clickHandler () {
      if (this.message !== '') {
        this.$store.dispatch('messages/createMessage', { conversationId: '', message: { author: this.authUser.id, text: this.message } }, { root: true })
      }
    }
}
</script>
