<style scoped>
  #control-bar {
    margin-top: 5%;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
  }

  #control-bar a {
    align-self: center;
    display: inline-block;
    background: var(--green-tomato);
    padding: 10px;
    width: 30px;
    border-radius: 30px;
    cursor: pointer;
    -webkit-app-region: no-drag;
  }

   #control-bar a:hover {
    background: var(--red-tomato);
  }

  #control-bar a i {
    color: white;
    line-height: 30px;
    font-size: 28px;
  }
</style>

<template>
  <div id="control-bar">
    <a @click="startStopClock"><i class="fa" :class="controlClass"></i></a>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        ticking: 'tickingClock',
        finished: 'finishedClock',
        minutes: 'minutesClock',
        seconds: 'secondsClock'
      }),
      controlClass: function () {
        if (this.finished) {
          return 'fa-refresh'
        }
        return (!this.ticking) ? 'fa-play-circle' : 'fa-stop-circle'
      }
    },
    methods: {
      ...mapActions([
        'startClock',
        'stopClock'
      ]),
      startStopClock () {
        if (this.finished) {
          this.stopClock()
          this.startClock()
        } else if (!this.ticking) {
          this.startClock()
        } else {
          this.stopClock()
        }
      }
    },
    watch: {
      seconds: function (val) {
        let title = `${this.minutes}:${(this.seconds > 9) ? val : '0' + val}`
        if (process.env.NODE_ENV !== 'testing') {
          this.$electron.remote.getGlobal('trayIcon').setTitle(title)
        }
      },
      finished: function (val) {
        if (val) {
          if (process.env.NODE_ENV !== 'testing') {
            const notify = new Notification('Pomodorize.me', {
              body: 'You did it!, please take some rest and start again',
              silent: true
            })

            notify.onclick = () => { this.close() }
          }
        }
      }
    }
  }
</script>
