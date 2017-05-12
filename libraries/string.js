let sha1 = require('sha1')
let prefix = '/8Z4{Uj=19uMPRx6Y'

exports.generatePasswordHash = (password) => {
	return sha1(prefix + password)
}