<script setup>
import { useSectionStore } from '~/stores/section'
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'default',
})

const { t } = useI18n()

useHead({
  title: t('pages.silos.title') + ' - Godin SAS',
})

const filters = [
  {
    name: 'section-page',
    path: 'field_page',
    value: 'boilermaking',
    operator: '=',
  },
]
const include = ['field_image']

const sectionStore = useSectionStore()
await useAsyncData('section', () => sectionStore.fetchAll(filters, include))
const { getSectionByPage } = storeToRefs(sectionStore)
</script>

<template>
  <div>
    <Header
      id="boilermaking-header"
      :title="$t('headers.boilermaking.title')"
    />
    <SectionBlock
      class="container boilermaking-section"
      v-for="section in getSectionByPage('boilermaking')"
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
.boilermaking-section {
  padding-top: 32px;
  padding-bottom: 32px;

  .link {
    margin-top: 16px;
  }

  &--shadow {
    @include box-shadow(0, 4px, 16px, rgba(0, 0, 0, 0.1), true);
  }
}

h3 {
  text-align: left;
}

p {
  font-family: $light-font;
  font-size: 1.4rem;
}
</style>
