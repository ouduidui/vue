/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    // 将mixin参数插入this.options中
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
