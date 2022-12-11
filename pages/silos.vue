<template>
  <div>
    <Header id="silos-header" :title="$t('headers.silos.title')" />
    <section class="container silos-section">
      <h2 class="subtitle">{{ $t('pages.silos.text') }}</h2>
      <Button
        class="solutions-btn"
        :label="$t('our_benefit')"
        :to="localePath('benefit')"
      />
    </section>
    <section-image
      class="container silos-section silos-section--shadow"
      image="/silos-in.jpg"
      iconFleet
    >
      <template #text>
        <IconFleet :number="6" />
        <h3>{{ $t('pages.silos.section.asset.heading') }}</h3>
        <h2 class="large">{{ $t('pages.silos.section.asset.title') }}</h2>
        <ul class="circle">
          <li
            v-for="i in [1, 2, 3, 4, 5]"
            :key="i"
            v-html="$t('pages.silos.section.asset.argument_' + i)"
          ></li>
        </ul>
        <a class="link" :href="localePath({ name: 'benefit' })">{{
          $t('our_benefit')
        }}</a>
      </template>
    </section-image>
    <section-image
      class="container silos-section"
      image="/silos-zoom.jpg"
      iconFleet
      flip
    >
      <template #text>
        <IconFleet :number="6" />
        <h3>{{ $t('pages.silos.section.mastery.heading') }}</h3>
        <h2 class="large">{{ $t('pages.silos.section.mastery.title') }}</h2>
        <ul class="circle">
          <li
            v-for="i in [1, 2, 3, 4, 5]"
            :key="i"
            v-html="$t('pages.silos.section.mastery.argument_' + i)"
          ></li>
        </ul>
      </template>
    </section-image>
    <section class="silos-background"></section>
  </div>
</template>

<script>
export default {
  name: 'Silos',
  components: {
    Icon: () => import('../components/icon/Icon'),
    IconFleet: () => import('../components/icon/IconFleet'),
  },
  layout: 'main',
  nuxtI18n: {
    paths: {
      fr: '/silos',
      en: '/silos',
    },
  },
  head() {
    return {
      title: this.$i18n.tc('pages.silos.title') + ' - Godin SAS',
    }
  },
}
</script>

<style lang="scss" scoped>
.silos-section {
  padding-top: 32px;
  padding-bottom: 32px;

  .link {
    margin-top: 16px;
  }

  &--shadow {
    @include box-shadow(0, 4px, 16px, rgba(0, 0, 0, 0.1), true);
  }
}

.silos-background {
  background-image: url('/silos-pub.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  height: 600px;
}

h3 {
  text-align: left;
}

p {
  font-family: $light-font;
  font-size: 1.4rem;
}

.list-title {
  margin-bottom: 0;
}

ul {
  li {
    font-family: $light-font;
    font-size: 1.4rem;
    margin-top: 4px;

    ::v-deep > b {
      font-family: $primary-font;
    }
  }

  &.circle {
    li {
      margin-top: 8px;
      white-space: break-spaces;

      &:before {
        display: inline-block;
        content: url('~/assets/images/BlueCircle.svg');
        width: 15px;
        height: 15px;
        margin-right: 10px;
      }
    }
  }
}

.solutions-btn {
  display: block;
  margin: 32px auto 0 auto;
  width: 100%;
}
</style>
