<template>
<div>
  <Header id="benefit-header" :title="$t('headers.benefit.title')" />
  <section class="container benefit-section">
    <h2>{{ $t('pages.benefit.text') }}</h2>
    <Button class="solutions-btn" :label="$t('our_solutions')" :to="localePath('silos')" />
  </section>
  <section class="container benefit-section">

  </section>
</div>
</template>

<script>
export default {
  name: 'Benefit',
  layout: 'main',
  nuxtI18n: {
    paths: {
      fr: '/prestations',
      en: '/benefit',
    }
  },
  head () {
    return {
      title: this.$i18n.tc('pages.benefit.title') + ' - Godin SAS'
    }
  },
}
</script>

<style lang="scss" scoped>
.benefit-section {
  padding: 32px 0;
}

h2 {
  padding: 0 20%;
  text-align: center;
  font-style: italic;

  @media (max-width: $breakpoint-sm) {
    padding: 0 5%;
  }
}

.solutions-btn {
  display: block;
  margin: 32px auto 0 auto;
  width: 100%;
}
</style>
