<template>
  <label class="checkbox">
    {{ label }}
    <input
      :id="id"
      :name="id"
      :required="required"
      type="checkbox"
      :checked="checked"
      @input="input($event)"
    />
    <span class="checkmark" />
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isChecked: this.value,
    }
  },
  methods: {
    input(event) {
      this.isChecked = event.target.checked
      this.$emit('input', event.target.checked)
    },
  },
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 0 0 35px;
  margin-bottom: 32px;
  cursor: pointer;
  font-size: 1.2rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #000;
  width: 100%;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input:checked ~ .checkmark::after {
    display: block;
  }
}

.checkmark {
  position: absolute;
  left: 0;
  height: 24px;
  width: 24px;
  background: transparent;
  @include border-radius(8px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 2px;
    background: #a1a6af;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    @include border-radius(8px);
  }

  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 9px;
    top: 4px;
    width: 5px;
    height: 11px;
    border: solid #3333a3;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}
</style>
