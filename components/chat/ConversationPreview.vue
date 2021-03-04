<template>
  <div
    class="rounded bg-white border-l-4 border-transparent shadow hover:shadow-md transition-shadow duration-300 overflow-hidden"
    :class="isActive ? 'border-blue-500' : ''"
  >
    <div v-if="error" class="p-2 bg-red-100 text-red-800 border-red">
      {{ error }}
    </div>
    <div v-else>
      <div v-if="$fetchState.pending">
        Loading ...
      </div>

      <NuxtLink
        :to="`/chat/conversations/${conversation.id}`"
        class="flex p-2 space-x-5 items-center"
        v-else
      >
        <div class="w-10 h-10 rounded-full bg-blue-500 overflow-hidden p-2">
          <img
            v-if="participant.photoURL"
            :src="participant.photoURL || '~/assets/avatar.png'"
            alt="User avatar"
          />
          <Avatar v-else class="w-full h-full text-white" />
        </div>

        <div class="flex flex-col space-y-2">
          <span class="font-bold">
            {{ participant.displayName }}
          </span>

          <span class="text-sm italic"> {{ conversation.title }} ... </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Avatar from '@/components/svg/Avatar'

export default {
  components: {
    Avatar,
  },

  props: {
    conversation: { type: Object, required: true },
    isActive: { type: Boolean, default: false },
  },

  data: () => ({
    participant: undefined,
    error: undefined,
  }),

  async fetch() {
    try {
      const otherParticipantId = this.conversation.participants.find(
        id => id !== this.user.id,
      )

      const doc = await this.$fire.firestore
        .collection('users')
        .doc(otherParticipantId)
        .get()

      if (!doc.exists) {
        throw Error
      }

      this.participant = doc.data()
    } catch (e) {
      this.error = 'Error while fetching user'
    }
  },

  computed: {
    ...mapState('users', {
      user: 'user',
    }),
  },
}
</script>
