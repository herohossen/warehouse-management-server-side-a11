const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 8888;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@inventory-management-p1.mpnfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
console.log(uri);
async function run() {
  try {
    await client.connect();
    //database name and colletion
    const itemCollection = client
      .db("inventory-management-p11")
      .collection("products");

    //get item
    app.get("/item", async (req, res) => {
      const query = {};
      const cursor = itemCollection.find(query);
      const items = await cursor.toArray();
      res.send(items);
    });
    // Post item Data
    app.post("/item", async (req, res) => {
      const newUser = req.body;
      console.log("adding new user", newUser);
      const result = await itemCollection.insertOne(newUser);
      res.send(result);
    });



//run funtion
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
