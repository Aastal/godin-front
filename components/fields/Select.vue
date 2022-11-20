<template>
  <div class="select-field">
    <label :for="id">
      {{ label ? label : null }}
      <select :id="id" :name="id" class="field" @change="selected">
        <option
          v-for="option in options"
          :key="option.text"
          :value="option.value"
          :selected="option.selected ? 'selected' : null"
        >
          {{ option.text }}
        </option>
      </select>
      <sound-icon name="down" stroke="#000">
        <down />
      </sound-icon>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Select',
  components: {
    SoundIcon: () => import('../icon/Icon'),
    Down: () => import('../icon/icons/Down'),
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      required: true,
      validator(value) {
        let check = true
        value.forEach((option) => {
          if (option.text === undefined || option.value === undefined) {
            check = false
          }
        })

        return check
      },
    },
  },
  data() {
    return {
      customLabel: this.label,
    }
  },
  methods: {
    selected(event) {
      this.$emit('change', event.target.value)
      this.$emit('input', event.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.select-field {
  position: relative;

  select {
    width: 100%;
    padding: 16px;
    @include border-radius(8px);
    @include appearance(none);
    font-size: 1.4rem;
    background-color: transparent;
    height: 60px;
    outline: none;
    border: 1px solid $field-dark-color;
  }

  svg {
    position: absolute;
    top: 50%;
    right: 3.5%;
    transform: translate(-3.5%, -50%);
  }
}
</style>
