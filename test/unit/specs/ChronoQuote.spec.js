import Vue from 'vue'
import store from 'src/vuex/store'
import ChronoQuote from 'src/components/TimerPageView/ChronoQuote'

let author
let quote

describe('ChronoQuote.vue', () => {
  it('should render initial state properly', () => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(ChronoQuote)
    }).$mount()

    author = vm.$el.querySelector('.author').textContent
    quote = vm.$el.querySelector('.quote').textContent

    expect(vm.$el.querySelector('.quote').textContent).should.not.equal('')
    expect(vm.$el.querySelector('.author').textContent).should.not.equal('')
  })

  it('should change quote on ticking', () => {
    store.commit('TOGGLE_TICKING')

    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(ChronoQuote)
    }).$mount()

    expect(vm.$el.querySelector('.quote').textContent).should.not.equal(quote)
    expect(vm.$el.querySelector('.author').textContent).should.not.equal(author)

    store.commit('TOGGLE_TICKING')
  })
})
