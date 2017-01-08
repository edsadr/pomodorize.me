import * as types from './mutation-types'

export const startClock = ({ commit, state }) => {
  commit(types.TOGGLE_TICKING)

  let runClock = () => {
    if (state.clock.seconds >= 1) {
      commit(types.DECREMENT_SECONDS)
    } else if (state.clock.minutes === 0) {
      commit(types.TOGGLE_TICKING)
      commit(types.CLEAR_INTERVAL)
      commit(types.TOGGLE_FINISHED)
    } else {
      commit(types.DECREMENT_MINUTES)
      commit(types.DECREMENT_SECONDS)
    }
  }

  let interval = window.setInterval(runClock, 1000)
  commit(types.SET_INTERVAL, interval)
}

export const stopClock = ({ commit, state }) => {
  if (state.clock.finished) commit(types.TOGGLE_FINISHED)
  if (state.clock.ticking) commit(types.TOGGLE_TICKING)

  commit(types.CLEAR_INTERVAL)
  commit(types.RESTART_MINUTES)
  commit(types.RESTART_SECONDS)
}

export const toggleSound = ({ commit }) => {
  commit(types.TOGGLE_SOUND)
}
