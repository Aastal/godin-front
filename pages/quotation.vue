<script setup>
definePageMeta({
  layout: 'default',
})
</script>

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

<style lang="scss" scoped>
.quotation-section {
  padding: 32px 15%;

  @media (max-width: $breakpoint-sm) {
    padding: 32px 0;
  }

  &--form {
    @include box-shadow(0, 4px, 16px, rgba(0, 0, 0, 0.1), true);
  }
}
</style>
