/**
 * @desc webpack打包入口文件
 * @desc 自动引入 src 目录下所有js文件
 */

let moduleExports = {}

/**
 * 创建文件（ 模块） 上下文
 */
let r = require.context('./', true, /^\.\/.+\/.+\.js$/)
/**
 * 遍历上下文请求，动态添加模块
 */
r.keys().forEach(key => {
	let attr = key.substring( key.lastIndexOf('/') + 1, key.lastIndexOf('.') )
	moduleExports[attr] = r( key )
})

module.exports = moduleExports;