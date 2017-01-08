import Vue from 'vue'
import store from 'src/vuex/store'
import TimerPageView from 'src/components/TimerPageView'

describe('TimerPageView.vue', () => {
  it('should render correct initial content', () => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TimerPageView)
    }).$mount()

    expect(vm.$el.querySelector('h1').textContent).to.contain('Pick some tasks to get done')
  })

  it('should render correct if clock is ticking', () => {
    store.commit('TOGGLE_TICKING')

    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TimerPageView)
    }).$mount()

    expect(vm.$el.querySelector('h1').textContent).to.contain('The Clock’s ticking!')

    store.commit('TOGGLE_TICKING')
  })

  it('should render correct if clock is finished', () => {
    store.commit('TOGGLE_FINISHED')

    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TimerPageView)
    }).$mount()

    expect(vm.$el.querySelector('h1').textContent).to.contain('Time to get a short rest')

    store.commit('TOGGLE_FINISHED')
  })
})
