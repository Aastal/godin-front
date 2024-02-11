<script setup>
import { useSectionStore } from '~/stores/section'
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'default',
})

const filters = [
  {
    name: 'section-page',
    path: 'field_page',
    value: 'history',
    operator: '=',
  },
]
const include = ['field_image']

const store = useSectionStore()

await useAsyncData('section', () => store.fetchAll(filters, include))
const { getSectionByPage } = storeToRefs(store)
</script>

<template>
  <div>
    <Header id="history-header" :title="$t('headers.history.title')" />
    <SectionWrapper
      class="container history-section"
      v-for="section in getSectionByPage('history')"
      :key="section.id"
      :section="section"
    />
  </div>
</template>

<style lang="scss" scoped>
.history-section {
  padding-top: 32px;
  padding-bottom: 32px;
}
</style>
