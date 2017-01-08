<style scoped>
  .clock-minutes {
    font-size: 122px;
    text-align: center;
    color: var(--red-tomato);
  }

  .clock-seconds {
    background: white url(./assets/bg-seconds.gif) no-repeat center center;
    width: 48px;
    height: 48px;
    margin: 0 auto;
  }

  .countdown {
    background: white url(./assets/bg-seconds-countdown.gif) no-repeat center center;
  }

  .clock-seconds span {
    text-align: center;
    line-height: 49px;
    color: white;
    font-size: 24px;
    display:  block;
    width:  100%;
    height: 100%;
  }
</style>

<template>
  <div>
    <div class="clock-minutes">
      {{ minutes }}
    </div>
    <div class="clock-seconds" :class="{ countdown: ticking }">
      <span>{{ seconds }}</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        ticking: 'tickingClock',
        minutes: 'minutesClock',
        seconds: 'secondsClock'
      })
    }
  }
</script>
