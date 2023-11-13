const { Router } = require('express')
const { getProducts, postProduct, patchProduct, deleteProduct } = require('./controller.js')
const router = Router()

router.get('/', getProducts)
router.post('/', postProduct)

module.exports = router