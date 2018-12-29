const typeCheck = require('../src/type/typeCheck')

test('check type null', () => {
	expect(typeCheck(null)).toBe('null')
})

test('check type undefined', () => {
	expect(typeCheck(undefined)).toBe('undefined')
})

test('check type object', () => {
	expect(typeCheck({obj: 'obj'})).toBe('object')
})

test('check type array', () => {
	expect(typeCheck(['array'])).toBe('array')
})

test('check type string', () => {
	expect(typeCheck('string')).toBe('string')
})

test('check type object', () => {
	expect(typeCheck({})).toBe('object')
})

test('check type number', () => {
	expect(typeCheck(1)).toBe('number')
})

test('check type boolean', () => {
	expect(typeCheck(true)).toBe('boolean')
})

test('check type function', () => {
	expect(typeCheck(()=>{})).toBe('function')
})

test('check type regexp', () => {
	expect(typeCheck(new RegExp(/^r$/))).toBe('regexp')
})

test('check type map', () => {
	expect(typeCheck(new Map([['name', 'moses']]))).toBe('map')
})

test('check type set', () => {
	expect(typeCheck(new Set([1, 2, 3]))).toBe('set')
})

test('check type symbol', () => {
	expect(typeCheck(Symbol('symbol value'))).toBe('symbol')
})