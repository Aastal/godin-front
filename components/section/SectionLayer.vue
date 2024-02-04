<script setup>
defineProps({
  image: {
    type: String,
    required: false,
  },
  flip: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section
    :class="['section-layer', { flip }, { 'section-layer--image': !!image }]"
  >
    <div class="information">
      <slot name="text" />
    </div>
    <div v-if="image" class="image-wrapper">
      <div class="image-container">
        <div class="image" :style="`background-image: url(${image})`"></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-layer {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;
  background: $body-bg;
  z-index: 0;

  &.flip {
    flex-direction: row-reverse;
    @include box-shadow(0, 4px, 16px, rgba(0, 0, 0, 0.1), true);

    .image-container {
      justify-content: start;
    }
  }

  @media (max-width: $breakpoint-sm) {
    justify-content: center;
    flex-direction: column;

    .image-wrapper {
      margin-top: 32px;
      margin-bottom: 0;
    }

    &.flip {
      flex-direction: column;

      .image-wrapper {
        margin-top: 32px;
      }
    }
  }

  &--image {
    .image-wrapper,
    .information {
      max-width: 45%;

      @media (max-width: $breakpoint-sm) {
        max-width: 100%;
      }
    }
  }

  @media (max-width: $breakpoint-lg) {
    justify-content: center;
  }
}

.image-wrapper {
  .image-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .image {
      display: block;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 500px;
      height: 500px;
      @include border-radius(32px);

      @media (max-width: $breakpoint-lg) {
        width: 450px;
        height: 450px;
      }

      @media (max-width: $breakpoint-md) {
        width: 400px;
        height: 400px;
      }

      @media (max-width: $breakpoint-sm) {
        width: 350px;
        height: 350px;
      }
    }
  }
}
</style>
