<script setup>
import { storeToRefs } from 'pinia'
import { usePrestationStore } from '~/stores/prestation'
import { useSectionStore } from '~/stores/section'

definePageMeta({
  layout: 'default',
})

const filters = [
  {
    name: 'section-page',
    path: 'field_page',
    value: 'benefit',
    operator: '=',
  },
]
const include = ['field_image']

const sectionStore = useSectionStore()
const prestationStore = usePrestationStore()

await useAsyncData('section', () => sectionStore.fetchAll(filters, include))
const { getSectionByPage } = storeToRefs(sectionStore)

await useAsyncData('prestation', () => prestationStore.fetchAll())
const { items: benefits } = storeToRefs(prestationStore)

const { t } = useI18n()

useHead({
  title: t('pages.benefit.title') + ' - Godin SAS',
})

const localePath = useLocalePath()
</script>

<template>
  <div>
    <Header id="benefit-header" :title="$t('headers.benefit.title')" />
    <section class="container benefit-section">
      <h2 class="subtitle">{{ $t('pages.benefit.text') }}</h2>
      <Button
        class="solutions-btn"
        :label="$t('our_solutions')"
        :to="localePath('silos')"
      />
    </section>
    <SectionBlock
      class="container benefit-section"
      v-for="section in getSectionByPage('benefit')"
      :key="section.id"
      icon-fleet
      :title="section.title"
      :title-en="section.field_title_en"
      :text="section.body.processed"
      :text-en="section.field_body_en?.processed"
      :image="section.field_image?.uri.url"
      :subtitle="section.field_subtitle"
      :subtitle-en="section.field_subtitle_en"
      :link-text="section.field_link_text"
      :link-text-en="section.field_link_text_en"
      :link-target="section.field_link_target"
      :flip="section.field_flip"
    />
    <section v-if="benefits" class="container benefit-section">
      <h2 class="large center">{{ $t('our_achievements') }}</h2>
      <Carousel :benefits="benefits" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.benefit-section {
  padding-top: 32px;
  padding-bottom: 32px;
}

.solutions-btn {
  display: block;
  margin: 32px auto 0 auto;
  width: 100%;
}
</style>
