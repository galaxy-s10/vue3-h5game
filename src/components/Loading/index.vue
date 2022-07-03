<template>
  <div v-if="isLoading" class="loading-size-wrap" @click.stop>
    <div class="loading-size"></div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return { isLoading: props.loading };
  },
};
</script>

<style lang="scss" scoped>
.loading-size-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  .loading-size {
    position: fixed !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @include loading-size($px: 100px, $color: #eb68c4);
  }
}
</style>
