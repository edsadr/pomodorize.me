export default [
  {
    path: '/',
    name: 'pomodoro-timer',
    component: require('components/TimerPageView')
  },
  {
    path: '*',
    redirect: '/'
  }
]
