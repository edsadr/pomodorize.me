import Vue from 'vue'
import Electron from 'vue-electron'
import store from 'src/vuex/store'
import TopBar from 'src/components/TopBar'

Vue.use(Electron)

describe('TopBar.vue', () => {
  it('should contain logo and avatar', () => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(TopBar)
    }).$mount()

    expect(vm.$el.querySelectorAll('img').length).to.equal(2)
  })
})
