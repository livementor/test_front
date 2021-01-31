<template>
    <div class="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
        <div class="flex items-center">
            <div>
                <img class="w-10 h-10 rounded-full" :src="img"/>
            </div>
            <div class="ml-4">
                <p class="text-grey-darkest">
                    {{ title }}
                </p>
                <p class="text-grey-darker text-xs mt-1">
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ConversationHeader extends Vue {
    @Prop({ default: 'unknown'}) title!: string;
    @Prop({ default: '/images/profile.jpg' }) img!: string;
    //@Prop({ default: ['default'] }) participants!: [string];

/*
    get getParticipants () {
      return this.participants.toString()
    }
    */
}
</script>