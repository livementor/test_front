<template>
  <div>
    <v-card outlined>
      <v-card-title class="ml-6 menu-title">
        {{ $t('chat.noSelectedConversation') }}
      </v-card-title>

      <v-divider />
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class ChatRoot extends Vue {

}
</script>
