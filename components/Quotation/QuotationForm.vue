<template>
  <div ref="quotation-form" class="quotation-form">
    <div class="quotation-form--state">
      <div @click="changeState(1, state)" :class="['quotation-form--state--step', { 'active': state === 1, 'done': state > 1 }]">
        <span class="number">01</span>
        <div class="information">
          <span class="title">{{ $t('pages.quotation.form.step') }} 01</span>
          <span class="description">{{ $t('pages.quotation.form.step_1') }}</span>
        </div>
      </div>
      <div @click="changeState(2, state)" :class="['quotation-form--state--step', { 'active': state === 2, 'done': state > 2 }]">
        <span class="number">02</span>
        <div class="information">
          <span class="title">{{ $t('pages.quotation.form.step') }} 02</span>
          <span class="description">{{ $t('pages.quotation.form.step_2') }}</span>
        </div>
      </div>
      <div @click="changeState(3, state)" :class="['quotation-form--state--step', { 'active': state === 3, 'done': state > 3 }]">
        <span class="number">03</span>
        <div class="information">
          <span class="title">{{ $t('pages.quotation.form.step') }} 03</span>
          <span class="description">{{ $t('pages.quotation.form.step_3') }}</span>
        </div>
      </div>
    </div>
    <transition name="slide">
      <Contact
        v-if="state === 1"
        :form="form"
        @submit="onContactSubmit"
      />
    </transition>
    <transition name="slide">
      <Project
        v-if="state === 2"
        :form="form"
        @submit="onProjectSubmit"
      />
    </transition>
    <transition name="slide">
      <SilosDimensions
        v-if="state === 3"
        :form="form"
        @submit="onSilosDimensionsSubmit"
      />
    </transition>
    <transition name="slide">
      <Success v-if="state === 4" :success="sent" />
    </transition>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'QuotationForm',
  components: {
    Button: () => import('../Button'),
    Success: () => import('./QuotationSuccess'),
    Contact: () => import('./QuotationContact'),
    Project: () => import('./QuotationProject'),
    SilosDimensions: () => import('./QuotationSilosDimensions'),
  },
  data () {
    return {
      sent: false,
      state: 1,
      form: {},
    }
  },
  methods: {
    ...mapActions('quotation', {
      create: 'create'
    }),
    scroll () {
      if (process.browser) {
        window.scrollTo({
          bottom: 0,
          behavior: 'smooth'
        })
      }
    },
    onContactSubmit (information) {
      this.scroll()
      this.form = { ...this.form, ...information }
      this.state++
    },
    onProjectSubmit (project) {
      this.scroll()
      this.form = { ...this.form, ...project }
      this.state++
    },
    async onSilosDimensionsSubmit (silosDimensions) {
      this.scroll()
      this.form = { ...this.form, ...silosDimensions }

      try {
        const date = new Date()
        await this.create({
          attributes: {
            title: this.form.field_firstname + ' ' + this.form.field_lastname + ' (' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ')',
            ...this.form
          }
        })
        this.sent = true
        this.state++
      } catch (err) {
        this.sent = false
      }
    },
    changeState(target, current) {
      if (target < current) {
        this.state = target
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.quotation-form {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 40px;
  padding-bottom: 40px;

  .alert--danger {
    width: 50%;
  }

  &--state {
    display: flex;
    flex-direction: row;
    margin-bottom: 64px;
    justify-content: space-between;
    width: 70%;

    &.short {
      width: 40%;
    }

    @media (max-width: $breakpoint-sm) {
      width: 100%;
    }

    &--step {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-family: $primary-font;
      opacity: .2;

      &.done {
        opacity: 1;

        .number {
          color: $field-active-color;
          background-color: $success-color;
          border: solid 2px $success-color;
        }
      }

      &.active {
        opacity: 1;

        @media (max-width: $breakpoint-sm) {
          .information {
            display: flex;
          }
        }
      }

      .number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 65px;
        height: 65px;
        padding-top: 3px;
        color: $ternary-text-color;
        background-color: transparent;
        border: solid 2px $ternary-text-color;
        @include border-radius(5px);
        font-size: 1.6rem;
        font-weight: 500;
      }

      .information {
        display: flex;
        flex-direction: column;
        margin-left: 8px;

        @media (max-width: $breakpoint-sm) {
          display: none;
        }

        .title {
          font-size: 1.2rem;
          color: $ternary-text-color;
        }

        .description {
          font-size: 1.6rem;
          color: $primary-text-color;
          margin-top: 8px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
