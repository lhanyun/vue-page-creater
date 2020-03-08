<template>
  <draggable
    class="dragArea"
    :class="{
      'dragAreaEdit': edit
    }"
    :list="list"
    :group="{ name: 'g1' }"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
  >
    <template v-for="(item, index) in list">
      <component
        :is="item.component"
        v-bind="item.props"
        :key="index"
        :class="{
          'viewCptItem': edit,
          'active': activeKey === indexKey(index)
        }"
        @click.native.stop="handleSelect(indexKey(index))"
        :indexList="indexKey(index)"
        :ref="`cpt-${indexKey(index)}`"
      >
        <template v-if="item.child">
          <DeepItem
            :list="item.child"
            :edit="edit"
            :prevIndexKey="indexKey(index)"
            :activeKey="activeKey"
            :select="select"
            :initKey="initKey"
            ></DeepItem>
        </template>
      </component>
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'DeepItem',
  components: {
    draggable
  },
  props: {
    list: Array,
    edit: Boolean,
    activeKey: String,
    select: Function,
    prevIndexKey: {
      type: String,
      default: ''
    },
    initKey: Function
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: !this.edit,
        ghostClass: 'ghost'
      }
    }
  },
  data () {
    return {
      drag: false,
      componentProps: null,
      title: 'title'
    }
  },
  watch: {
    drag: function () {
      this.initKey()
    }
  },
  methods: {
    /**
     * 生成 key 值
     */
    indexKey: function (index) {
      return this.prevIndexKey ? this.prevIndexKey + '-' + index : index.toString()
    },

    /**
     * 选择组件
     */
    handleSelect: function (key) {
      const componentObj = this.list[key]
      if (componentObj.component.indexOf('van-') !== -1) {
        if (Object.keys(componentObj).indexOf('props') === -1) {
          const path = componentObj.component.slice(4)
          const cell = require(`vant/lib/${path}`)
          const props = this.getConfig(this.deepCopy(cell.default.props))
          props['test'] = 'default'
          this.select(key, props)
        } else {
          this.select(key, componentObj.props)
        }
      } else {
        const props = this.$refs[`cpt-${key}`][0].getConfig()
        this.select(key, props)
      }
    },

    /**
     * 获取组件属性
     */
    getConfig (object) {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key]
          const typeName = this.typeOf(element)
          if (typeName === 'function') {
            if (object[key].name === 'String') {
              object[key] = ''
            } else if (object[key].name === 'Boolean') {
              object[key] = false
            } else {
              object[key] = ''
            }
          } else if (typeName === 'object') {
            object[key] = object[key]['default']
          } else if (typeName === 'array') {
            object[key] = ''
          } else if (typeName === 'null') {
            object[key] = ''
          } else {
            object[key] = ''
          }
        }
      }

      return object
    },
    // 深拷贝
    typeOf (obj) {
      const toString = Object.prototype.toString
      const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
      }
      return map[toString.call(obj)]
    },
    // deepCopy
    deepCopy (data) {
      const t = this.typeOf(data)
      let o

      if (t === 'array') {
        o = []
      } else if (t === 'object') {
        o = {}
      } else {
        return data
      }

      if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
          o.push(this.deepCopy(data[i]))
        }
      } else if (t === 'object') {
        for (let i in data) {
          o[i] = this.deepCopy(data[i])
        }
      }
      return o
    }
  }
}
</script>

<style lang="less">
@import './index.less';

.dragAreaEdit {
  &:after {
    content: '可拖入组件';
    display: block;
    width: 100%;
    height: 100px;
    text-align: center;
    line-height: 100px;
    box-sizing: border-box;
    border: 1px dashed #ddd;
    flex: 0 0 100%;
  }
}
</style>
