<template>
  <div
    class="flex items-center bg-gray-100 rounded overflow-hidden focus:shadow-outline shadow-x"
  >
    <input
      v-model.trim="text"
      :disabled="isLoading"
      type="text"
      class="w-full focus:outline-none focus:shadow-outline"
      :placeholder="isLoading ? 'Chargement ...' : 'Message ...'"
      @keydown.enter.prevent="beforeSubmit"
    />

    <button
      :disabled="isLoading"
      class="bg-blue-500 px-4 text-white focus:outline-none focus:shadow-outline h-full min-w-0"
      @click="beforeSubmit"
    >
      <Send class="w-6 h-6 text-white" />
    </button>
  </div>
</template>

<script>
import Send from '@/components/svg/Send'

export default {
  components: { Send },

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    text: '',
  }),

  methods: {
    beforeSubmit() {
      this.$emit('submit', this.text)
      this.text = ''
    },
  },
}
</script>

<style lang="postcss" scoped>
input {
  @apply py-2 border-none rounded-none bg-gray-100;

  &::placeholder {
    @apply text-gray-400;
  }
}
</style>
