<template>
  <article class="p-4 flex space-x-4">
    <img :src="defaultImage" alt="" class="flex-none w-18 h-18 rounded-lg object-cover" width="50" height="50" />
    <div class="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
      <h2 class="text-lg font-semibold text-black mb-0.5">
        {{ item.title }}
      </h2>
      <div lass="flex flex-wrap text-sm">
        {{ item.id }}
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: true,
    }
  },
  data() {
    return {
      defaultImage: 'https://img2.freepng.fr/20180509/klq/kisspng-person-logo-computer-icons-5af2c2026fcf79.460327751525858818458.jpg',
    }
  }
}
</script>
