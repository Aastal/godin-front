<script setup>
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'light',
  },
  modelValue: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: 'errors.invalid_field',
  },
})

const error = ref(false)
const isFocused = ref(!!props.modelValue)

const active = computed(() =>
  isFocused.value || props.modelValue ? 'active' : '',
)
const focused = computed(() => (isFocused.value ? 'focused' : ''))
const wrong = computed(() => (error.value ? 'error' : ''))

const blur = (event) => {
  isFocused.value = false
  error.value = !event.target.validity.valid
}

const emit = defineEmits(['update:modelValue'])

const input = (event) => {
  error.value = false
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <label
    :for="props.id"
    :class="[
      'text-area-field',
      active,
      focused,
      wrong,
      `text-area-field--${props.color}`,
    ]"
  >
    <div class="label" @click="isFocused = true">{{ props.label }}</div>

    <textarea
      :name="props.id"
      :value="modelValue"
      :required="props.required"
      class="field"
      autocomplete="off"
      cols="30"
      rows="10"
      @focus="isFocused = true"
      @blur="blur($event)"
      @input="input($event)"
    />

    <p v-if="error" class="error">
      {{ $t(props.errorMessage) ? $t(props.errorMessage) : props.errorMessage }}
    </p>

    <div v-if="!error" class="append">
      <slot />
    </div>
    <div v-else class="prepend">
      <Icon name="close" stroke="#F26363">
        <Close />
      </Icon>
    </div>
  </label>
</template>

<style lang="scss" scoped>
%appended {
  position: absolute;
  right: 15px;
  top: 15px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: normal;
}

.text-area-field {
  position: relative;
  display: block;
  height: 100px;
  width: 100%;
  margin-bottom: 32px;
  font-size: 1.2rem;
  background-color: transparent;
  @include border-radius(8px);
  padding: 10px 15px;
  cursor: text;

  &--dark,
  &--light {
    color: $field-default-color;
    border: 1px solid $field-default-color;
  }

  &--dark {
    &.focused {
      border: 1px solid $field-dark-active-color;
      color: $field-dark-color;

      textarea {
        color: $field-dark-color;
      }
    }

    textarea {
      color: $field-dark-color;
    }

    &.active .label {
      background-color: $body-bg;
    }
  }

  &--light {
    &.focused {
      border: 1px solid $field-active-color;
      color: $field-active-color;

      textarea {
        color: $field-active-color;
      }
    }

    textarea {
      color: $field-default-color;
    }

    &.active .label {
      background-color: $default-bg;
    }
  }

  .label {
    position: absolute;
    top: 30px;
    left: 10px;
    padding: 0 10px;
    transform-origin: top left;
    transform: translateY(-50%) scale(1);
    transition:
      transform 0.2s,
      top 0.2s;
  }

  &.active .label {
    top: 0;
    transform: translateY(-25%) scale(0.7);
    transition:
      transform 0.2s,
      top 0.2s;
  }

  &.error {
    border: 1px solid $error-color;
    color: $error-color;

    textarea {
      color: $error-color;
    }
  }

  .error {
    position: relative;
    bottom: 0;
    left: 0;
    margin: 0;
    transform: translateY(8px);
    font-size: 1rem;
    font-family: $primary-font;
  }

  textarea {
    font-size: 1.2rem;
    width: 100%;
    height: 100%;
    margin-top: 2px;
    background-color: transparent;
    border: 0;
    outline: none;
    resize: none;
    font-family: $primary-font;
    font-weight: normal;
  }

  .append {
    @extend %appended;
  }

  .prepend {
    @extend %appended;
    transform: translateX(50px);
  }
}
</style>
