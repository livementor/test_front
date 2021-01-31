<template>
    <img :src="img" class="rounded-full h-12 w-12" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Avatar extends Vue {
    @Prop({ default: '/images/profile.jpg' }) img!: string;
}
</script>