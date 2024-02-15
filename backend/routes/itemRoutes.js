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
itemRoutes.put("/:id", upload.single('image'),updateItem);

itemRoutes.get("/search",searchItem);  //?name=
itemRoutes.get("/category/search",searchItemByCategory); //?name=

itemRoutes.get("/", fetchItems);  //?categoryName=Electronics&brandName=Dell
itemRoutes.get("/:id", fetchItem);


itemRoutes.delete("/:id", deleteItem);









export default itemRoutes;
