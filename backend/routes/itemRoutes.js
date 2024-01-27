import { Router } from "express";
import multer from "multer";

import {
  createItem,
  fetchItem,
  fetchItems,
  updateItem,
  deleteItem,
  searchItem,
  searchItemByCategory,
} from "../Controller/itemController.js";


const itemRoutes = Router();
itemRoutes.get("/", fetchItems);  //?categoryName=Electronics&brandName=Dell
itemRoutes.get("/:id", fetchItem);
itemRoutes.put("/:id", updateItem);
itemRoutes.delete("/:id", deleteItem);
itemRoutes.get("/search",searchItem);  //?name=
itemRoutes.get("/category/search",searchItemByCategory); //?name=



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/item/')
  },
  filename: function (req, file, cb) {
      cb(null,  file.originalname) 
  }
})
// Attach multer middleware to handle file uploads
var upload = multer({ storage: storage });


itemRoutes.post("/", upload.single('image'), createItem);



export default itemRoutes;
