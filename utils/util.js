//判空
export function isNull(val) {
	if (val === null || val === "" || val === undefined) {
		return true
	} else {
		return false
	}
}

export function showText(val) {
	if (val === null || val === undefined) {
		return ''
	} else {
		return val
	}
}