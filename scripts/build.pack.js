const webpack = require('webpack')
const path = require('path')
const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')

const webpackConfig = require('../config/webpack.config')
const pkg = require('../package.json')
const rootPath = path.resolve(__dirname, '../')

/** 
 * 构建压缩版本
 */ 
let building = ora('building...')
building.start()
rm(path.resolve(rootPath, 'min', `${pkg.name}.min.js`), err => {
	if (err) {
		throw(err)
	}
	building.stop()
	webpack(webpackConfig, function (err, stats) {
		if (err) {
			throw (err)
		}
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n\n')
		console.log(chalk.cyan('  Build complete.\n'))
	})
})