const { createUser, login } = require('../controllers/userController')

const router = require('express').Router()

router.get('/', (req, res) => {
	res.send('hello')
})
router.post('/', createUser)

router.post('/login', login)

module.exports = router
