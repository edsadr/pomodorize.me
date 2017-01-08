import * as types from '../mutation-types'

const state = {
  ticking: false,
  finished: false,
  minutes: 25,
  seconds: 0,
  sound: true,
  interval: null
}

const mutations = {
  [types.TOGGLE_TICKING] (state) {
    state.ticking = !state.ticking
  },
  [types.TOGGLE_SOUND] (state) {
    state.sound = !state.sound
  },
  [types.TOGGLE_FINISHED] (state) {
    state.finished = !state.finished
  },
  [types.DECREMENT_MINUTES] (state) {
    state.minutes--
  },
  [types.DECREMENT_SECONDS] (state) {
    if (state.seconds >= 1) {
      state.seconds--
    } else {
      state.seconds = 59
    }
  },
  [types.RESTART_MINUTES] (state) {
    state.minutes = 25
  },
  [types.RESTART_SECONDS] (state) {
    state.seconds = 0
  },
  [types.SET_INTERVAL] (state, interval) {
    state.interval = interval
  },
  [types.CLEAR_INTERVAL] (state) {
    window.clearInterval(state.interval)
    state.interval = null
  }
}

export default {
  state,
  mutations
}
