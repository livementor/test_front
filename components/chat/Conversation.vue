<template>
  <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
    <article class="flex p-4 space-x-4 hover:bg-gray-100 rounded-md">
      <div class="flex items-center">
        <img src="https://dummyimage.com/65x65/000/fff" loading="lazy" alt="" style="min-width: 65px; min-height: 65px" class="rounded-full object-cover bg-gray-100">
      </div>
      <div class="min-w-0 relative flex-auto">
        <h2 class="text-base sm:text-lg lg:text-base xl:text-lg font-semibold text-black mb-0.5 truncate">
          {{ conversation.title }}
        </h2>
        <p v-if="lastMessage" class="truncate-2-line">
          {{ lastMessage.text }}
        </p>
      </div>
    </article>
  </NuxtLink>
</template>

<script lang="ts">
import { Prop } from 'nuxt-property-decorator'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Conversation extends Vue {
  @Getter('conversations/getConversations') getConversations:any

  @Prop()
  conversation!: any

  get lastMessage () {
    return this.$store.getters['conversations/getLastMessage'](this.conversation.id)
  }

  async mounted () {
    await this.$store.dispatch('messages/fetchLastMessagesFromConversation', this.conversation.id)
  }
}
</script>

<style>
.truncate-2-line {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
