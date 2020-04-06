export const isEmpty = (value: any) => {
  return typeof value === 'undefined' || value === null
}
const toString = Object.prototype.toString
export const isPlainObject = (value: any): value is Object => {
  return toString.call(value) === '[object Object]'
}

export const isDate = (value: any): value is Date => {
  return toString.call(value) === '[object Date]'
}

// 类型谓词
export const isObject = (value: any) => {
  return value !== null && typeof value === 'object'
}

/**
 * 将from的属性赋值到to中，包括原型上的属性
 * @param to
 * @param from
 */
export const extend = <T, U>(to: T, from: U): T & U => {
  // for ... in 以任意顺序遍历一个对象的除Symbol以外的可枚举属性(包括原型链上的可枚举属性)
  // 可枚举属性是指那些内部可枚举标志设置为true的属性，对于通过直接的赋值和属性初始化的属性，该标识值默认即为true
  // 对于通过Object.defineProperty等定义的属性，该标识值默认为false
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
