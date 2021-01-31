<template>
  <div class="flex mb-2" :class="[indented ? 'justify-end ' : '']">
    <div class="rounded py-2 px-3 " :class="[indented ? 'bg-green-200 ' : 'bg-white']">
      <p class="text-sm text-teal">
        {{ message.author }}
      </p>
      <p class="text-sm mt-1">
        {{ message.text }}
      </p>
      <p class="text-right text-xs text-grey-dark mt-1">
        {{ createAt }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Message } from '~/models/message'
import { User } from '~/models/user';

@Component
export default class ConversationSearch extends Vue {
 @Prop() message!: Message;
 @Prop() authUser!: User;

 get indented () {
   return this.message.author === this.authUser.id
 }

 get createAt () {
   return (new Date('1607260362155').getHours())
 }
}
</script>
