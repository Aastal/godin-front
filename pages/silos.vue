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
      class="container history-section"
      v-for="section in sectionByPage('silos')"
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
    <section class="silos-background"></section>
  </div>
</template>

<script>
import { sentryNormalizeException } from '@/utils/handle-error'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Silos',
  components: {
    Icon: () => import('../components/icon/Icon'),
    IconFleet: () => import('../components/icon/IconFleet'),
  },
  layout: 'main',
  nuxtI18n: {
    paths: {
      fr: '/silos',
      en: '/silos',
    },
  },
  head() {
    return {
      title: this.$i18n.tc('pages.silos.title') + ' - Godin SAS',
    }
  },
  async fetch() {
    try {
      const filter =
        'filter[section-page][condition][value]=silos' +
        '&filter[section-page][condition][operator]=%3D'
      const include = ['image']

      await this.findAll({ filter, include })
    } catch (e) {
      const exception = sentryNormalizeException(e)
      this.$sentry.captureException(exception)
    }
  },
  computed: {
    ...mapGetters('section', {
      isLoading: 'isLoading',
      sectionByPage: 'sectionByPage',
    }),
  },
  methods: {
    ...mapActions('section', {
      findAll: 'findAll',
    }),
  },
}
</script>

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
  background-image: url('/silos-pub.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  height: 600px;
}

h3 {
  text-align: left;
}

p {
  font-family: $light-font;
  font-size: 1.4rem;
}

.list-title {
  margin-bottom: 0;
}

ul {
  li {
    font-family: $light-font;
    font-size: 1.4rem;
    margin-top: 4px;

    ::v-deep > b {
      font-family: $primary-font;
    }
  }

  &.circle {
    li {
      margin-top: 8px;
      white-space: break-spaces;

      &:before {
        display: inline-block;
        content: url('~/assets/images/BlueCircle.svg');
        width: 15px;
        height: 15px;
        margin-right: 10px;
      }
    }
  }
}

.solutions-btn {
  display: block;
  margin: 32px auto 0 auto;
  width: 100%;
}
</style>
