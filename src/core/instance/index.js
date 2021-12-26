import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 声明构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  // 构造函数仅执行了_init()
  this._init(options)
}

// 实现实例属性和实例方法
initMixin(Vue)  // 实现_init()方法
stateMixin(Vue)  // $set() $delete() $watch() $data $props
eventsMixin(Vue)  // 事件监听方法 $emit() $on() $off() $once()
lifecycleMixin(Vue)  // 生命周期方法 $forceUpdate()  $destroy()
renderMixin(Vue)  // 渲染相关方法 $nextTick()

export default Vue
