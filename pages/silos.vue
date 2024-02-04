<script setup>
import { useSectionStore } from '~/stores/section'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

definePageMeta({
  layout: 'default',
})

const { t } = useI18n()

useHead({
  title: t('pages.silos.title') + ' - Godin SAS',
})

const localePath = useLocalePath()

const filters = [
  {
    name: 'section-page',
    path: 'field_page',
    value: 'silos',
    operator: '=',
  },
]
const include = ['field_image']

const sectionStore = useSectionStore()
await useAsyncData('section', () => sectionStore.fetchAll(filters, include))
const { getSectionByPage } = storeToRefs(sectionStore)

const config = useRuntimeConfig()
const cloudFrontUrl = computed(() => config.public.cloudfrontUrl)
</script>

<template>
  <div>
    <Header id="silos-header" :title="$t('headers.silos.title')" />
    <section class="container silos-section">
      <h2 class="subtitle">{{ $t('pages.silos.text') }}</h2>
      <Button
        class="solutions-btn"
        :label="$t('our_benefit')"
        :to="localePath('benefit')"
      />
    </section>
    <SectionBlock
      class="container silos-section"
      v-for="section in getSectionByPage('silos')"
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
    <section
      class="silos-background"
      :style="`background-image: url(${cloudFrontUrl + '/public/assets/silos-pub.jpg'})`"
    ></section>
  </div>
</template>

<style lang="scss" scoped>
.silos-section {
  padding-top: 32px;
  padding-bottom: 32px;

  .link {
    margin-top: 16px;
  }

  &--shadow {
    @include box-shadow(0, 4px, 16px, rgba(0, 0, 0, 0.1), true);
  }
}

.silos-background {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  height: 600px;
}

.solutions-btn {
  display: block;
  margin: 32px auto 0 auto;
  width: 100%;
}
</style>
