<style scoped>
  #top-bar {
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  #logo {
    margin-left: 5%;
  }
</style>

<template>
  <div id="top-bar">
    <div id="logo">
      <img src="./TopBar/assets/logo.svg" alt="Pomodorize.me">
    </div>
    <pomo-avatar></pomo-avatar>
  </div>
</template>

<script>
import PomoAvatar from 'components/TopBar/PomoAvatar'

export default {
  components: { PomoAvatar }
}

</script>
