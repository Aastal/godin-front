<script setup>
defineProps({
  image: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div v-if="image" class="section-image">
    <div class="image-container">
      <div class="image" :style="`background-image: url(${image})`"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-image {
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

@media (max-width: $breakpoint-sm) {
  .section-image {
    margin-top: 32px;
    margin-bottom: 0;
  }
}
</style>
