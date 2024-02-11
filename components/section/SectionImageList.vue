<script setup lang="ts">
import { useRuntimeConfig } from '#app'
import { computed } from 'vue'

defineProps({
  images: {
    type: Object,
    required: true,
  },
})

const config = useRuntimeConfig()
const cloudFrontUrl = computed(() => config.public.cloudfrontUrl)
const pageAssetsUrl = cloudFrontUrl.value + '/public/sections'
</script>

<template>
  <List class="section-image-list" :columns="3" list-style="grid">
    <div v-for="(image, key) in images" :key="key" class="container">
      <SectionImage :key="image" :image="`${pageAssetsUrl}/${image.path}`" />
      <h4>{{ $t(image.title) }}</h4>
    </div>
  </List>
</template>

<style scoped lang="scss">
.section-image-list {
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    :deep(.section-image) {
      width: 100%;

      .image {
        width: 450px;
        height: 320px;

        @media (max-width: $breakpoint-sm) {
          width: 100%;
          height: 250px;
        }
      }
    }

    h4 {
      font-size: 1.8rem;
      color: #fff;
      background-color: $blue-text-color;
      padding: 16px;
      margin: -32px 0 0 0;
    }
  }
}
</style>
