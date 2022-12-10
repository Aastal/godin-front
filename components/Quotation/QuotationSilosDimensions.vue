<template>
  <div class="silos-dimensions">
    <form class="silos-dimensions--form" @submit="checkForm">
      <TextField
        id="lastname"
        v-model="lastname"
        :label="$t('pages.quotation.lastname')"
        color="dark"
        required
      />
      <Button :loading="isLoading" type="light" :label="$t('pages.quotation.form.next')" />
    </form>
  </div>
</template>

<script>
import { sentryNormalizeException } from '@/utils/handle-error'

export default {
  name: 'QuotationContact',
  components: {
    Button: () => import('../Button'),
    TextField: () => import('../fields/TextField')
  },
  data () {
    return {
      isLoading: false,
      lastname: '',
      firstname: '',
      errors: []
    }
  },
  methods: {
    async checkForm (e) {
      e.preventDefault()
      this.isLoading = true

      try {
        this.$emit('appointment', {

        })
        this.isLoading = false
      } catch (e) {
        const exception = sentryNormalizeException(e)
        this.$sentry.captureException(exception)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.silos-dimensions {
  display: block;
  width: 40%;

  @media (max-width: $breakpoint-sm) {
    width: 100%;
  }

  &--form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button {
    display: block;
    margin: 0 auto;
  }
}
</style>
