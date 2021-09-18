<template>
  <div v-if="conversations">
    <div v-for="(item, index) in conversations" :key="index">
      <div :class="item.id === currentRoot ? 'containerListActive' : 'containerList'">
        <NuxtLink :to="`/chat/conversations/${item.id}`">
          <div v-for="(participant , j) in item.participants" :key="j" class="list">
            <p>{{ participant === $fire.auth.currentUser.uid ? null : participant }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  currentRoot = ''
  @Getter('conversations/getConversations') getConversations:any
  @Watch('$route.params.id', { immediate: true })
  onPropertyChanged (id: any, _: any) {
    this.currentRoot = id
  }

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
  border-bottom: 1px solid lightgrey;
  padding: 10px;
}
.containerListActive{
  background-color: rgba(65, 132, 223, 1);
  padding: 10px;
  color: white;
}
.list{
  padding: 5px;
}
.containerList:hover{
  background-color: rgba(65, 132, 223, 0.4);
  color: white;
}

</style>
