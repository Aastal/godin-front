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
    <SectionBlock
      class="container history-section"
      v-for="section in getSectionByPage('history')"
      :key="section.id"
      icon-fleet
      :title="section.title"
      :title-en="section.field_title_en"
      :text="section.body.processed"
      :text-en="section.field_body_en.processed"
      :image="section.field_image?.uri.url"
      :subtitle="section.field_subtitle"
      :subtitle-en="section.field_subtitle_en"
      :link-text="section.field_link_text"
      :link-text-en="section.field_link_text_en"
      :link-target="section.field_link_target"
      :flip="section.field_flip"
    />
  </div>
</template>

<style lang="scss" scoped>
.history-section {
  padding-top: 32px;
  padding-bottom: 32px;
}
</style>
