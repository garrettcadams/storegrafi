
const parseParamString = function(str) {
	let params = str.split('&'),
		paramObj = {}
	// ['key=val','key2=val2']
	params.forEach(function(keyValString) {
		paramObj[keyValString.split('=')[0]] = keyValString.split('=')[1]
	})
	return paramObj
}

export {parseParamString}