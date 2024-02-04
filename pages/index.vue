<script setup>
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'
import { useSectionStore } from '~/stores/section'
import { usePartnerStore } from '~/stores/partner'
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'default',
})

const filters = [
  {
    name: 'section-page',
    path: 'field_page',
    value: 'index',
    operator: '=',
  },
]
const include = ['field_image']

const sectionStore = useSectionStore()
const partnerStore = usePartnerStore()

await useAsyncData('section', () => sectionStore.fetchAll(filters, include))
const { getSectionByPage } = storeToRefs(sectionStore)

await useAsyncData('partner', () => partnerStore.fetchAll())
const { items: partners } = storeToRefs(sectionStore)

const config = useRuntimeConfig()
const cloudFrontUrl = computed(() => config.public.cloudfrontUrl)

const localePath = useLocalePath()
const isMobile = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
})
</script>

<template>
  <div class="index">
    <section class="home-header">
      <div class="title">
        <Icon class="redtriangle" name="RedTriangle" fill="#f4262c">
          <RedTriangle />
        </Icon>
        <h1 v-html="$t('pages.homepage.presentation')"></h1>
        <h2>{{ $t('pages.homepage.sub_presentation') }}</h2>
      </div>
      <div class="image-wrapper">
        <IconFleet :number="6" />
        <div class="image-container">
          <img
            class="silos-camion"
            :src="cloudFrontUrl + '/public/assets/home-header/back.jpg'"
            alt="back"
          />
          <img
            class="silos-grains"
            :src="cloudFrontUrl + '/public/assets/home-header/right.jpg'"
            alt="right"
          />
        </div>
      </div>
    </section>
    <SectionBlock
      v-for="section in getSectionByPage('index')"
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
    <section class="home-section home-section--secondary home-section--tight">
      <img
        class="soudure"
        :src="cloudFrontUrl + '/public/assets/home-section/boilermaking.jpg'"
        alt="boilermaking"
      />
      <div>
        <IconFleet :number="6" />
        <Information
          :title="$t('pages.homepage.section_metier_boilermaking.title')"
          type="blue"
        />
      </div>
    </section>
    <section
      class="home-section home-section--tight home-section--tight--secondary"
    >
      <img
        v-if="isMobile"
        class="grains"
        :src="cloudFrontUrl + '/public/assets/home-section/grains.png'"
        alt="grains"
      />
      <div>
        <IconFleet :number="6" />
        <Information
          :title="$t('pages.homepage.section_metier_benefit.title')"
          :text="$t('pages.homepage.section_metier_benefit.text')"
          type="blue"
        />
      </div>
      <img
        v-if="!isMobile"
        class="grains"
        :src="cloudFrontUrl + '/public/assets/home-section/grains.png'"
        alt="grains"
      />
    </section>
    <section class="home-section home-section--secondary home-section--tight">
      <img
        class="soudure"
        :src="cloudFrontUrl + '/public/assets/home-section/soudure.jpg'"
        alt="soudure"
      />
      <div>
        <IconFleet :number="6" />
        <Information
          :title="$t('pages.homepage.section_metier_silos.title')"
          :text="$t('pages.homepage.section_metier_silos.text')"
          type="blue"
        />
        <a class="link" :href="localePath({ name: 'silos' })">
          {{ $t('pages.homepage.section_metier_silos.link') }}
        </a>
      </div>
    </section>
    <section
      class="home-section home-section--secondary home-section--partners home-section--shadow"
    >
      <h2>{{ $t('pages.homepage.section_partners.title') }}</h2>
      <List v-if="partners" class="partners" :columns="4" list-style="grid">
        <img
          v-for="partner in partners"
          :key="partner.title"
          :src="partner.field_image.uri.url"
          :alt="partner.title"
        />
      </List>
    </section>
    <section class="home-section"></section>
  </div>
</template>

<style scoped lang="scss">
h1,
h2 {
  text-align: left;
  white-space: break-spaces;
}

h1 {
  font-family: $bold-font;
  font-size: 3rem;
  line-height: 110%;
  letter-spacing: 0.2rem;
}

h2 {
  line-height: 1.3;
  font-weight: 100;
  font-style: italic;
}

.home-section {
  display: flex;
  position: relative;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  background: $body-bg;
  z-index: 0;

  .link {
    margin-top: 16px;
    padding: 0 32px 0 0;
  }

  .mobile {
    display: none;
    width: 100%;
    padding-left: 16px;

    @media (max-width: $breakpoint-sm) {
      display: block;
    }
  }

  .desktop {
    display: block;

    @media (max-width: $breakpoint-sm) {
      display: none;
    }
  }

  img {
    width: 800px;
    @include border-radius(0 32px 32px 0);
  }

  &--secondary {
    background: $ternary-bg;
  }

  &--shadow {
    @include box-shadow(0, 4px, 16px, rgba(0, 0, 0, 0.1));
  }

  &--tight {
    position: relative;
    justify-content: normal;
    background: $body-bg;
    padding-top: 0;
    padding-bottom: 0;

    @media (max-width: $breakpoint-sm) {
      padding-top: 80px;
      padding-bottom: 80px;
    }

    .link,
    .information {
      transform: translate(-12%, 0);
    }

    &--secondary {
      justify-content: flex-end;
      background: $body-bg;
      @include box-shadow(0, 0, 0, rgba(0, 0, 0, 0.1), true);
      margin-top: 64px;

      .link,
      .information {
        transform: translate(12%, 0);
      }

      img {
        width: 800px;
        @include border-radius(32px 0 0 32px);
      }
    }

    @media (max-width: $breakpoint-sm) {
      justify-content: center;

      .link,
      .information {
        transform: none;
      }
    }
  }

  &--partners {
    flex-direction: column;
    padding: 64px 200px;
    margin-top: 64px;

    h2 {
      display: block;
      font-family: $bold-font;
      font-style: normal;
      text-align: center;
      font-size: 2.8rem;
      margin: 0;
    }

    .partners {
      margin-top: 32px;

      img {
        padding: 20px;
        width: 300px;
        height: 200px;
        object-fit: contain;
        background-color: #fff;
        @include border-radius(0);
      }
    }

    @media (max-width: $breakpoint-sm) {
      padding: 64px 0;
      margin-top: 0;
    }
  }

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    padding-top: 64px;
    padding-bottom: 64px;

    img {
      width: 100%;
      @include border-radius(0);
    }
  }

  &:last-child {
    padding-top: 64px;
    padding-bottom: 64px;
  }
}

.home-header {
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  min-height: 50vh;
  padding-top: 16px;

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    min-height: 0;
    padding-bottom: 80px;
  }

  .title {
    position: relative;
    padding-top: 64px;
    margin-left: 8%;
    min-width: 20%;

    svg {
      position: absolute;
      top: 115px;
      left: -16%;
    }

    h1 {
      :deep(i) {
        display: block;
        font-family: $bold-font;
        color: $secondary-text-color;
        font-style: normal;
        font-size: 5rem;
        line-height: 110%;
        margin-top: 8px;
        margin-left: 8px;
      }
    }

    @media (max-width: $breakpoint-sm) {
      h1 {
        margin-top: 0;
      }
    }
  }

  .image-wrapper {
    margin-right: 4%;

    @media (max-width: $breakpoint-sm) {
      display: none;
    }

    .image-container {
      min-height: 80vh;

      img {
        display: block;
        position: absolute;
        @include box-shadow(0, 4px, 4px, rgba(0, 0, 0, 0.5));
        @include border-radius(32px);

        &.silos-grue {
          width: 25%;
          top: 64px;
          right: 0;
        }

        &.silos-grains {
          width: 40%;
          top: 300px;
          left: 250px;
        }

        &.silos-camion {
          width: 50%;
          top: 0;
          left: 60%;
          transform: translate(-60%, 0);
        }
      }
    }
  }
}
</style>
