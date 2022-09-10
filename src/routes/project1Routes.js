const router = require('express').Router()
const userController = require('../controllers/project1/userController')
const loginController = require('../controllers/project1/loginController')
const appointmentController = require('../controllers/project1/appointmentController')
// const auth = require('../middleware/auth')
//user routes
router.post('/login', loginController.loginUser)
router.post('/register', userController.createUser)
router.get('/profile', userController.getUser)
router.get('/users', userController.getUsers)
router.put('/profile', userController.updateUser)

//appointments routes
router.post('/appointment', appointmentController.createAppointment)
router.post('/appointments', appointmentController.getAllAppointmentsById)
router.get('/appointments/:id', appointmentController.getAppointmentById)
router.put('/appointments', appointmentController.updateAppointment)
router.delete('/appointment', appointmentController.deleteAppointment)




module.exports = router
