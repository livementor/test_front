<template>
  <div class="room-header w-full font-bold p-4 maz-flex-fixed">
    <p>
      {{ $t('chat.selected_conversation', { roomId: $route.params.id }) }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MessageComponent extends Vue {
}
</script>

<style lang="scss" scoped>
.room-header {
  border-bottom: 0.125rem solid #F2F2F2;
  font-size: 1.2rem;
}
</style>
