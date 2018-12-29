const ora = require('ora')
const rm = require('rimraf')

// 替换模块文件
let clearing = ora('clearing...')
clearing.start()
rm('*.js', err => {
	if (err) throw (err)
	clearing.stop()
})