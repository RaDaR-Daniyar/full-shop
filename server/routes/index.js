import express from 'express'

import product from './product.js'
import category from './category.js'
import brand from './brand.js'
import mechanism from './mechanism.js'
import gender from './gender.js'
import shape from './shape.js'
import material from './material.js'
import glass from './glass.js'


import user from './user.js'
import basket from './basket.js'
import rating from './rating.js'
import order from './order.js'

const router = new express.Router()

router.use('/product', product)
router.use('/category', category)
router.use('/brand', brand)
router.use('/mechanism', mechanism)
router.use('/gender', gender)
router.use('/shape', shape)
router.use('/material', material)
router.use('/glass', glass)


router.use('/user', user)
router.use('/basket', basket)
router.use('/rating', rating)
router.use('/order', order)

export default router