<style scoped>
  #timer-section {
    border-radius:6px;
    box-shadow: 0 2px 1px 1px rgba(0,0,0,0.1);
    background: white;
    height: 85%;
    margin: 5% 10%;
    display: flex;
    flex-direction: column;
  }

  #img-clock {
    height: 81px;
    left: 50%;
    margin: -40px 0 0 -40px;
    position: absolute;
    width: 80px;
   }

   #timer-section h1 {
    text-align: center;
    color: var(--light-gray);
    font-weight: 400;
    text-transform: uppercase;
    font-size: 14px;
    width: 100%;
    padding-bottom: 20px;
    letter-spacing: 5px;
    border-bottom: 1px solid var(--light-border);
  }
</style>

<template>
  <section id="timer-section">
    <div id="img-clock">
      <img id="title-image" :src="counterImage">
    </div>
    <clock-buzzer></clock-buzzer>
    <h1>{{ counterTitle }}</h1>
    <tomato-clock></tomato-clock>
    <timer-control></timer-control>
    <chrono-quote></chrono-quote>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ClockBuzzer from './TimerPageView/ClockBuzzer'
  import TomatoClock from './TimerPageView/TomatoClock'
  import TimerControl from './TimerPageView/TimerControl'
  import ChronoQuote from './TimerPageView/ChronoQuote'
  import tickimg from './TimerPageView/assets/img-timer-list.png'
  import listimg from './TimerPageView/assets/img-grocery-list.png'
  import restimg from './TimerPageView/assets/img-resting-list.png'

  export default {
    components: { ClockBuzzer, TomatoClock, TimerControl, ChronoQuote },
    computed: {
      ...mapGetters({
        ticking: 'tickingClock',
        finished: 'finishedClock'
      }),
      counterTitle: function () {
        if (this.finished) {
          return 'Time to get a short rest'
        }
        return (!this.ticking) ? 'Pick some tasks to get done' : 'The Clock’s ticking!'
      },
      counterImage: function () {
        if (this.finished) {
          return restimg
        }
        return (!this.ticking) ? listimg : tickimg
      }
    },
    name: 'pomodoro-timer'
  }
</script>
