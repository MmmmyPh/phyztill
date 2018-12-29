const typeCheck = require('../type/typeCheck')

/** 用于匹配属性路径中的属性名称 */
const reIsPlainProp = /^\w*$/;
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/; //用来匹配属性名里包含路径属性  例如什么. [] \这种
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * @description 判断 value 是一个 对象的属性名 还是一个 取值属性路径
 *
 * @param {*} value
 * @param {*} obj
 * @returns {boolean} 
 */
function isKey(value, obj) {
	if (typeCheck.isArray(value)) {
		return false;
	}

	if (typeCheck.isNumber(value) || typeCheck.isSymbol(value) || typeCheck.isBoolean(value) || typeCheck.isNull(value)) {
		return true;
	}

	return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (obj !== null && Reflect.has(Object(obj), value));
}

/**
 * @description 将 'a[0].b.c', 'a.b.c', 'a["0"].b.c' 这样的 string 类型的路径整理为数组
 *
 * @param {*} str
 * @returns {array} path
 */
function stringToPath(str) {
	let result = []
	if (str.charCodeAt(0) === 46) {
		result.push('')
	}

	str.replace(rePropName, (match, number, quote, subString) => {
		result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match))
	});

	return result
}

/**
 * @description 将 path 的类型转换为数组
 *
 * @param {*} value
 * @param {*} obj
 * @returns {array} path
 */
function castPath(value, obj) {
	if (typeCheck.isArray(value)) {
		return value
	}

	return isKey(value, obj) ? [value] : stringToPath(value)
}

/**
 * @description 将对象的 key 转变为 string 或 symbol 类型
 *
 * @param {*} value
 * @returns {string|symbol} key
 */
function toKey(value) {
	if (typeCheck.isString(value) || typeCheck.isSymbol(value)) {
		return value;
	}
	let result = (value + '');
	return (result == '0' && (1 / value) == '-INFINITY') ? '-0' : result;
}

/**
 * @description 获取对象中的某个字段值，
 *
 * @param {object|array} obj		目标对象
 * @param {string|array} keyPath	目标值的路径
 * @param {*} [nullValue=undefined]	空值预设
 * @returns {*} Returns the resolved value.
 * @example
 * let obj1 = { a: [ 1, { b: { c: 3 } } ] }
 * let obj2 = { a: { c: '123' } }
 *
 * getIn(obj1, 'a[1].b.c')	// 3
 * getIn(obj1, ['a', 1, 'b', 'c'])	// 3
 *
 * getIn(obj2, 'a.c')	// '123'
 * getIn(obj2, 'a.d')	// undefined
 * getIn(obj2, 'a.d', null)	// null
 *
 *  getIn(obj2, 'a.d.c')	// undefined
 */
function getInObj(obj, keyPath, nullValue = undefined) {
	keyPath = castPath(keyPath, obj)

	let index = 0,
		length = keyPath.length

	while (obj !== null && obj !== undefined && index < length) {
		obj = obj[toKey(keyPath[index++])]
	}

	return (index && index === length) ? obj : nullValue;
}

module.exports = getInObj