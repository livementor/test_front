<template>
  <div>
    <v-row>
      <v-col cols="12" md="3" class="no-padding">
        <v-card outlined class="full-height-card">
          <v-card-title class="ml-6 menu-title">
            Conversations
            <v-btn
              absolute
              right="0"
              icon
              to="/chat/conversations/new"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>

          <v-divider />

          <v-card-text>
            <ConversationList />
          </v-card-text>
        </v-card>
      </v-col>

      <v-divider vertical />

      <v-col cols="12" md="9" class="no-padding">
        <NuxtChild />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ConversationList from '~/components/chat/ConversationList.vue'

@Component({
  components: {
    ConversationList,
  },
})

export default class Chat extends Vue {
  @Watch('$store.state.users.authUser', { immediate: true })
  onChange (value: any) {
    if (value !== null && value !== undefined && value !== '') {
      this.$store.dispatch('conversations/fetchConversationsForCurrentUser')
    }
  }
}
</script>

<style lang="scss">
.no-padding {
  padding: 0 !important;

  .full-height-card {
    @media screen and (min-width: 960px) {
      height: calc( 100vh - 64px );
      border-radius: 0 !important;
    }
  }
}

</style>
