<template>
  <div class="silos-dimensions">
    <form class="silos-dimensions--form" @submit="checkForm">
      <TextField
        id="field_barrel_height"
        v-model="field_barrel_height"
        :label="$t('pages.quotation.form.barrel_height')"
        color="dark"
      />
      <TextField
        id="field_hopper_height"
        v-model="field_hopper_height"
        :label="$t('pages.quotation.form.hopper_height')"
        color="dark"
      />
      <TextField
        id="field_silos_pole_height"
        v-model="field_silos_pole_height"
        :label="$t('pages.quotation.form.silos_pole_height')"
        color="dark"
      />
      <TextField
        id="field_height"
        v-model="field_height"
        :label="$t('pages.quotation.form.height')"
        color="dark"
      />
      <Select
        id="field_reservation_type"
        v-model="field_reservation_type"
        type="dark"
        :options="reservationTypes"
        :label="$t('pages.quotation.form.reservation_type')"
        @input="setReservationType"
      />
      <TextField
        id="field_device_rerun_type"
        v-model="field_device_rerun_type"
        :label="$t('pages.quotation.form.device_rerun_type')"
        color="dark"
      />
      <TextField
        id="field_outlet_diameter"
        v-model="field_outlet_diameter"
        :label="$t('pages.quotation.form.outlet_diameter')"
        color="dark"
      />
      <Checkbox
        id="field_should_cipher_assembly"
        v-model="field_should_cipher_assembly"
        :label="$t('pages.quotation.form.should_cipher_assembly')"
      />
      <Select
        id="field_price_base"
        v-model="field_price_base"
        type="dark"
        :options="bases"
        :label="$t('pages.quotation.form.price_base')"
        @input="setPriceBase"
      />
      <TextField
        id="field_realisation_date"
        v-model="field_realisation_date"
        :label="$t('pages.quotation.form.realisation_date')"
        color="dark"
      />
      <Button :loading="isLoading" type="light" :label="$t('submit')" />
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
      field_barrel_height: this.form?.field_barrel_height,
      field_hopper_height: this.form?.field_hopper_height,
      field_silos_pole_height: this.form?.field_silos_pole_height,
      field_height: this.form?.field_height,
      field_reservation_type: this.form?.field_reservation_type,
      field_device_rerun_type: this.form?.field_device_rerun_type,
      field_outlet_diameter: this.form?.field_outlet_diameter,
      field_should_cipher_assembly: this.form?.field_should_cipher_assembly,
      field_price_base: this.form?.field_price_base,
      field_realisation_date: this.form?.field_realisation_date,
      errors: [],
      reservationTypes: [
        {
          text: '',
          value: null,
        },
        {
          text: this.$t('pages.quotation.form.reservationTypes.manhole'),
          value: 'manhole',
        },
        {
          text: this.$t('pages.quotation.form.reservationTypes.valve'),
          value: 'valve',
        },
        {
          text: this.$t('pages.quotation.form.reservationTypes.food'),
          value: 'food',
        },
        {
          text: this.$t('pages.quotation.form.reservationTypes.level'),
          value: 'level',
        },
      ],
      bases: [
        {
          text: this.$t('pages.quotation.form.bases.factory'),
          value: 'factory',
        },
        {
          text: this.$t('pages.quotation.form.bases.franco'),
          value: 'franco',
        },
      ],
    }
  },
  methods: {
    setReservationType(reservationType) {
      this.field_reservation_type = reservationType
    },
    setPriceBase(price) {
      this.field_price_base = price
    },
    async checkForm(e) {
      e.preventDefault()

      try {
        this.isLoading = true
        this.$emit('submit', {
          field_barrel_height: this.field_barrel_height,
          field_hopper_height: this.field_hopper_height,
          field_silos_pole_height: this.field_silos_pole_height,
          field_height: this.field_height,
          field_reservation_type: this.field_reservation_type,
          field_device_rerun_type: this.field_device_rerun_type,
          field_outlet_diameter: this.field_outlet_diameter,
          field_should_cipher_assembly: this.field_should_cipher_assembly,
          field_price_base: this.field_price_base,
          field_realisation_date: this.field_realisation_date,
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
