import {Router} from 'express'
import {createCategory,fetchCategories,fetchCategory,updateCategory,deleteCategory, searchCategory} from '../Controller/categoryController.js'
import multer from "multer";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/category/')
    },
    filename: function (req, file, cb) {
        cb(null,  file.originalname) 
    }
  })
  // Attach multer middleware to handle file uploads
  var upload = multer({ storage: storage });



const categoryRoutes = Router();
//CATEGORY
categoryRoutes.get("/search",searchCategory); //?name=----

categoryRoutes.post("/",upload.single('image'),createCategory);
categoryRoutes.get("/",fetchCategories);
categoryRoutes.get("/:id",fetchCategory);
categoryRoutes.put("/:id",updateCategory);
categoryRoutes.delete("/:id",deleteCategory);

export default categoryRoutes;