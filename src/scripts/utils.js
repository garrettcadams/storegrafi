
const parseParamString = function(str) {
	let params = str.split('&'),
		paramObj = {}
	// ['key=val','key2=val2']
	params.forEach(function(keyValString) {
		paramObj[keyValString.split('=')[0]] = keyValString.split('=')[1]
	})
	return paramObj
}

const findCookie = function(targetKey) {
	var cookies = document.cookie.split(';')
	var targetVal
	cookies.forEach(function(cookie){
		let key = cookie.split('=')[0].trim(),
			val = decodeURIComponent(cookie.split('=')[1])
		if (key === targetKey) {
			targetVal = val
		}
	})
	return targetVal
}

const init = function() {
	var app_name = findCookie('tiy_full_stack_app_name')
	var user = findCookie(app_name + '_user')
	localStorage.setItem(app_name + '_user',user)
	return app_name
}

export {init,findCookie,parseParamString}
