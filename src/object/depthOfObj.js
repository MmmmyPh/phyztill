/**
 * @description 检查对象的深度
 *
 * @param {*} obj
 * @returns {number} level
 */
function depthOfObj(obj) {
	let level = 1;

	for (let key in obj) {
		if (!obj.hasOwnProperty(key)) {
			continue;
		}
		if (typeof obj[key] === 'object') {
			let depth = depthOfObj(obj[key]) + 1;
			level = Math.max(depth, level)
		}
	}

	return level
}

module.exports = depthOfObj