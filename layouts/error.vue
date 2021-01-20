<template>
  <div class="maz-flex maz-direction-column maz-flex-center maz-flex-1">
    <template v-if="error.statusCode === 404">
      <h1>Page not found</h1>
      <p>
        {{ error.message }}
      </p>
    </template>
    <template v-else>
      <h1>An error occurred</h1>
    </template>
    <Button :to="{ name: 'index' }" class="mt-4">
      Back to home page
    </Button>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
