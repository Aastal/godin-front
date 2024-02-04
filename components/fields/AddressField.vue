<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: null,
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
    default: 'Invalid Address',
  },
})

const error = ref(false)
const isFocused = ref(!!props.modelValue)
const address = ref(props.modelValue)
const searchResults = ref([])
const service = ref(null)

const active = computed(() =>
  isFocused.value || address.value ? 'active' : '',
)
const focused = computed(() => (isFocused.value ? 'focused' : ''))
const wrong = computed(() => (error.value ? 'error' : ''))

watch(
  () => props.modelValue,
  (newVal) => {
    address.value = newVal
  },
)

watch(address, (newVal) => {
  if (newVal && isFocused.value) {
    service.value.getPlacePredictions(
      {
        input: address.value,
        types: ['geocode', 'establishment'],
      },
      displaySuggestions,
    )
  } else if (!newVal) {
    select(newVal)
  }
})

onMounted(() => {
  if (process.browser) {
    window.addEventListener('click', (e) => {
      if (!e.target.classList.contains('field')) {
        isFocused.value = false
      }
    })
    googleAutocompleteInit()
  }
})

const emit = defineEmits(['update:modelValue'])

function select(result) {
  address.value = result ? result.description : null
  searchResults.value = []
  emit('update:modelValue', result)
}

function displaySuggestions(predictions, status) {
  if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
    searchResults.value = []
    return
  }
  searchResults.value = predictions
}

function loadGoogleMapsApi() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve(window.google.maps)
    } else {
      const config = useRuntimeConfig()
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleKey}&libraries=places&callback=initGoogleMaps&loading=async`
      script.defer = true
      script.async = true
      document.head.appendChild(script)

      window.initGoogleMaps = () => resolve(window.google.maps)
      script.onerror = (error) => reject(error)
    }
  })
}

async function googleAutocompleteInit() {
  try {
    await loadGoogleMapsApi()
    if (window.google && window.google.maps.places) {
      service.value = new window.google.maps.places.AutocompleteService()
    }
  } catch (error) {
    console.error('Failed to load Google Maps API:', error)
  }
}
</script>

<template>
  <label
    :for="id"
    :class="['text-field', active, focused, wrong, `text-field--${color}`]"
  >
    <div class="label">{{ label }}</div>
    <input
      v-model="address"
      :name="id"
      type="text"
      :required="required"
      class="field"
      autocomplete="off"
      :placeholder="placeholder"
      :disabled="!service"
      @focus="isFocused = true"
    />
    <div class="prepend">
      <Icon name="location" stroke="#fff" fill="#fff" :scale="48">
        <Location />
      </Icon>
    </div>
    <ul v-if="isFocused && searchResults.length">
      <li v-for="(result, i) in searchResults" :key="i" @click="select(result)">
        {{ result.description }}
      </li>
    </ul>
    <p v-if="error" class="error">
      {{ errorMessage }}
    </p>
    <div v-if="!error" class="append">
      <slot />
    </div>
  </label>
</template>

<style lang="scss" scoped>
%appended {
  position: absolute;
  right: 15px;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-field {
  position: relative;
  display: block;
  height: 60px;
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

    .label {
      position: absolute;
      top: 50%;
      left: 10px;
      padding: 0 10px;
      transform-origin: top left;
      transform: translateY(-50%) scale(1);
      transition:
        transform 0.2s,
        top 0.2s;
      pointer-events: none;
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

      input {
        color: $error-color;
      }
    }

    .error {
      position: relative;
      bottom: 0;
      left: 0;
      margin: 4px 0 0 0;
      transform: translateY(8px);
      font-size: 0.875rem;
      font-family: $primary-font;
    }

    input {
      font-size: 1.2rem;
      width: 100%;
      height: 100%;
      margin-top: 2px;
      background-color: transparent;
      border: 0;
      outline: none;
    }
  }

  &--dark {
    &.focused {
      border: 1px solid $field-dark-active-color;
      color: $field-dark-color;

      input {
        color: $field-dark-color;
      }
    }

    input {
      color: $field-dark-color;
    }

    &.active .label {
      background-color: $body-bg;
    }
  }

  ul {
    position: absolute;
    background-color: $body-bg;
    width: 100%;
    border: 1px solid $blue-text-color;
    border-left-width: 4px;
    border-bottom-width: 4px;
    @include border-radius(16px);
    z-index: 10;

    li {
      padding: 16px;
      cursor: pointer;
      font-family: $primary-font;
      font-weight: 700;
      color: $ternary-text-color;
      font-size: 1rem;
      margin: 16px 0;

      &:hover {
        background-color: $ternary-bg;
      }
    }
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
