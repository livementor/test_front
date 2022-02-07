<template>
  <div>
    <div class="flex px-6 py-10"
         :class="{'justify-end': isCurrentUser }"
    >
      <div class="flex justify-end">
        <div class="flex flex-col space-y-2 max-w-xs mx-2 order-2 items-start">
          <div>
            <span>
              <p class="flex text-sm font-semibold text-gray-800 mb-3 float-right">
                {{ date }}
              </p>
              <p class="px-4 py-2 rounded-lg bg-white shadow-md mt-6">
                {{ text }}
              </p>

            </span>
          </div>
        </div>

        <img
          :src="`https://i.pravatar.cc/150?img=${message.img}`"
          alt="Profile Picture"
          class="w-10 h-10 rounded-full order-1"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Message } from '@/models/message'
@Component
export default class MessageAutor extends Vue {
  @Prop() readonly message: Message | undefined
  get text (): string {
    return this.message ? this.message.text : ''
  }

  get author (): string {
    return this.message ? this.message.author : ''
  }

  get isCurrentUser (): boolean {
    if (!this.$fire.auth.currentUser) {
      return false
    }
    return this.$fire.auth.currentUser.uid === this.author
  }

  get date (): string {
    if (this.$i18n.locale === 'fr') {
      return this.$dayjs(this.message?.createdAt).format('dddd DD MMM, HH:mm',
      )
    }
    return this.$dayjs(this.message?.createdAt).format(
      'dddd DD MMM, HH:mm',
    )
  }
}
</script>

<style scoped>

</style>
