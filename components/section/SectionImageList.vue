<script setup lang="ts">
import { useRuntimeConfig } from '#app'
import { computed } from 'vue'

defineProps({
  images: {
    type: Object,
    required: true,
  },
  listStyle: {
    type: String,
    default: 'flex',
  },
  columns: {
    type: Number,
    default: 3,
  },
})

const config = useRuntimeConfig()
const cloudFrontUrl = computed(() => config.public.cloudfrontUrl)
const pageAssetsUrl = cloudFrontUrl.value + '/public/sections'
</script>

<template>
  <List class="section-image-list" :listStyle="listStyle" :columns="columns">
    <div v-for="(image, key) in images" :key="key" class="container">
      <SectionImage :key="image" :image="`${pageAssetsUrl}/${image.path}`" />
      <h4>{{ $t(image.title) }}</h4>
      <p v-if="image.description" v-html="$t(image.description)"></p>
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
    width: auto;

    :deep(.section-image) {
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

    p {
      font-size: 1.2rem;
    }
  }
}
</style>
