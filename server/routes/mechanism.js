import express from 'express'
import MechanismController from '../controllers/Mechanism.js'
import authMiddleware from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = new express.Router()

router.get('/getall', MechanismController.getAll)
router.get('/getone/:id([0-9]+)', MechanismController.getOne)
router.post('/create', MechanismController.create)
router.put('/update/:id([0-9]+)', MechanismController.update)
router.delete('/delete/:id([0-9]+)', MechanismController.delete)

export default router