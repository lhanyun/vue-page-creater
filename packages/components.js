export default [
  {
    name: '布局组件',
    child: [
      {
        name: '区块容器',
        component: 'c-area-wrap',
        container: true
      }
    ]
  }, {
    name: '功能组件',
    child: [
      {
        name: '文章列表',
        component: 'c-art-list'
      },
      {
        name: '单元格',
        component: 'van-cell',
        container: true
      },
      {
        name: '按钮',
        component: 'van-button'
      }
    ]
  }, {
    name: '辅助组件',
    child: [
      {
        name: '辅助空白',
        component: 'c-white-space'
      }
    ]
  }
]
