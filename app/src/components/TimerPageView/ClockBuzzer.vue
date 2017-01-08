<style scoped>
.sound-clock {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: var(--light-bg);
  font-size: 18px;
  color: var(--dark-gray);
  text-align: center;
  align-self: flex-end;
  margin: 5% 5% 0 0;
  -webkit-app-region: no-drag;
}

.sound-clock:hover {
  background: var(--green-tomato);
  color: white;
  cursor: pointer;
}

.sound-clock i {
    line-height: 34px;
}
</style>

<template>
  <a class="sound-clock" @click="toggleSound">
    <audio ref="tickingPlayer" :src="tickingaudio" loop></audio>
    <audio ref="finishedPlayer" :src="finishedaudio"></audio>
    <i class="fa" :class="controlClass"></i>
  </a>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import audioclock from './assets/clock-ticking.mp3'
import finishedclock from './assets/finished.mp3'

export default {
  computed: {
    ...mapGetters({
      ticking: 'tickingClock',
      sound: 'soundClock',
      finished: 'finishedClock'
    }),
    controlClass: function () {
      if (this.sound) {
        return 'fa-volume-up'
      }
      return 'fa-volume-off'
    }
  },
  data () {
    return {
      tickingaudio: audioclock,
      finishedaudio: finishedclock
    }
  },
  methods: {
    ...mapActions([ 'toggleSound' ])
  },
  watch: {
    sound: function (val) {
      if (this.ticking && val) {
        this.$refs.tickingPlayer.play()
      } else if (this.ticking) {
        this.$refs.tickingPlayer.pause()
      }
    },
    ticking: function (val) {
      if (this.sound && val) {
        this.$refs.tickingPlayer.play()
      } else if (this.sound) {
        this.$refs.tickingPlayer.pause()
      }
    },
    finished: function (val) {
      if (this.sound && val) {
        this.$refs.finishedPlayer.play()
      }
    }
  }
}
</script>
