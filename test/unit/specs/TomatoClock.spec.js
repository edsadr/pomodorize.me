import Vue from 'vue'
import store from 'src/vuex/store'
import TomatoClock from 'src/components/TimerPageView/TomatoClock'

describe('TomatoClock.vue', () => {
  it('should render initial state properly', () => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TomatoClock)
    }).$mount()

    expect(vm.$el.querySelector('.clock-minutes').textContent).to.contain('25')
    expect(vm.$el.querySelector('.clock-seconds').textContent).to.contain('0')
  })

  it('should render clock changes', () => {
    store.commit('DECREMENT_MINUTES')
    store.commit('DECREMENT_SECONDS')
    store.commit('DECREMENT_SECONDS')

    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TomatoClock)
    }).$mount()

    expect(vm.$el.querySelector('.clock-minutes').textContent).to.contain('24')
    expect(vm.$el.querySelector('.clock-seconds').textContent).to.contain('58')

    store.commit('RESTART_MINUTES')
    store.commit('RESTART_SECONDS')
  })

  it('should render countdown class if clock is ticking', () => {
    store.commit('TOGGLE_TICKING')

    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TomatoClock)
    }).$mount()

    expect(vm.$el.querySelector('.clock-seconds').className).to.contain('countdown')

    store.commit('TOGGLE_TICKING')
  })
})
