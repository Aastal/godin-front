<template>
  <nav
    ref="menu"
    v-click-outside="closeMenu"
    :class="[`menu`, { display: showMenu }]"
  >
    <slot name="items" />
    <div v-if="hasFooter" class="menu-footer">
      <slot name="footer" />
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SubMenu',
  props: {
    label: {
      type: String,
      default: 'Menu'
    },
    showMenu: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasFooter () {
      return !!this.$slots.footer
    }
  },
  watch: {
    open () {
      const target = this.$refs.menu

      if (!target.classList.contains('visible')) {
        target.classList.add('visible')
        this.$root.$emit('disable-body', true)
      } else {
        target.classList.remove('visible')
        this.$root.$emit('disable-body', false)
      }
    }
  },
  methods: {
    closeMenu (event) {
      if (event.target.classList.contains('disable-bg')) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  position: absolute;
  opacity: 0;
  right: -10000px;
  top: 0;
  color: $light-text-color;
  z-index: 999;
  max-height: 100vh;
  @include border-radius(8px 0 0 8px);
  @include box-shadow(-24px, 4px, 20px, rgba(0, 0, 0, .5));
  background: $ternary-bg;

  &.display {
    transition: opacity .3s ease-in-out;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 16px;
    overflow-y: visible;
    overflow-x: hidden;
    height: auto;
    max-height: 70vh;

    li {
      position: relative;
      display: flex;
      margin: 24px 0;

      svg {
        margin: 0 3px 0 0;
      }
    }
  }

  .sub-menu {
    display: none;
    list-style: none;
    margin: 0;
    padding: 0 0 0 24px;
    transition: display .4s ease-in-out;
    top: -200px;

    &.visible {
      display: block;
      top: 0;
    }

    li {
      margin: 12px 0;

      a {
        font-weight: 400;
      }
    }
  }

  span,
  a {
    display: block;
    font-family: 'GothamMedium', sans-serif;
    font-weight: 700;
    padding: 8px 0;
    font-size: 1rem;
    color: $primary-text-color;
    text-decoration: none;

    &.nuxt-link-exact-active {
      @include text-color($secondary-text-color);

      &:before {
        display: inline-block;
        content: url("~/assets/images/RedTriangle.svg");
        width: 10px;
        height: 10px;
        margin-right: 4px;
      }
    }
  }

  &.visible {
    opacity: 1;
    outline: none;
    right: 0;
    position: fixed;
  }

  .menu-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 8px;

    * {
      flex: 1 1 auto;
      margin: 0 12px;
    }
  }

  @media (min-width: $breakpoint-md) {
    top: 3%;

    .menu-footer {
      padding: 32px 8px;
    }
  }
}
</style>
