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
      class="container history-section"
      v-for="section in sectionByPage('benefit')"
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
    <section class="container benefit-section">
      <h2 class="large center">{{ $t('our_achievements') }}</h2>
      <carousel v-if="benefits">
        <PrestationSlide
          v-for="benefit in benefits"
          :key="benefit.id"
          :title="benefit.title"
          :description="benefit.body.processed"
          :image="benefit.field_image?.uri.url"
        />
      </carousel>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { sentryNormalizeException } from '@/utils/handle-error'

export default {
  name: 'Benefit',
  components: {
    Icon: () => import('../components/icon/Icon'),
    IconFleet: () => import('../components/icon/IconFleet'),
  },
  layout: 'main',
  nuxtI18n: {
    paths: {
      fr: '/prestations',
      en: '/benefit',
    },
  },
  async fetch() {
    try {
      const filter = 'filter[section-page][condition][path]=field_page' +
        '&filter[section-page][condition][value]=benefit' +
        '&filter[section-page][condition][operator]=%3D'
      const include = ['field_image']

      await this.findAllSection({ filter, include })
      await this.findAllBenefit({ include })
    } catch (e) {
      console.error(e)
      const exception = sentryNormalizeException(e)
      this.$sentry.captureException(exception)
    }
  },
  head() {
    return {
      title: this.$i18n.tc('pages.benefit.title') + ' - Godin SAS',
    }
  },
  computed: {
    ...mapGetters('prestation', {
      isLoadingBenefit: 'isLoading',
      benefits: 'items',
    }),
    ...mapGetters('section', {
      isLoading: 'isLoading',
      sectionByPage: 'sectionByPage',
    }),
  },
  methods: {
    ...mapActions('prestation', {
      findAllBenefit: 'findAll',
    }),
    ...mapActions('section', {
      findAllSection: 'findAll',
    }),
  },
}
</script>

<style lang="scss" scoped>
.benefit-section {
  padding-top: 32px;
  padding-bottom: 32px;
}

h3 {
  text-align: left;
}

p {
  font-family: $light-font;
  font-size: 1.4rem;
}

.solutions-btn {
  display: block;
  margin: 32px auto 0 auto;
  width: 100%;
}
</style>
