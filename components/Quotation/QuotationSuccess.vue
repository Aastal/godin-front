<script setup>
const props = defineProps({
  success: {
    type: Boolean,
    default: null,
  },
})
</script>

<template>
  <div class="succeed">
    <div v-if="props.success">
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
