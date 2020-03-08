<template>
  <van-button type="default">默认按钮</van-button>
</template>

<script>
import button from 'vant/lib/button'
export default {
  name: 'ZvButton',
  props: button.props,
  data () {
    return {
      button
    }
  },
  methods: {
    getConfig: function () {
      debugger
      return this.$props
    }
  }
}
</script>
