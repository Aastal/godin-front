<template>
  <label
    :for="id"
    :class="['text-field', active, focused, wrong, `text-field--${color}`]"
  >
    <div class="label">{{ label }}</div>

    <input
      :ref="id"
      v-model="address"
      :name="id"
      type="text"
      :required="required"
      class="field"
      autocomplete="off"
      :placeholder="placeholder"
      :disabled="!service"
      @focus="isFocused = true"
    >
    <div class="prepend">
      <icon name="location" stroke="#fff" fill="#fff" :scale="48">
        <location />
      </icon>
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
<script>
export default {
  name: 'AddressField',
  components: {
    Icon: () => import('../../components/icon/Icon'),
    Location: () => import('../../components/icon/icons/Location')
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'light'
    },
    value: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: 'Invalid Address'
    }
  },
  data () {
    return {
      error: false,
      isFocused: !!this.value,
      autocomplete: '',
      address: this.value,
      searchResults: [],
      service: null
    }
  },
  head () {
    return this.packages
  },
  computed: {
    packages () {
      const packages = {}

      if (!window.google) {
        packages.script = [{
          vmid: 'maps-googleapis',
          src: `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.googleKey}`,
          defer: true,
          callback: this.googleAutocompleteInit
        }]
      } else {
        this.googleAutocompleteInit()
      }

      return packages
    },
    active() {
      return this.isFocused || this.address ? 'active' : ''
    },
    focused () {
      return this.isFocused ? 'focused' : ''
    },
    wrong () {
      return this.error ? 'error' : ''
    }
  },
  watch: {
    value (val) {
      this.address = val
    },
    address (val) {
      if (val && this.isFocused) {
        this.service.getPlacePredictions({
          input: this.address,
          types: ['geocode', 'establishment']
        }, this.displaySuggestions)
      } else if (!val) {
        this.select(val)
      }
    }
  },
  created () {
    // eslint-disable-next-line nuxt/no-globals-in-created
    if (process.browser) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('click', (e) => {
        if (!e.target.classList.contains(('field'))) {
          this.isFocused = false
        }
      })
    }
  },
  methods: {
    select (result) {
      this.address = result ? result.description : null
      this.searchResults = []
      this.$emit('input', result)
    },
    displaySuggestions (predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = []
        return
      }
      this.searchResults = predictions
    },
    googleAutocompleteInit () {
      this.service = new window.google.maps.places.AutocompleteService()
    }
  }
}
</script>
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
      transition: transform 0.2s, top 0.2s;
      pointer-events: none;
    }

    &.active .label {
      top: 0;
      transform: translateY(-25%) scale(0.7);
      transition: transform 0.2s, top 0.2s;
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
      font-size: 1rem;
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
      font-family: "GothamMedium", sans-serif;
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
