<template>
  <div
    :class="[
      {
        'text-right': isMessageFromUserAuth,
      },
    ]"
  >
    <div class="text-center text-gray-600 mb-3 mt-3">{{ dateFormatted }}</div>
    <div :class="['flex', { 'justify-end': isMessageFromUserAuth }]">
      <img
        v-if="!isMessageFromUserAuth"
        class="rounded-full h-6 w-6 mr-2"
        src="/img/avatar.png"
        :alt="message.author"
      />
      <div
        :class="[
          'p-2',
          'rounded',
          'message',
          {
            'bg-gray-300': !isMessageFromUserAuth,
            'bg-green-300': isMessageFromUserAuth,
          },
        ]"
      >
        <p class="text-sm text-black">
          {{ message.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class ConversationMesage extends Vue {
  @Getter("users/getAuthUserInfos")
  user: any;
  @Prop({ required: true }) message!: any;

  get isMessageFromUserAuth() {
    return this.user.id === this.message.author;
  }

  get dateFormatted() {
    const date = new Date(this.message.createdAt);

    const day = this.$t(`days[${date.getDay()}]`);
    const month = this.$t(`month[${date.getMonth()}]`);

    const dmy = `${day} ${date.getDate()} ${month} ${date.getFullYear()}`;

    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();

    return dmy + ", " + hours + ":" + minutes.substr(-2);
  }
}
</script>

<style scoped>
.message {
  max-width: 85%;
}

@media screen and (min-width: 768px) {
  .message {
    max-width: 65%;
  }
}
</style>
