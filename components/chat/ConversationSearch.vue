<template>
    <div class="p-2 bg-gray-200">
        <input type="text" class="w-full p-2 text-sm" placeholder="Search or start a new chat" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ConversationSearch extends Vue {
    @Prop({ default: 'Search or start new chat' }) placeholder!: string;
}
</script>