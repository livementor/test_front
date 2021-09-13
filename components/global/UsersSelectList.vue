<template>
  <v-autocomplete
    class="user-select-list"
    :label="$t('chat.usersChoice')"
    :items="items"
    item-text="displayName"
    item-value="uid"
    multiple
    chips
    deletable-chips
    menu-props="auto"
    hide-details="auto"
  />
</template>

<script>
export default {
  data () {
    return {
      values: [],
      items: [
        {
          uid: '1',
          displayName: 'Bob Morane',
          email: 'bob.morane@livementor.com',
          photoURL: null,
        },
        {
          uid: '2',
          displayName: 'Jack Sparrow',
          email: 'jack.sparrow@livementor.com',
          photoURL: null,
        },
        {
          uid: '3',
          displayName: 'Diana Prince',
          email: 'diana.prince@livementor.com',
          photoURL: null,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.user-select-list {
  margin-top: -12px !important;

  .v-menu {
    display: inherit !important;

    .v-menu__content {
      min-width: 100% !important;
      left: 0 !important;

      .v-list-item__title {
        font-size: 14px;
      }

      .v-list-item__content {
        margin-left: 15px;
      }

      .v-icon {
        color: $color-main;
      }
    }
  }

  .v-chip {
    background-color: $color-main !important;
  }
}

</style>
