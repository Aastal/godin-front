<script setup>
import { useSectionStore } from '~/stores/section'
import { storeToRefs } from 'pinia'
import { useRuntimeConfig } from '#app'

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

const { t } = useI18n()

useSeoMeta({
  title: t('pages.history.title') + ' - Godin SAS',
  ogTitle: t('pages.history.title') + ' - Godin SAS',
  description: t('pages.history.text'),
  ogDescription: t('pages.history.text'),
  ogImage: useRuntimeConfig().public.apiUrl + '/logo-name.svg',
})
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
  padding: 32px 15%;

  @media (max-width: $breakpoint-sm) {
    padding: 32px 0;
  }
}
</style>
