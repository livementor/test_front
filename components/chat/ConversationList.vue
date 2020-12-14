<template>
  <div>
    <div class="text-gray-500 font-bold my-4 text-2xl text-center">
      Conversations
    </div>
    <div class="items">
      <NuxtLink
        v-for="(conversation, index) in conversations"
        :key="`conversation-${conversation.id}`"
        :to="`/chat/conversations/${conversation.id}`"
      >
        <div
          :class="[
            'items__tile flex items-center p-6 bg-white rounded-l-full',
            {
              'hover:bg-gray-100': conversation.id !== currentRouteId,
              'rounded-br-full':
                conversations[index + 1] &&
                conversations[index + 1].id === currentRouteId,
              'items__tile--active bg-indigo-100':
                conversation.id === currentRouteId,
              'rounded-tr-full':
                conversations[index - 1] &&
                conversations[index - 1].id === currentRouteId,
            },
          ]"
        >
          <template v-if="conversation.participants.length === 1">
            <div class="rounded-full overflow-hidden w-16 self-start">
              <img :src="conversation.participants[0].photoURL || 'https://via.placeholder.com/150'">
            </div>
            <div class="mx-4 flex-1 overflow-hidden">
              <div
                class="text-gray-700 font-bold"
                v-text="conversation.participants[0].displayName || conversation.participants[0].email"
              />
              <div v-if="conversation.lastMessage" class="text-gray-600">
                <div class="flex-1 truncate">
                  <span v-if="conversation.lastMessage.author === authUser.id">
                    {{ $t('chat.you') }} :
                  </span>
                  {{ conversation.lastMessage.text }}
                </div>
              </div>
            </div>
            <div class="text-gray-600" v-text="conversation.timeDistance" />
          </template>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const usersModule = namespace('users')
const chatModule = namespace('chat')

@Component
export default class ConversationList extends Vue {
  @usersModule.State authUser: any

  @chatModule.Getter conversations: any

  get currentRouteId () {
    return this.$route.params.id
  }
}
</script>
<style scoped>
.items {
  background: linear-gradient(to left, #ebf4ff, #ebf4ff 50%, #fff 50%);
}
.items__tile--active {
  box-shadow: inset 17px 0px 10px -10px #c8d7e8;
}
.items__tile:not(.items__tile--active):hover {
  box-shadow: -10px 0px 10px -5px #e0e0e0;
  background: linear-gradient(150deg, #ebf4ff, white 70%);
}
</style>
