const typeCheck = require('../type/typeCheck')
/**
 * @description 判断传入的参数 'obj' 是否为空对象
 * @description 传入非对象参数时直接返回 false
 *
 * @param {*} obj
 * @returns {boolean}
 */
function isEmptyObj(obj) {
	if (!obj || !typeCheck.isObject(obj)) {
		return false
	}
	return !Object.keys(obj).length
}

module.exports = isEmptyObj;