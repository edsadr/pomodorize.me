<style scoped>
  #chrono-quote {
    margin-top: 5%;
    padding-top: 3%;
    border-top: 1px solid var(--light-border);
    text-align: center;
    -webkit-user-select: text;
    -webkit-app-region: no-drag;
    cursor: text;
  }

  #chrono-quote p.quote {
    font-style: italic;
    font-weight: 100;
    color: var(--light-gray);
    padding: 10px;
  }

  #chrono-quote p.author {
    font-style: normal;
    font-weight: 300;
    color: var(--dark-gray);
    padding: 10px 10px 5%;
  }
</style>

<template>
  <div id="chrono-quote" unselectable="off">
    <p class="quote">“{{ text }}”</p>
    <p class="author">{{ author }}</p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import phrases from './assets/quotes.json'

  export default {
    created () {
      this.setQuote()
    },
    computed: {
      ...mapGetters({
        ticking: 'tickingClock'
      })
    },
    data () {
      return {
        text: '',
        author: ''
      }
    },
    methods: {
      setQuote () {
        let index = Math.floor(Math.random() * phrases.quotes.length)
        this.text = phrases.quotes[index].text
        this.author = phrases.quotes[index].author
      }
    },
    watch: {
      ticking: function (val) {
        if (val) {
          this.setQuote()
        }
      }
    }
  }
</script>
