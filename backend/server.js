import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
app.get("/", (req, res) => {
  return res.send("Hi Welcome to New Edge Inventory");
});

// Middleware for handling JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route
app.use(routes);


