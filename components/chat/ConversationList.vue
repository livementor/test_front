<template>
  <div>
    <template v-for="(conversation, index) in conversations">
      <NuxtLink :key="index" :to="`/chat/conversations/${conversation.id}`" class="sm:flex sm:py-2 sm:px-2">
        <img class="block mx-auto h-12 rounded-full sm:mx-0 sm:flex-shrink-0" :src="authUser.avatar">
        <div class="space-y-0.5">
          <p class="text-lg text-black font-semibold">
            {{ conversation.title }}
          </p>
          <p class="text-sm text-black font-medium">
            <template v-if="users && authUser">
              <template v-for="(userId, userIndex) in conversation.participants">
                <template v-if="userId != authUser ">
                  <span :key="userIndex">{{ users[userId] && users[userId].name }}</span>
                </template>
              </template>
            </template>
          </p>
        </div>
      </NuxtLink>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @State(state => state.conversations) conversations:any
  @State(state => state.users) users: any
  @State(state => state.users.authUser) authUser: any
}
</script>
