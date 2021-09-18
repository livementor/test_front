<template>
  <div>
    <div v-for="(item, index) in conversations" :key="index">
      <div class="containerList">
        <NuxtLink :to="`/chat/conversations/${item.id}`">
          <div v-for="(participant , j) in item.participants" :key="j">
            <p>{{ participant === $fire.auth.currentUser.uid ? null : participant }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations:any

  get conversations () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getConversations
  }
}
</script>

<style scoped>
.containerList{
  border: 1px solid black
}

</style>
