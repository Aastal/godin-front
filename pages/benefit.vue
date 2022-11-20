<template>
<div>
  <Header id="benefit-header" :title="$t('headers.benefit.title')" />
  <section class="container benefit-section">
    <h2 class="benefit-title">{{ $t('pages.benefit.text') }}</h2>
    <Button class="solutions-btn" :label="$t('our_solutions')" :to="localePath('silos')" />
  </section>
  <section-image
    class="container benefit-section"
    image="/silos-zoom.jpg"
    iconFleet
    flip
  >
    <template #text>
      <IconFleet :number="6"/>
      <h3>{{ $t('pages.benefit.section.mastery.heading') }}</h3>
      <h2 class="large">{{ $t('pages.benefit.section.mastery.title') }}</h2>
      <p>{{ $t('pages.benefit.section.mastery.text') }}</p>
      <p class="list-title">{{ $t('pages.benefit.section.mastery.in-charge') }}</p>
      <ul class="circle">
        <li v-for="i in [1, 2, 3, 4, 5, 6]" :key="i" v-html="$t('pages.benefit.section.mastery.argument_' + i)"></li>
      </ul>
    </template>
  </section-image>
  <section-image
    class="container benefit-section benefit-section--square-image"
    image="/moulin.jpg"
    iconFleet
  >
    <template #text>
      <IconFleet :number="6"/>
      <h3>{{ $t('pages.benefit.section.asset.heading') }}</h3>
      <h2 class="large">{{ $t('pages.benefit.section.asset.title') }}</h2>
      <ul class="circle">
        <li v-for="i in [1, 2, 3, 4, 5, 6]" :key="i" v-html="$t('pages.benefit.section.asset.argument_' + i)"></li>
      </ul>
    </template>
  </section-image>
  <section class="container benefit-section">
    <h2 class="large center">{{ $t('our_achievements') }}</h2>
    <Carousel />
  </section>
</div>
</template>

<script>
export default {
  name: 'Benefit',
  components: {
    Icon: () => import('../components/icon/Icon'),
    IconFleet: () => import('../components/icon/IconFleet'),
  },
  layout: 'main',
  nuxtI18n: {
    paths: {
      fr: '/prestations',
      en: '/benefit',
    }
  },
  head () {
    return {
      title: this.$i18n.tc('pages.benefit.title') + ' - Godin SAS'
    }
  },
}
</script>

<style lang="scss" scoped>
.benefit-section {
  padding-top: 32px;
  padding-bottom: 32px;

  &--square-image {
    ::v-deep > .image-wrapper {
      .image {
        height: 400px;
        background-position: center;
        @include border-radius(0);

        @media (max-width: $breakpoint-sm) {
          height: 200px;
        }
      }
    }
  }
}

.benefit-title {
  padding: 0 5%;
  text-align: center;
  font-style: italic;
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

      &:before {
        display: inline-block;
        content: url("~/assets/images/BlueCircle.svg");
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
