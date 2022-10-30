export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showNavbar: true,
      lastScrollPosition: null
    }
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.updateScroll)
  },
  methods: {
    toggleSubMenu (e, item) {
      const target = item.pages ? this.$refs[item.text + '-menu'][0] : this.$refs[item + '-menu']

      if (!target) {
        return
      }

      if (!target.classList.contains('visible')) {
        target.classList.add('visible')
      } else {
        target.classList.remove('visible')
      }
    },
    updateScroll () {
      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop

      this.showNavbar = currentScrollPosition < this.lastScrollPosition && window.scrollY < 100
      this.lastScrollPosition = currentScrollPosition

      if (!this.showNavbar && this.mode !== 'update') {
        this.$root.$emit('disable-body', false)
      }
    }
  }
}
