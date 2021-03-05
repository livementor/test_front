<template>
  <div>
    <div v-for="(id, index) in conversationsIds" :key="index" @click="currentTabIdx = index">
      <NuxtLink :to="`/chat/conversations/${id}`" class="text-blue-livementor">
        <ConversationTab
          :conversation="getConversations[id]"
          class="m-1 rounded-lg"
          :class="{'bg-gray-200': currentTabIdx === index}"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import ConversationTab from '~/components/chat/ConversationTab.vue'
@Component({
  components: { ConversationTab },
})
export default class ConversationList extends Vue {
  currentTabIdx = -1
  @Getter('conversations/getConversations') getConversations: any

  get conversationsIds () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return Object.keys(this.getConversations)
  }
}
</script>
