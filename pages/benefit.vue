<script setup lang="ts">
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

await useAsyncData('prestation', () => prestationStore.fetchAll([], include))
const { items: benefits } = storeToRefs(prestationStore)

const { t } = useI18n()

useHead({
  title: t('pages.benefit.title') + ' - Godin SAS',
})

const localePath = useLocalePath()

const images: Record<string, BenefitImage> = {
  foldingMachine: {
    title: 'pages.benefit.images.foldingMachine.title',
    path: 'services/folding-machine.jpg',
    description: 'pages.benefit.images.foldingMachine.description',
  },
  plasmaInAction: {
    title: 'pages.benefit.images.plasmaInAction.title',
    path: 'services/plasma-in-action.jpg',
    description: 'pages.benefit.images.plasmaInAction.description',
  },
}
</script>

<template>
  <div>
    <Header id="benefit-header" :title="$t('headers.benefit.title')" />
    <section class="container benefit-section">
      <h2 class="subtitle">{{ $t('pages.benefit.text') }}</h2>
      <NuxtLink :to="localePath('silos')" class="quotation-button">
        {{ $t('our_solutions') }}
      </NuxtLink>
    </section>
    <SectionWrapper
      class="container benefit-section"
      v-for="section in getSectionByPage('benefit')"
      :key="section.id"
      :section="section"
    />
    <section
      v-if="Object.keys(images).length"
      class="benefit-section benefit-section--images"
    >
      <h2>{{ $t('pages.benefit.images.title') }}</h2>
      <SectionImageList :images="images" />
    </section>
    <section v-if="benefits" class="container benefit-section--carousel">
      <h2 class="large center">{{ $t('our_achievements') }}</h2>
      <Carousel :benefits="benefits" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.benefit-section {
  padding: 32px 15%;

  &--images {
    padding: 32px 10%;

    h2 {
      font-family: $primary-font;
      font-size: 3rem;
      margin-top: 16px;
      text-align: center;
      font-weight: 400;
      margin-bottom: 64px;
    }
  }

  &--carousel {
    padding: 32px 3%;
  }

  @media (max-width: $breakpoint-sm) {
    padding: 32px 0;
  }
}

.quotation-button {
  display: block;
  margin: 32px auto 0 auto;
  text-decoration: none;
  max-width: fit-content;
}
</style>
