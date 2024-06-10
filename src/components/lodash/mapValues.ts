// 简易的lodash版本的mapValues,
// mapValues({dog:{name:'狗'},cat: {name:'猫'}},(item)=> item.name)  ====> {dog:'狗, cat: '猫'}
export const mapValues = (object: Record<string, any>, fn): Record<string, any> => {
  if (!(typeof fn === 'function')) return object
  const mapObj = {}
  Object.keys(object).forEach((item) => {
    mapObj[item] = fn(object[item])
  })
  return mapObj
}
