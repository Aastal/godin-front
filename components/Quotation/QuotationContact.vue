<template>
  <div class="contact">
    <form class="contact--form" @submit="checkForm">
      <TextField
        id="lastname"
        v-model="field_lastname"
        :label="$t('pages.quotation.form.lastname')"
        color="dark"
        required
      />
      <TextField
        id="firstname"
        v-model="field_firstname"
        :label="$t('pages.quotation.form.firstname')"
        color="dark"
        required
      />
      <TextField
        id="company"
        v-model="field_company"
        :label="$t('pages.quotation.form.company')"
        color="dark"
        required
      />
      <AddressField
        id="address"
        v-model="place"
        :label="$t('pages.quotation.form.address')"
        color="dark"
        required
      />
      <TextField
        id="phone"
        v-model="field_phone"
        :label="$t('pages.quotation.form.phone')"
        color="dark"
        required
      />
      <TextField
        id="email"
        v-model="field_email"
        :label="$t('pages.quotation.form.email')"
        color="dark"
        required
      />
      <TextField
        id="date"
        v-model="field_date"
        :label="$t('pages.quotation.form.date')"
        color="dark"
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
    TextField: () => import('../fields/TextField'),
    AddressField: () => import('../fields/AddressField')
  },
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      field_lastname: this.form?.field_lastname,
      field_firstname: this.form?.field_firstname,
      field_company: this.form?.field_company,
      field_address: this.form?.field_address,
      field_phone: this.form?.field_phone,
      field_email: this.form?.field_email,
      field_date: this.form?.field_date,
      errors: []
    }
  },
  computed: {
    place: {
      get () {
        return this.field_address?.place
      },
      set (value) {
        this.field_address = value
          ? {
            place: value.description,
            placeId: value.place_id
          }
          : null
      }
    },
  },
  methods: {
    async checkForm (e) {
      e.preventDefault()

      try {
        this.isLoading = true
        this.$emit('submit', {
          field_lastname: this.field_lastname,
          field_firstname: this.field_firstname,
          field_company: this.field_company,
          field_address: this.field_address.place,
          field_phone: this.field_phone,
          field_email: this.field_email,
          field_date: this.field_date,
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
.contact {
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
