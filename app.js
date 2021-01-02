require("dotenv").config();
const express = require("express");
const sql = require("mysql2/promise");
const cors = require("cors");
const PORT = 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const pool = sql.createPool({
  host: process.env.host,
  user: process.env.sqluser,
  password: process.env.password,
});

app.post("/list-item", async (req, resp) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    const quantity = req.body.quantity;

    const response = await conn.execute(
      "INSERT INTO eGrocery.items (name, description, price, image, qunatity) VALUES (?,?,?,?,?)",
      [name, description, price, image, quantity]
    );
    resp.status(200).send({ message: "item successfully listed" });
  } catch (error) {
    resp.status(500).send(error);
    console.log(error);
  }
});

app.post("/get-items", async (req, resp) => {
  try {
    const conn = await pool.getConnection();
    const response = await conn.execute("SELECT * FROM eGrocery.items");
    conn.release();
    resp.status(200).send(response[0]);
  } catch (error) {
    resp.status(500).send(error);
    console.log(error);
  }
});

app.listen(PORT, () => console.log("app is listening on", PORT));
