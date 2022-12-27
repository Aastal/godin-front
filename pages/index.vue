<template>
  <div>
    <section class="home-header">
      <div class="title">
        <icon class="redtriangle" name="RedTriangle" fill="#f4262c">
          <RedTriangle />
        </icon>
        <h1 v-html="$t('pages.homepage.presentation')"></h1>
        <h2>{{ $t('pages.homepage.sub_presentation') }}</h2>
      </div>
      <div class="image-wrapper">
        <div class="image-container">
          <img
            class="silos-camion"
            src="~/static/silos-camion.jpg"
            alt="silos-camion"
          />
          <img
            class="silos-grains"
            src="~/static/silos-grains.jpg"
            alt="silos-grains"
          />
          <img
            class="silos-grue"
            src="~/static/silos-grue.jpg"
            alt="silos-grue"
          />
        </div>
      </div>
    </section>
    <section class="home-section home-section--secondary">
      <!--      Todo: Linkedin -->
    </section>
    <SectionBlock
      class="container history-section"
      v-for="section in sectionByPage('index')"
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
        class="silos-grains"
        src="~/static/silos-grains.jpg"
        alt="silos-grains"
      />
      <div>
        <Information
          :title="$t('pages.homepage.section_metier_silos.title')"
          :text="$t('pages.homepage.section_metier_silos.text')"
          type="blue"
        />
        <a class="link" :href="localePath({ name: 'silos' })">{{
          $t('pages.homepage.section_metier_silos.link')
        }}</a>
      </div>
    </section>
    <section
      class="home-section home-section--tight home-section--tight--secondary"
    >
      <img
        v-if="isMobile"
        class="soudure"
        src="~/static/soudure.jpg"
        alt="soudure"
      />
      <div>
        <IconFleet :number="6" />
        <Information
          :title="$t('pages.homepage.section_metier_benefit.title')"
          :text="$t('pages.homepage.section_metier_benefit.text')"
          type="blue"
        />
        <a class="link left desktop" :href="localePath({ name: 'silos' })">
          {{ $t('pages.homepage.section_metier_benefit.link') }}
        </a>
      </div>
      <img
        v-if="!isMobile"
        class="soudure"
        src="~/static/soudure.jpg"
        alt="soudure"
      />
      <a class="link left mobile" :href="localePath({ name: 'silos' })">
        {{ $t('pages.homepage.section_metier_benefit.link') }}
      </a>
    </section>
    <section
      class="home-section home-section--secondary home-section--partners home-section--shadow"
    >
      <h2>{{ $t('pages.homepage.section_partners.title') }}</h2>
      <list v-if="partners" class="partners" :columns="4" list-style="grid">
        <img
          v-for="partner in partners"
          :key="partner.title"
          :src="partner.field_image.uri.url"
          :alt="partner.title"
        />
      </list>
    </section>
    <section class="home-section"></section>
  </div>
</template>

<script>
import { sentryNormalizeException } from '@/utils/handle-error'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Homepage',
  components: {
    Icon: () => import('../components/icon/Icon'),
    RedTriangle: () => import('../components/icon/icons/RedTriangle'),
    IconFleet: () => import('../components/icon/IconFleet'),
  },
  layout: 'main',
  head() {
    return {
      title: this.$i18n.tc('pages.homepage.title') + ' - Godin SAS',
    }
  },
  async fetch() {
    try {
      const filter =
        'filter[section-page][condition][value]=index' +
        '&filter[section-page][condition][operator]=%3D'
      const include = ['image']

      await this.findAllSections({ filter, include })
      await this.findAllPartners({ include })
    } catch (e) {
      console.error(e)
      const exception = sentryNormalizeException(e)
      this.$sentry.captureException(exception)
    }
  },
  computed: {
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    },
    ...mapGetters('section', {
      isLoading: 'isLoading',
      sectionByPage: 'sectionByPage',
    }),
    ...mapGetters('partner', {
      isLoading: 'isLoading',
      partners: 'items',
    }),
  },
  methods: {
    ...mapActions('section', {
      findAllSections: 'findAll',
    }),
    ...mapActions('partner', {
      findAllPartners: 'findAll',
    }),
  },
}
</script>

<style lang="scss" scoped>
h1,
h2 {
  text-align: left;
  white-space: break-spaces;
}

h1 {
  font-size: 3rem;
  line-height: 110%;
}

h2 {
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
  }

  &--secondary {
    background: $ternary-bg;
  }

  &--shadow {
    @include box-shadow(0, 4px, 16px, rgba(0, 0, 0, 0.1), true);
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

    h2 {
      display: block;
      font-family: $primary-font;
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
      }
    }

    @media (max-width: $breakpoint-sm) {
      padding: 64px 0;
    }
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
  }

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    padding-top: 64px;
    padding-bottom: 64px;

    img {
      width: 100%;
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
      ::v-deep > i {
        display: block;
        color: $secondary-text-color;
        font-style: normal;
        font-size: 5rem;
        font-weight: 700;
        line-height: 110%;
      }
    }

    @media (max-width: $breakpoint-sm) {
      h1 {
        margin-top: 0;
      }
    }
  }

  .image-wrapper {
    @media (max-width: $breakpoint-sm) {
      display: none;
    }

    .image-container {
      img {
        display: block;
        position: absolute;
        @include box-shadow(0, 4px, 4px, rgba(0, 0, 0, 0.5));

        &.silos-grue {
          width: 25%;
          top: 64px;
          right: -25px;
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
