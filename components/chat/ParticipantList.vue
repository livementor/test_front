<template>
  <p>
    {{ participants && participants.map(userId => getUserNameById(userId)).join(', ') }}
  </p>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ParticipantList extends Vue {
  @Prop() participants:any
  @Getter('users/getUserNameById') getUserNameById:any
}
</script>
