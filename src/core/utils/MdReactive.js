// import * as Vue from 'vue'



// export default function (data) {
//   const Instance = {}
// 	console.log(Vue)
//   Vue.util.defineReactive(Instance, 'reactive', data)

//   return Instance.reactive
// }


import { reactive } from 'vue'

export default function (data) {
  const Instance = reactive(data)
  return Instance
}
