import Express from "express";
import configViewEngine from "./configs/viewsEngine";
import initWebRouter from "./router/web";
// import connection from "./configs/connectDB";
import initAPIRouter from "./router/api";

require("dotenv").config();
const app = Express();
const port = process.env.Port;

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

configViewEngine(app);
//
initWebRouter(app);
//
initAPIRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
