// lodash的get方法的简易实现
export function get(object, path: string | Array<string>, defaultValue = 'undefined') {
  // 构造数组,将'['和']'替换成'.'
  let newPath: Array<string> = []
  if (Array.isArray(path)) {
    newPath = path
  } else {
    newPath = path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
  }
  return (
    newPath.reduce((a, b) => {
      return a?.[b]
    }, object) || defaultValue
  )
}

// 测试
// const obj = {
//   a: {
//       b: [{
//           c: 1
//       }]
//   }
// }

// console.log(get(obj, 'a.b[0].c[1].e[2][1].e', 0));  ===> 0
// console.log(get(obj, 'a.b[0].c', 0));====>1
// console.log(get(obj, 'a.b.c', 0));  ===>0

// console.log(get(obj, 'a', 0)); ===> 0
