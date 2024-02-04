<script setup>
import { reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
})

const { t } = useI18n()

const state = reactive({
  isLoading: false,
  field_project_description: props.form?.field_project_description,
  errors: [],
})

watch(
  () => props.form,
  (newForm) => {
    state.field_project_description = newForm?.field_project_description
  },
  { deep: true },
)

const emit = defineEmits(['submit'])

const checkForm = async () => {
  try {
    state.isLoading = true
    emit('submit', {
      field_project_description: state.field_project_description,
    })
    state.isLoading = false
  } catch (e) {}
}
</script>

<template>
  <div class="project">
    <form class="project--form" @submit.prevent="checkForm">
      <TextAreaField
        id="field_project_description"
        v-model="state.field_project_description"
        :label="$t('pages.quotation.form.project_description')"
        color="dark"
        required
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

  .text-area-field {
    height: 350px;
  }

  .button {
    display: block;
    margin: 0 auto;
  }
}
</style>
