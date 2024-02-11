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
    :class="[
      'section-layer',
      { 'section-layer--flip': !!flip },
      { 'section-layer--image': !!image },
    ]"
  >
    <div class="information">
      <slot name="text" />
    </div>
    <SectionImage v-if="image" :image="image" />
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

  @media (max-width: $breakpoint-sm) {
    justify-content: center;
    flex-direction: column;

    &--flip {
      flex-direction: column;

      .section-image {
        margin-top: 32px;
      }
    }
  }

  &--image {
    :deep(.section-image) {
      display: block;
      height: 100%;
      position: relative;
      width: 100%;

      .image-container {
        justify-content: flex-end;
      }
    }

    .section-image,
    .information {
      max-width: 45%;

      @media (max-width: $breakpoint-sm) {
        max-width: 100%;
      }
    }
  }

  &--flip {
    flex-direction: row-reverse;
    @include box-shadow(0, 4px, 16px, rgba(0, 0, 0, 0.1), true);

    :deep(.section-image) {
      .image-container {
        justify-content: flex-start;
      }
    }
  }

  @media (min-width: $breakpoint-lg) {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
