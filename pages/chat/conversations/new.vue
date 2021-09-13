<template>
  <div id="page-chat-conversation-new">
    <v-card outlined>
      <v-card-title class="menu-title">
        <users-select-list />
      </v-card-title>

      <v-divider />

      <v-card-text class="messages-window">
        Pas encore de message dans cette conversation
      </v-card-text>

      <v-divider />

      <v-card-title>
        <v-row>
          <v-col cols="11">
            <v-textarea
              outlined
              label="Message"
              no-resize
              rows="4"
            />
          </v-col>
          <v-col cols="1">
            <v-btn
              icon
              elevation="0"
            >
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
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
