import cookie from 'js-cookie'

// setting cookie
export const setCookie = (key, value) => {
	if (window !== 'undefined') {
		cookie.set(key, value, {
			// 1 day
			expires: 1
		})
	}
}

// Removing cookie
export const removeCookie = key => {
	if (window !== 'undefined') {
		cookie.remove(key, {
			expires: 1
		})
	}
}

// Get value from cookie
export const getCookie = key => {
	if (window !== 'undefined') {
		return cookie.get(key)
	}
}

// Storing cookie in localStorage
export const setLocalStorage = (key, value) => {
	if (window !== 'undefined') {
		localStorage.setItem(key, JSON.stringify(value))
	}
}

// Remove cookie from localStorage
export const removeLocalStorage = key => {
	if (window) {
		localStorage.removeItem(key)
	}
}

// Auth after log in
export const authenticate = (response, next) => {
	setCookie('token', response.data.token)
	setLocalStorage('user', response.data.token)
	next()
}

// user log out
export const logout = next => {
	removeCookie('token')
	removeLocalStorage('user')
	next()
}

// Get user auth state from local storage
export const isAuth = () => {
	if (window) {
		const cookieChecked = getCookie('token')
		if (cookieChecked) {
			if (localStorage.getItem('user')) {
				return JSON.parse(localStorage.getItem('user'))
			} else {
				return false
			}
		}
	}
}

// update user data in localStorage
export const updateUser = (response, next) => {
	if (window) {
		let auth = JSON.parse(localStorage.getItem('user'))
		auth = response.data
		localStorage.setItem('user', JSON.stringify(auth))
	}
	next()
}
