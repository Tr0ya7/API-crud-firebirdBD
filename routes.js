const { Router } = require('express')
const { getProducts, postProduct, patchProduct, deleteProduct } = require('./controller.js')
const router = Router()

router.get('/', getProducts)
router.post('/', postProduct)
router.patch('/', patchProduct)
router.delete('/', deleteProduct)

module.exports = router