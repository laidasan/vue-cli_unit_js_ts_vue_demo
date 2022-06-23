<template>
  <div class="hello">
    <button @click="onButtonClick">Test Num Click</button>
    {{ numReactive.num }}
    {{ $v.num.$error }}

    <!-- {{ $v.numReactive.$error }} -->
    <!-- {{ $v.tNum.$error }} -->
    <!-- {{ $v.obNum.$error }} -->
    <!-- {{ $v.numReactive.num.$error }} -->
     <!-- {{ $v }} -->
     <!-- {{ $v.num.$model }} -->
     <!-- {{ $v.num.$error }} -->
     <!-- tNum {{ tNum }} -->
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener">typescript</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha" target="_blank" rel="noopener">unit-mocha</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from '@vue/composition-api'
import accountModule from '../base/store/account/index.js'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useVuelidate = require('@vuelidate/core').default

export const touch = ($v: any) => (validationName: string) => {
  console.log('go')
  if (!validationName) return
  console.log('has validationName')
  if (!$v[validationName].$touch) return
  console.log('has touch')
  // validators 2.0.0-alpha.0 有 bug，目前 $touch 無作用，暫時直接修改 $dirty
  $v[validationName].$touch()
  // eslint-disable-next-line no-param-reassign
  $v[validationName].$dirty = true
  console.log('modify $dirty')
}

// import Vue from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup (props, context) {
    const $store = context.root.$store
    if ($store.state.account === undefined) { $store.registerModule('account', accountModule) }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const ob = computed(() => $store.state.account.ob)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const obNum = computed(() => ob.value.num)

    const updateOb = (payload: any) => $store.dispatch('account/updateOb', payload)

    console.log('ob', ob)
    console.log('obNum', obNum)

    const num = ref(0)
    const numReactive = reactive({
      num: 0
    })

    const numValidate = (value: any) => {
      console.log('numValidate', value)

      return !!value && value % 2 === 0
    }

    const tNum = computed(() => {
      console.log('tNum')

      return numReactive.num
    })

    // const $v = useVuelidate({
    //   num: { numValidate }
    // }, { num })

    const $v = useVuelidate({
      num: { numValidate }
    }, numReactive)

    // const $v = useVuelidate({
    //   tNum: { numValidate }
    // }, {
    //   tNum
    // })

    // const $v = useVuelidate({
    //   obNum: { numValidate }
    // }, {
    //   obNum
    // })

    const touchNum = () => touch($v)('num')

    const onButtonClick = () => {
      num.value = num.value + 1
      numReactive.num = numReactive.num + 1
      updateOb({ num: num.value })

      touchNum()
      // $v.numReactive.$dirty = true
      console.log($v)
    }

    return {
      $v,
      onButtonClick,
      num,
      numReactive,
      tNum,
      obNum
    }
  }
  // methods: {
  //   test () {
  //     if (this.msg) {
  //       alert(this.msg)
  //     }
  //   }
  // }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
