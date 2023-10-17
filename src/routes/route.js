import { Router } from 'express'
import { router as userRouter } from '../modules/users/user.route.js'
import { router as repairRouter } from '../modules/repairs/repairs.route.js'


export const router = Router()


// lo que coloque aca se va a concatenar con /api/v1
router.use('/users', userRouter)
router.use('/repairs', repairRouter)

