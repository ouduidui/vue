/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

// 获取数组原型
const arrayProto = Array.prototype
// 复制一份
export const arrayMethods = Object.create(arrayProto)

// 定义要覆盖的七个方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
// 遍历覆盖
methodsToPatch.forEach(function (method) {
  // cache original method
  // 获取原始方法
  const original = arrayProto[method]
  // 修改这些方法的descriptor
  def(arrayMethods, method, function mutator (...args) {
    // 先执行原始方法
    const result = original.apply(this, args)
    // 获取到对象的observer实例用于发送通知
    const ob = this.__ob__
    // 如果是插入动作，对新插入的元素进行响应式处理
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 若有新增则做响应处理
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 变更通知
    ob.dep.notify()
    return result
  })
})
