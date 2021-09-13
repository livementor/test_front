<template>
  <div id="page-chat-conversation-new">
    <v-card outlined>
      <v-card-title class="menu-title">
        Conversation {{ $route.params.id }}
      </v-card-title>

      <v-divider />

      <v-card-text class="messages-window">
        <div v-if="messagesMock.length > 0">
          <v-card
            v-for="(message, index) in messagesMock"
            :key="index"
            width="60%"
            class="mb-2"
            :class="message.author === 1 ? 'ml-auto' : ''"
          >
            <v-card-title><small>Envoyé le {{ message.createdAt }}</small></v-card-title>
            <v-card-text>
              {{ message.text }}
            </v-card-text>
          </v-card>
        </div>
        <span v-else>
          Pas encore de message dans cette conversation
        </span>
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
  get messagesMock () {
    return [
      {
        id: 1,
        author: 1,
        text: 'Salut Utilisateur 2, tu vas bien ?',
        createdAt: '2021-09-13 19:56:23',
      },
      {
        id: 2,
        author: 2,
        text: 'Je vais super bien merci, et toi ?',
        createdAt: '2021-09-13 19:58:26',
      },
      {
        id: 3,
        author: 1,
        text: 'Oh ça va nickel, je suis entrain de faire un test technique pour un entretien dans une boite qui a l\'air grave sympa',
        createdAt: '2021-09-13 20:02:44',
      },
    ]
  }
}
</script>
