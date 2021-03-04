<template>
  <span>
    <div
      class="px-3 py-1 rounded shadow-sm text-lg"
      :class="
        isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
      "
    >
      {{ text }}
    </div>
    <span style="font-size: 0.6rem;">
      {{
        new Date(createdAt).toLocaleDateString(undefined, {
          year: '2-digit',
          month: 'short',
          day: '2-digit',
        })
      }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Number,
      required: true,
    },

    isOwnMessage: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
