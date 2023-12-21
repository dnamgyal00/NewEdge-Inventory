import {Router} from 'express'
import {createCategory,fetchCategories,fetchCategory,updateCategory,deleteCategory,
createItem,fetchItem,fetchItems,updateItem,deleteItem,
createItemInstance,fetchItemInstance,fetchItemInstances,updateItemInstance,deleteItemInstance} from '../Controller/InventoryController.js'

const InventoryRoutes = Router();
//CATEGORY
InventoryRoutes.post("/category",createCategory);
InventoryRoutes.get("/category",fetchCategories);
InventoryRoutes.get("/category/:id",fetchCategory);
InventoryRoutes.put("/category/:id",updateCategory);
InventoryRoutes.delete("/category/:id",deleteCategory);
//ITEM
InventoryRoutes.post("/item",createItem);
InventoryRoutes.get("/item",fetchItems);
InventoryRoutes.get("/item/:id",fetchItem);
InventoryRoutes.put("/item/:id",updateItem);
InventoryRoutes.delete("/item/:id",deleteItem);
//ITEM_INSTANCE
InventoryRoutes.post("/itemInstance",createItemInstance);
InventoryRoutes.get("/itemInstance",fetchItemInstances);
InventoryRoutes.get("/itemInstance/:id",fetchItemInstance);
InventoryRoutes.put("/itemInstance/:id",updateItemInstance);
InventoryRoutes.delete("/itemInstance/:id",deleteItemInstance);


export default InventoryRoutes;