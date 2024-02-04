<script setup>
import { ref } from 'vue'
import { useEventBus } from '~/composables/useEventBus'

const { $on, $off } = useEventBus()

const disable = ref(false)

const disableBody = (state) => {
  disable.value = state
}

onMounted(() => {
  window.scrollTo(0, 0)
  $on('disable-body', disableBody)
})

onUnmounted(() => {
  $off('disable-body', disableBody)
})
</script>

<template>
  <AppBar />
  <NuxtPage class="main" />
  <Footer />
  <div v-if="disable" class="disable-bg" />
</template>
