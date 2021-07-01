<template>
  <div v-if="message">
    <b-alert show :variant="isCurrentUserMessage ? 'success' : 'primary'" class="w-50" :class="{'float-right' : isCurrentUserMessage}">
      <b-avatar :src="getUserById(message.author).avatar" class="mr-4" />
      <span class="Message-author">{{ getUserById(message.author).username }}</span>
      <span class="Message-createdAt">{{ $d(message.createdAt, 'long') }}</span>
      <p class="Message-text">
        {{ message.text }}
      </p>
    </b-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Prop({ required: true }) readonly message: any

  @Getter('users/getUserById') getUserById:any

  get isCurrentUserMessage () {
    return this.message.author === this.$fire.auth.currentUser?.uid
  }
}
</script>
