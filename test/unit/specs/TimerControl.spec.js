import Vue from 'vue'
import store from 'src/vuex/store'
import TimerControl from 'src/components/TimerPageView/TimerControl'

describe('TimerControl.vue', () => {
  it('should render initial state properly', () => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TimerControl)
    }).$mount()

    expect(vm.$el.querySelector('i').className).to.contain('fa-play-circle')
  })

  it('should render ticking state', () => {
    store.commit('TOGGLE_TICKING')

    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TimerControl)
    }).$mount()

    expect(vm.$el.querySelector('i').className).to.contain('fa-stop-circle')

    store.commit('TOGGLE_TICKING')
  })

  it('should render finsihed state', () => {
    store.commit('TOGGLE_FINISHED')

    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TimerControl)
    }).$mount()

    expect(vm.$el.querySelector('i').className).to.contain('fa-refresh')

    store.commit('TOGGLE_FINISHED')
  })

  it('should start the clock', (done) => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TimerControl)
    }).$mount()

    vm.$nextTick(() => {
      vm.$children[0].startStopClock()
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('i').className).to.contain('fa-stop-circle')
        vm.$children[0].startStopClock()
        done()
      })
    })
  })

  it('should stop the clock', (done) => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TimerControl)
    }).$mount()

    vm.$nextTick(() => {
      vm.$children[0].startStopClock()
      vm.$nextTick(() => {
        vm.$children[0].startStopClock()
        vm.$nextTick(() => {
          expect(vm.$el.querySelector('i').className).to.contain('fa-play-circle')
          done()
        })
      })
    })
  })

  it('should restart the clock', (done) => {
    store.commit('TOGGLE_FINISHED')

    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TimerControl)
    }).$mount()

    vm.$nextTick(() => {
      vm.$children[0].startStopClock()
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('i').className).to.contain('fa-stop-circle')
        vm.$children[0].startStopClock()
        done()
      })
    })
  })

  it('should watch the seconds', function (done) {
    this.timeout(3000)

    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TimerControl)
    }).$mount()

    vm.$nextTick(() => {
      vm.$children[0].startStopClock()
      let initialSeconds = vm.$children[0].seconds
      setTimeout(() => {
        assert(vm.$children[0].seconds > initialSeconds)
        vm.$children[0].startStopClock()
        done()
      }, 2000)
    })
  })
})
