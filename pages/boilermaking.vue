<script setup lang="ts">
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

const images: Record<string, BenefitImage> = {
  hopper: {
    title: 'pages.boilermaking.images.hopper',
    path: 'boilermaking/quarry-hopper.jpg',
  },
  chassisShelter: {
    title: 'pages.boilermaking.images.chassisShelter',
    path: 'boilermaking/chassis-shelter.jpg',
  },
  shelterPainted: {
    title: 'pages.boilermaking.images.shelterPainted',
    path: 'boilermaking/shelter-painted.jpg',
  },
}
</script>

<template>
  <div>
    <Header
      id="boilermaking-header"
      :title="$t('headers.boilermaking.title')"
    />
    <section class="container boilermaking-section">
      <h2 class="subtitle">{{ $t('pages.benefit.text') }}</h2>
    </section>
    <SectionWrapper
      class="container boilermaking-section"
      v-for="section in getSectionByPage('boilermaking')"
      :key="section.id"
      :section="section"
    />
    <section
      v-if="Object.keys(images).length"
      class="boilermaking-section boilermaking-section--images"
    >
      <SectionImageList :images="images" listStyle="grid" :columns="3" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.boilermaking-section {
  padding: 32px 15%;

  &--images {
    padding: 64px 3%;
  }

  @media (max-width: $breakpoint-sm) {
    padding: 32px 0;
  }

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
