<style scoped>
  #user-menu{
    margin-right: 5%;
    align-self: flex-end;
  }

  #pomo-avatar {
    width: 42px;
    height: 42px;
    border-radius: 21px;
    background: white;
    border: 1px solid var(--dark-border);
    margin-right: 10px;
    vertical-align: middle;
    box-shadow: 0 2px 1px 1px rgba(0,0,0,0.1);
  }

  .power-off {
    padding: 10px 13px;
    border-radius: 22px;
    background: var(--red-tomato);
    font-size: 18px;
    color: white;
    text-align: center;
    margin-left: 3%;
    -webkit-app-region: no-drag;
  }

  .power-off:hover {
    background: var(--green-tomato);
    color: white;
    cursor: pointer;
  }

  .power-off i {

  }

   .power-off .fa {
    display: inherit;
   }
</style>

<template>
  <div id="user-menu">
    <img id="pomo-avatar" :src="avatar" :alt="user">
    Hi, {{ user }}!
    <a @click="quit" class="power-off"><i class="fa fa-power-off"></i></a>
  </div>
</template>

<script>
  import robot1 from './assets/robot1.png'
  import robot2 from './assets/robot2.png'
  import robot3 from './assets/robot3.png'

  const avatars = [robot1, robot2, robot3]

  export default {
    data () {
      return {
        user: '',
        avatar: ''
      }
    },
    created () {
      this.user = (process.env.NODE_ENV !== 'testing') ? this.$electron.remote.getGlobal('getUsername')() : 'test'
      this.avatar = robot1

      // Get avatar just in production
      if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'testing') this.getAvatar()
    },
    methods: {
      quit () {
        this.$electron.remote.app.quit()
      },
      getAvatar () {
        this.$electron.remote.getGlobal('getAvatar')((err, avatar) => {
          if (err) {
            let index = Math.floor(Math.random() * avatars.length)
            this.avatar = avatars[index]
            return
          }
          this.avatar = avatar
        })
      }
    }
  }
</script>
