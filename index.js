const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require("morgan")
const { Bill } = require('./models');
var cron = require('node-cron');
require('dotenv').config();

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

// setup
app.set('views', path.join(__dirname, 'views'));

// connect db
const db = require("./models");

// Routers

app.get("/" , (req, res, next) => {
  res.send("Hello World!");
})
const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);

const productRouter = require("./routes/Products");
app.use("/products", productRouter);

const detailProductRouter = require("./routes/DetailProduct");
app.use("/detail", detailProductRouter);

const cartRouter = require("./routes/Cart");
app.use("/cart", cartRouter);

const couponRouter = require("./routes/Coupon");
app.use("/admin/coupon", couponRouter);

const cmtRouter = require("./routes/Comments");
app.use("/comments", cmtRouter);

const flashSaleRouter = require("./routes/FlashSale");
app.use("/flashsale", flashSaleRouter);

const billRouter = require("./routes/Bill");
app.use("/bill", billRouter);

const inbox = require("./routes/Inbox");
app.use("/inbox", inbox);

const insert = require("./routes/insertData");
app.use("/insert", insert);


cron.schedule('0 0 */3 * *', async () => {
  await Bill.destroy({
    where: {
      status: 'đang xử lý'
    }
  });
});

db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("Server running on port " + 8080);
  });
}).catch(err => {
  
});