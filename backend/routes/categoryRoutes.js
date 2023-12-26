import {Router} from 'express'
import {createCategory,fetchCategories,fetchCategory,updateCategory,deleteCategory} from '../Controller/categoryController.js'

const categoryRoutes = Router();
//CATEGORY
categoryRoutes.post("/",createCategory);
categoryRoutes.get("/",fetchCategories);
categoryRoutes.get("/:id",fetchCategory);
categoryRoutes.put("/:id",updateCategory);
categoryRoutes.delete("/:id",deleteCategory);

export default categoryRoutes;