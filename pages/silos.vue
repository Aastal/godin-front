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
      <NuxtLink :to="localePath('benefit')" class="quotation-button">
        {{ $t('our_benefit') }}
      </NuxtLink>
    </section>
    <SectionWrapper
      class="container silos-section"
      v-for="section in getSectionByPage('silos')"
      :key="section.id"
      :section="section"
    />
    <section
      class="silos-background"
      :style="`background-image: url(${cloudFrontUrl + '/public/assets/silos-pub.jpg'})`"
    ></section>
  </div>
</template>

<style lang="scss" scoped>
.silos-section {
  padding: 32px 15%;

  .link {
    margin-top: 16px;
  }

  &--shadow {
    @include box-shadow(0, 4px, 16px, rgba(0, 0, 0, 0.1), true);
  }

  @media (max-width: $breakpoint-sm) {
    padding: 32px 0;
  }
}

.silos-background {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  height: 600px;
}

.quotation-button {
  display: block;
  margin: 32px auto 0 auto;
  text-decoration: none;
  max-width: fit-content;
}
</style>
