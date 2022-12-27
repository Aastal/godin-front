<template>
  <div class="project">
    <form class="project--form" @submit="checkForm">
      <TextField
        id="silos_capacity"
        v-model="field_silos_capacity"
        :label="$t('pages.quotation.form.silos_capacity')"
        color="dark"
        required
      />
      <TextField
        id="silos_number"
        v-model="field_silos_number"
        :label="$t('pages.quotation.form.silos_number')"
        color="dark"
      />
      <TextField
        id="field_product_type"
        v-model="field_product_type"
        :label="$t('pages.quotation.form.product_type')"
        color="dark"
      />
      <TextField
        id="field_product_density"
        v-model="field_product_density"
        :label="$t('pages.quotation.form.product_density')"
        color="dark"
      />
      <TextField
        id="field_product_granulometry"
        v-model="field_product_granulometry"
        :label="$t('pages.quotation.form.product_granulometry')"
        color="dark"
      />
      <Checkbox
        id="field_need_edible_paint"
        v-model="field_need_edible_paint"
        :label="$t('pages.quotation.form.need_edible_paint')"
        color="dark"
      />
      <Select
        id="field_silos_positioning"
        v-model="field_silos_positioning"
        type="dark"
        :options="positions"
        :label="$t('pages.quotation.form.silos_positioning')"
        @input="setPosition"
      />
      <Select
        id="field_feed_type"
        v-model="field_feed_type"
        type="dark"
        :options="feed_types"
        :label="$t('pages.quotation.form.feed_type')"
        @input="setFeedType"
      />
      <Button
        :loading="isLoading"
        type="light"
        :label="$t('pages.quotation.form.next')"
      />
    </form>
  </div>
</template>

<script>
import { sentryNormalizeException } from '@/utils/handle-error'

export default {
  name: 'QuotationContact',
  components: {
    Button: () => import('../Button'),
    TextField: () => import('../fields/TextField'),
    Select: () => import('../fields/Select'),
    Checkbox: () => import('../fields/Checkbox'),
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      field_silos_positioning: this.form?.field_silos_positioning,
      field_silos_capacity: this.form?.field_silos_capacity,
      field_silos_number: this.form?.field_silos_number,
      field_product_type: this.form?.field_product_type,
      field_product_density: this.form?.field_product_density,
      field_product_granulometry: this.form?.field_product_granulometry,
      field_need_edible_paint: this.form?.field_need_edible_paint,
      field_feed_type: this.form?.field_feed_type,
      errors: [],
      positions: [
        {
          text: '',
          value: null,
        },
        {
          text: this.$t('pages.quotation.form.positions.in'),
          value: 'in',
        },
        {
          text: this.$t('pages.quotation.form.positions.out'),
          value: 'out',
        },
      ],
      feed_types: [
        {
          text: '',
          value: null,
        },
        {
          text: this.$t('pages.quotation.form.feed_types.gravity'),
          value: 'gravity',
        },
        {
          text: this.$t('pages.quotation.form.feed_types.pneumatic'),
          value: 'pneumatic',
        },
      ],
    }
  },
  methods: {
    setPosition(position) {
      this.field_silos_positioning = position
    },
    setFeedType(feedType) {
      this.field_feed_type = feedType
    },
    async checkForm(e) {
      e.preventDefault()

      try {
        this.isLoading = true
        this.$emit('submit', {
          field_silos_positioning: this.field_silos_positioning,
          field_silos_capacity: this.field_silos_capacity,
          field_silos_number: this.field_silos_number,
          field_product_type: this.field_product_type,
          field_product_density: this.field_product_density,
          field_product_granulometry: this.field_product_granulometry,
          field_need_edible_paint: this.field_need_edible_paint,
          field_feed_type: this.field_feed_type,
        })
        this.isLoading = false
      } catch (e) {
        const exception = sentryNormalizeException(e)
        this.$sentry.captureException(exception)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.project {
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
