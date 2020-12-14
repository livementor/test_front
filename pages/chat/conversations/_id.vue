<template>
  <div class="flex flex-col flex-1 p-8 rounded-lg bg-indigo-100">
    <div class="flex flex-col flex-1 justify-end overflow-hidden">
      <div class="overflow-auto pb-4 flex flex-col-reverse">
        <div>
          <div v-for="(message, messageIndex) in messages" :key="`message-${messageIndex}`">
            <div
              v-if="message.dateShouldBeDisplayed"
              class="text-center text-gray-600 uppercase text-xs"
            >
              {{ message.date }}
            </div>
            <div
              :class="[
                message.isCurrentUserAuthor
                  ? 'self-end flex-row-reverse'
                  : 'self-start',
                'flex items-center my-2',
              ]"
            >
              <div class="rounded-full overflow-hidden w-12 self-start">
                <img :src="message.author.photoURL || 'https://via.placeholder.com/150'">
              </div>
              <div
                :class="[
                  'flex flex-col w-3/5',
                  (message.isCurrentUserAuthor) ? 'items-end' : 'items-start',
                ]"
              >
                <div
                  v-for="(content, contentIndex) in message.content"
                  :key="content.id"
                  :class="[
                    `p-3 rounded-${message.isCurrentUserAuthor?'l':'r'}-xl`,
                    {
                      'bg-white shadow-lg text-gray-600 ml-2': !message.isCurrentUserAuthor,
                      'bg-blue-900 text-white mr-2': message.isCurrentUserAuthor,
                      [`rounded-t${message.isCurrentUserAuthor?'r':'l'}-xl`]: contentIndex === 0,
                      [`rounded-b${message.isCurrentUserAuthor?'r':'l'}-xl`]: contentIndex === message.content.length - 1,
                      'mt-1': contentIndex > 0,
                    },
                  ]"
                >
                  {{ content.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex bg-white p-8 rounded-xl shadow-lg">
      <textarea
        class="flex-1 h-full"
        type="text"
        placeholder="Type a message here (NOT WORKING)"
      />
      <button
        class="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
        v-text="$t('chat.send')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const chatModule = namespace('chat')
const usersModule = namespace('users')

@Component
export default class Conversations extends Vue {
  @usersModule.State('authUser') authUser!: string
  @chatModule.Getter('messages') messages!: any[]

  get conversationId () {
    return this.$route.params.id
  }

  async created () {
    await this.$store.dispatch('chat/openConversation', this.$route.params.id)
  }
}
</script>
