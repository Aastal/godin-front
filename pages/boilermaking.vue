<script setup>
import { useSectionStore } from '~/stores/section'
import { storeToRefs } from 'pinia'
import { useRuntimeConfig } from '#app'
import { computed } from 'vue'

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

const config = useRuntimeConfig()
const cloudFrontUrl = computed(() => config.public.cloudfrontUrl)
const pageAssetsUrl = cloudFrontUrl.value + '/public/sections/boilermaking'
const images = {
  hopper: 'quarry-hopper.jpg',
  chassisShelter: 'chassis-shelter.jpg',
  shelterPainted: 'shelter-painted.jpg',
}
</script>

<template>
  <div>
    <Header
      id="boilermaking-header"
      :title="$t('headers.boilermaking.title')"
    />
    <SectionWrapper
      class="container boilermaking-section"
      v-for="section in getSectionByPage('boilermaking')"
      :key="section.id"
      :section="section"
    />
    <section class="boilermaking-section">
      <List class="images-list" :columns="3" list-style="grid">
        <div
          v-for="(image, key) in images"
          :key="key"
          class="images-list__container"
        >
          <SectionImage :key="image" :image="`${pageAssetsUrl}/${image}`" />
          <h4>{{ $t(`pages.boilermaking.images.${key}`) }}</h4>
        </div>
      </List>
    </section>
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

  .images-list {
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      :deep(.section-image) {
        .image {
          width: 450px;
          height: 320px;
        }
      }

      h4 {
        font-size: 1.8rem;
        color: #fff;
        background-color: $blue-text-color;
        padding: 16px;
        margin: -32px 0 0 0;
      }
    }
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
