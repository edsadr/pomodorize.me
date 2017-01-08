import Vue from 'vue'
import Electron from 'vue-electron'
import store from 'src/vuex/store'
import PomoAvatar from 'src/components/TopBar/PomoAvatar'

Vue.use(Electron)

describe('PomoAvatar.vue', () => {
  it('should contain an avatar', () => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(PomoAvatar)
    }).$mount()

    expect(vm.$el.querySelector('img').alt).to.equal('test')
  })
})
