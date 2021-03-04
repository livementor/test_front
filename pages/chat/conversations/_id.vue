<template>
  <div class="flex flex-col" style="height: calc(100vh - 4rem);">
    <div class="relative flex-grow flex flex-col overflow-hidden">
      <transition name="fade">
        <div
          v-if="isLoading"
          class="absolute top-0 left-0 w-full h-full z-10 bg-white flex items-center justify-center text-xl font-bold"
        >
          Chargement ...
        </div>
      </transition>
      <span v-if="participant" class="text-2xl font-bold">
        {{ $t('chat.chatHeading', { user: participant.displayName }) }}
      </span>

      <div class="flex-grow mb-3 mt-1 flex rounded mx-1 h-1">
        <div
          v-if="reversedMessages && reversedMessages.length"
          class="space-y-1 self-end w-full flex flex-col-reverse overflow-auto relative h-full pr-3"
        >
          <span
            v-for="(message, idx) in reversedMessages"
            :key="message.id"
            :class="idx % 2 ? 'self-start text-left' : 'self-end text-right'"
          >
            <Message v-bind="message" :isOwnMessage="!(idx % 2)" />
          </span>
        </div>

        <div
          v-else-if="participant"
          class="flex items-center justify-center select-none w-full"
        >
          <div class="font-bold text-gray-400">
            {{ $t('chat.noMessages', { user: participant.displayName }) }}
          </div>
        </div>
      </div>
    </div>

    <InputMessage
      class="w-full flex-shrink-0"
      :isLoading="isLoading"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import InputMessage from '@/components/chat/InputMessage'
import Message from '@/components/chat/Message'

export default {
  components: {
    InputMessage,
    Message,
  },

  data: () => ({
    isLoading: false,
    participant: undefined,
  }),

  computed: {
    ...mapState('conversations', {
      conversations: 'converstations',
    }),
    ...mapState('messages', {
      messages: 'messages',
    }),

    reversedMessages() {
      const tempMessages = [...this.messages]
      return tempMessages.reverse()
    },
  },

  watch: {
    '$route.params.id': {
      immediate: true,
      async handler(val) {
        try {
          this.isLoading = true
          const ref = await this.$fire.firestore
            .collection('conversations')
            .doc(this.$route.params.id)
            .get()

          const conv = ref.data()

          const otherParticipantId = conv.participants.find(
            id => id !== this.$store.state.users.user.id,
          )

          const doc = await this.$fire.firestore
            .collection('users')
            .doc(otherParticipantId)
            .get()
          if (!doc.exists) {
            throw Error
          }
          this.participant = doc.data()

          this.$store.commit('conversations/SET_CURRENT_CONVERSATION_ID', val)

          await this.$store.dispatch(
            'messages/fetchMessagesForConversation',
            val,
          )
          await new Promise(resolve => setTimeout(resolve, 1000))
          console.log(1)
        } catch (e) {
          this.error = 'Error while fetching user'
        } finally {
          this.isLoading = false
        }
      },
    },
  },

  methods: {
    async onSubmit(text) {
      if (!text) {
        return
      }

      try {
        this.isLoading = true
        await this.$store.dispatch('messages/createMessage', {
          conversationId: this.$route.params.id,
          message: {
            text,
          },
        })
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
