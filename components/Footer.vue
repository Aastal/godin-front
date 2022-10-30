<template>
  <footer class="container">
    <div class="address">
<!--      <icon class="logo" name="LogoName" fill="#e6eaec">-->
<!--        <LogoName />-->
<!--      </icon>-->
      <h2>GODIN SAS</h2>
      <ul>
        <li>Zone Industrielle de la Saulaie</li>
        <li>419 rue Gustave Eiffel</li>
        <li>49 700 Doué La Fontaine</li>
      </ul>
    </div>
    <div class="information">
      <p>info@godin-stockage.com</p>
      <p>+33 (0) 2 41 59 18 82</p>
    </div>
  </footer>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Footer',
  components: {
    Icon: () => import('../components/icon/Icon'),
  },
}
</script>

<style scoped lang="scss">
footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 52px;
  padding-bottom: 72px;
  background: #556371;

  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
    align-items: start;
  }
}

h2 {
  color: $light-text-color;
  text-align: left;
}

p {
  font-family: $light-font;
  color: $light-text-color;
  font-size: 1.2rem;
  margin: 0;
}

ul {
  li {
    font-family: $light-font;
    color: $light-text-color;
    font-size: 1.2rem;
  }
}

.information {
  text-align: right;

  @media (max-width: $breakpoint-sm) {
    text-align: left;
    margin-top: 32px;
  }

  p {
    font-size: 1.5rem;

    &:last-child {
      margin-top: 4px;
    }
  }
}

.logo {
  width: 150px;
  height: 100px;
}
</style>
