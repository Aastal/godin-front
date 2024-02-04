<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
})

const state = reactive({
  isLoading: false,
  field_lastname: props.form?.field_lastname,
  field_firstname: props.form?.field_firstname,
  field_company: props.form?.field_company,
  field_address: props.form?.field_address,
  field_phone: props.form?.field_phone,
  field_email: props.form?.field_email,
  field_realisation_date: props.form?.field_realisation_date,
  errors: [],
})

watch(
  () => props.form,
  (newForm) => {
    Object.assign(state, newForm)
  },
  { deep: true },
)

const place = computed({
  get: () =>
    state.field_address?.place
      ? state.field_address.place
      : state.field_address,
  set: (value) => {
    state.field_address = value
      ? {
          place: value.description,
          placeId: value.place_id,
        }
      : null
  },
})

const emit = defineEmits(['submit'])

const checkForm = async () => {
  try {
    state.isLoading = true
    emit('submit', {
      field_lastname: state.field_lastname,
      field_firstname: state.field_firstname,
      field_company: state.field_company,
      field_address: state.field_address.place,
      field_phone: state.field_phone,
      field_email: state.field_email,
      field_realisation_date: state.field_realisation_date,
    })
    state.isLoading = false
  } catch (e) {}
}
</script>

<template>
  <div class="contact">
    <form class="contact--form" @submit.prevent="checkForm">
      <TextField
        id="lastname"
        v-model="state.field_lastname"
        :label="$t('pages.quotation.form.lastname')"
        color="dark"
        required
      />
      <TextField
        id="firstname"
        v-model="state.field_firstname"
        :label="$t('pages.quotation.form.firstname')"
        color="dark"
        required
      />
      <TextField
        id="company"
        v-model="state.field_company"
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
        v-model="state.field_phone"
        :label="$t('pages.quotation.form.phone')"
        color="dark"
        required
      />
      <TextField
        id="email"
        v-model="state.field_email"
        :label="$t('pages.quotation.form.email')"
        color="dark"
        required
      />
      <TextField
        id="date"
        v-model="state.field_realisation_date"
        :label="$t('pages.quotation.form.date')"
        color="dark"
      />
      <Button
        :loading="state.isLoading"
        type="light"
        :label="$t('pages.quotation.form.next')"
      />
    </form>
  </div>
</template>

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
