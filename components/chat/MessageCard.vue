<template>
  <div class="chat-message">
    <div class="flex items-start justify-center">
      <span class="text-gray-600">{{ createdAtFR }}</span>
    </div>
    <div class="flex items-start"
         :class="{'justify-end': belongsToCurrentUser }"
    >
      <div />
      <div class="flex flex-col space-y-2 max-w-xs mx-2 order-2 items-start">
        <div>
          <span
            class="px-4 py-2 rounded-lg inline-block bg-white shadow-md"
            :class="{'bg-green-300': belongsToCurrentUser}"
          >
            {{ text }}
          </span>
        </div>
      </div>
      <img
        v-if="!belongsToCurrentUser"
        src="https://picsum.photos/100"
        alt="Profile Picture"
        class="w-6 h-6 rounded-full order-1"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Message } from '~/models/message'

@Component
export default class MessageCard extends Vue {
    @Prop() readonly message: Message | undefined

    get text (): string {
      return this.message ? this.message.text : ''
    }

    get author (): string {
      return this.message ? this.message.author : ''
    }

    get createdAtFR (): string {
      if (
        this.message &&
        this.message.createdAt !== null &&
        this.message.createdAt !== undefined
      ) {
        if (this.$i18n.locale === 'fr') {
          return this.$dateFns.format(
            this.message.createdAt, 'EEEE dd MMM, HH:mm', { locale: 'fr' },
          )
        }

        return this.$dateFns.format(
          this.message.createdAt, 'EEEE, MMM dd, hh:mm a',
        )
      }

      return ''
    }

    get belongsToCurrentUser (): boolean {
      if (!this.$fire.auth.currentUser) {
        return false
      }
      return this.$fire.auth.currentUser.uid === this.author
    }
}
</script>

<style scoped>

</style>
