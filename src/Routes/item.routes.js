import Router from 'express'
import { addItem,updateItem ,getByLevel,getByParent,deleteById,deleteByName} from '../controller/item.controller.js'
const router = Router()


router.post('/additem',addItem)
router.put('/updateitem/:id',updateItem)
router.get('/getbylevel',getByLevel)
router.get('/getbyparent',getByParent)

router.delete('/deletebyid/:id',deleteById)
router.delete('/deletebyname',deleteByName)



export default router