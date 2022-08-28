const router = require('express').Router()
const userController = require('../controllers/project1/userController')
const loginController = require('../controllers/project1/loginController')
// const auth = require('../middleware/auth')

router.post('/login', loginController.loginUser)
router.post('/register', userController.createUser)
router.get('/profile', userController.getUser)
router.get('/users', userController.getUsers)
router.put('/profile', userController.updateUser)

module.exports = router
