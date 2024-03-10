<script setup>
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'

defineProps({
  id: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
})

const config = useRuntimeConfig()
const cloudFrontUrl = computed(() => config.public.cloudfrontUrl)
</script>

<template>
  <section
    :class="`${id}`"
    :style="`background-image: url(${cloudFrontUrl + '/public/assets/silos-grains.jpg'})`"
  >
    <h1 v-html="title"></h1>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: relative;
  background-size: cover;
  background-position-y: 60%;
  background-repeat: no-repeat;
  z-index: 2;
  padding: 64px 0;

  &:before {
    z-index: 1;
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $blue-text-color;
    opacity: 0.82;
  }

  @media (max-width: $breakpoint-sm) {
    padding: 64px 0;
  }
}

h1 {
  position: relative;
  color: $light-text-color;
  font-size: 2.5rem;
  text-transform: uppercase;
  text-align: center;
  white-space: break-spaces;
  z-index: 2;

  @media (max-width: $breakpoint-sm) {
    font-size: 2rem;
  }
}
</style>
