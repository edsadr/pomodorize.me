<style>
  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: local('Montserrat-Regular'), url(./fonts/Montserrat-Regular.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
  }

  @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    src: local('Montserrat-Bold'), url(./fonts/Montserrat-Bold.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body,#main-container {
    width: 100%;
    height: 100%;
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }

  body {
    align-items: center;
    background: url(./imgs/background.svg) center fixed;
    background-size: cover;
    display: flex;
    font-family: 'Montserrat', sans-serif;
    justify-content: center;
    text-align: center;
    flex-direction: row;
    align-items: flex-start;
    overflow: hidden;
    cursor: move;
  }

  #view-container {
    height: 90%;
  }
</style>

<template>
  <div id="main-container" unselectable="on">
    <top-bar></top-bar>
    <div id="view-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import './fonts/fontawesome.css'
  import './styles/variables.css'
  import TopBar from 'components/TopBar'
  import store from 'src/vuex/store'

  export default {
    components: { TopBar },
    store
  }
</script>
