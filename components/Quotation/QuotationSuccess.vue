<template>
  <div class="succeed">
    <div v-if="success">
      <p class="succeed">
        {{ $t('pages.quotation.form.sent') }}
      </p>
    </div>
    <div v-else>
      <p class="failed">
        {{ $t('pages.quotation.form.error') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuotationSuccess',
  props: {
    success: {
      type: Boolean,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.succeed {
  display: block;
  width: 100%;
  text-align: center;

  .succeed,
  .failed {
    font-family: $primary-font;
    font-size: 2rem;
    font-weight: 500;
  }

  .succeed {
    color: $ternary-text-color;
  }
}
</style>
