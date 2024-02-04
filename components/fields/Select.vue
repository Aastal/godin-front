<template>
  <div class="select">
    <label :for="id">
      {{ label ? label : null }}
    </label>
    <div class="select--field">
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
      <icon name="down" stroke="#000" :scale="48">
        <down />
      </icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  components: {
    Icon: () => import('../icon/Icon'),
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
  methods: {
    selected(event) {
      this.$emit('change', event.target.value)
      this.$emit('input', event.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  margin-bottom: 32px;

  &--field {
    position: relative;
  }

  select {
    width: 100%;
    padding: 16px;
    @include border-radius(8px);
    @include appearance(none);
    font-size: 1.2rem;
    background-color: transparent;
    height: 60px;
    outline: none;
    border: 1px solid $field-dark-color;
  }

  svg {
    position: absolute;
    top: 50%;
    right: 3.5%;
    transform: translateY(-50%) scale(1);
  }
}
</style>
