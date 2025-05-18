// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wxzxcx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     await client.connect();

//     const coffeesCollection = client.db("coffeeDB").collection("coffees");

//     app.get("/coffees", async (req, res) => {
//       const result = await coffeesCollection.find().toArray();
//       res.send(result);
//     });

//     app.get("/coffees/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await coffeesCollection.findOne(query);
//       res.send(result);
//     });

//     app.post("/coffees", async (req, res) => {
//       const newCoffee = req.body;
//       console.log(newCoffee);
//       const result = await coffeesCollection.insertOne(newCoffee);
//       res.send(result);
//     });

//     app.put("/coffees/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const options = { upsert: true };
//       const updatedCoffee = req.body;
//       const updatedDoc = {
//         $set: updatedCoffee,
//       };
//       const result = await coffeesCollection.updateOne(
//         query,
//         updatedDoc,
//         options
//       );
//       res.send(result);
//     });

//     app.delete("/coffees/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await coffeesCollection.deleteOne(query);
//       res.send(result);
//     });
//   } finally {

//   }
// }
// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("Coffee server is getting hotter");
// });

// app.listen(port, () => {
//   console.log("this is my cofffe server", port);
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wxzxcx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const coffeesCollection = client.db("coffeeDB").collection("coffees");

    app.get("/coffees", async (req, res) => {
      const result = await coffeesCollection.find().toArray();
      res.send(result);
    });

    app.get("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeesCollection.findOne(query);
      res.send(result);
    });

    app.post("/coffees", async (req, res) => {
      const newCoffee = req.body;
      console.log(newCoffee);
      const result = await coffeesCollection.insertOne(newCoffee);
      res.send(result);
    });

    app.put("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedCoffee = req.body;
      const updatedDoc = {
        $set: updatedCoffee,
      };
      const result = await coffeesCollection.updateOne(
        query,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.delete("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeesCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // Vercel will manage connection lifecycle
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Coffee server is getting hotter");
});

module.exports = app;
