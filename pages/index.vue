<template>
  <div class="bg-white flex flex-col items-center p-10 w-full">
    <div class="w-2/3 m-auto">
      <p class="text-center text-4xl font-bold mb-4">
        {{ $t('home.welcome') }}
      </p>
      <p>
        {{ $t('home.description') }}
      </p>
    </div>
    <NuxtLink to="/login" class="m-auto mt-16">
      <Button :text="$t('home.start')" />
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Home extends Vue {
}

</script>
