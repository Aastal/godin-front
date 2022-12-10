<template>
  <div class="succeed">
    <div v-if="paymentSuccess === true">
      <p class="succeed">
        {{ $t('quotation.sent') }}
      </p>
    </div>
    <div v-else>
      <p class="failed">
        {{ $t('quotation.error') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuotationSuccess',
  props: {
    paymentSuccess: {
      type: Boolean,
      default: null
    }
  }
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
}
</style>
