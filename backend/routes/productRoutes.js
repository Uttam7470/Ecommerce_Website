import express from 'express'
import {createProduct, getAllProducts} from '../controllers/productController.js'

const productRouter = express.Router();

productRouter.post('/' ,createProduct)
productRouter.get('/' ,getAllProducts)


// ecomRouter.post('/user/login', loginUser)
// ecomRouter.post('/user/logout', logoutUser)


export default productRouter;