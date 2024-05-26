import SuspenseLazy from '@/components/SuspenseLazy'
// import() 函数与变量结合，Webpack 确实会把所有可能的模块都打包，从而可能会导致打包结果的体积增大。
// 因为Webpack在编译时无法确定具体要加载哪个模块，所以它会采取“安全”的做法，将所有可能的模块都进行打包
const asyncLoadRouteCom = (comPath: string) => {
  // /* webpackChunkName: "[request]" */ 属于webpack的黑魔法指令，会将后面的路径的comPath作为name，打包即可看到结果
  return SuspenseLazy(() => import(/* webpackChunkName: "[request]" */ `@/page/${comPath}`))
}
export { asyncLoadRouteCom }
