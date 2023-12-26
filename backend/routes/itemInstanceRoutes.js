import {Router} from 'express'
import {createItemInstance,fetchItemInstance,fetchItemInstances,updateItemInstance,deleteItemInstance} from '../Controller/itemInstanceController.js'

const itemInstanceRoutes = Router();

//ITEM_INSTANCE
itemInstanceRoutes.post("/",createItemInstance);
itemInstanceRoutes.get("/",fetchItemInstances);
itemInstanceRoutes.get("/:id",fetchItemInstance);
itemInstanceRoutes.put("/:id",updateItemInstance);
itemInstanceRoutes.delete("/:id",deleteItemInstance);


export default itemInstanceRoutes;