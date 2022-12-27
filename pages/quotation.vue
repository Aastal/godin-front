<template>
  <div>
    <Header id="benefit-header" :title="$t('pages.quotation.title')" />
    <section class="container quotation-section">
      <h2 class="subtitle">{{ $t('pages.quotation.sub_title') }}</h2>
    </section>
    <section class="container quotation-section quotation-section--form">
      <QuotationForm />
    </section>
  </div>
</template>

<script>
export default {
  name: 'Quotation',
  components: {
    QuotationForm: () => import('../components/Quotation/QuotationForm'),
  },
  layout: 'main',
  nuxtI18n: {
    paths: {
      fr: '/devis',
      en: '/quotation',
    },
  },
}
</script>

<style lang="scss" scoped>
.quotation-section {
  padding-top: 32px;
  padding-bottom: 32px;

  &--form {
    @include box-shadow(0, 4px, 16px, rgba(0, 0, 0, 0.1), true);
  }
}
</style>
