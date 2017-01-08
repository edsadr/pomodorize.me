import Vue from 'vue'
import store from 'src/vuex/store'
import ClockBuzzer from 'src/components/TimerPageView/ClockBuzzer'

describe('ClockBuzzer.vue', () => {
  it('should have two audio elements', () => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(ClockBuzzer)
    }).$mount()

    expect(vm.$el.querySelectorAll('audio').length).to.equal(2)
  })

  it('should change the button class if sound is enabled', () => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(ClockBuzzer)
    }).$mount()

    expect(vm.$el.querySelector('i').className).to.contain('fa-volume-up')
  })

  it('should change the button class if sound is disabled', () => {
    store.dispatch('toggleSound')

    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(ClockBuzzer)
    }).$mount()

    expect(vm.$el.querySelector('i').className).to.contain('fa-volume-off')

    store.dispatch('toggleSound')
  })

  it('should not play the sound initially', () => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(ClockBuzzer)
    }).$mount()

    expect(vm.$el.querySelector('audio').paused).to.equal(true)
  })

  it('should play the sound if clock is ticking', (done) => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(ClockBuzzer)
    }).$mount()

    vm.$store.dispatch('startClock')

    vm.$nextTick(() => {
      expect(vm.$el.querySelector('audio').paused).to.equal(false)
      vm.$store.dispatch('stopClock')
      done()
    })
  })

  it('should pause the sound if mute', (done) => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(ClockBuzzer)
    }).$mount()

    vm.$store.dispatch('startClock')

    vm.$nextTick(() => {
      expect(vm.$el.querySelector('audio').paused).to.equal(false)
      vm.$store.dispatch('toggleSound')

      vm.$nextTick(() => {
        expect(vm.$el.querySelector('audio').paused).to.equal(true)
        vm.$store.dispatch('toggleSound')
        vm.$store.dispatch('stopClock')
        done()
      })
    })
  })

  it('should play the sound after finish', (done) => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(ClockBuzzer)
    }).$mount()

    vm.$store.commit('TOGGLE_FINISHED')

    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('audio')[1].paused).to.equal(false)
      vm.$store.commit('TOGGLE_FINISHED')
      done()
    })
  })
})
