const express = require('express')
const app = express()
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');


const port = process.env.PORT || 5000;

//use middlewares
app.use(cors())
//body parser ar kaj korbey(this is short cut)
app.use(express.json())

//mongoDB //password:0123
const uri = "mongodb+srv://amin:0123@cluster0.yz2oh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();

    const userCollection = client.db("food_express").collection("users");

    // create a document to insert into database
    const user = { 
     name:'shik',
     id:05,
     email:'shaik@gmail.com'
    }

    const result = await userCollection.insertOne(user);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // await client.close(); //dorkar nai connection active rakhtey chai
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('running my node crud server')  //root url('http://localhost:5000/') hit korley res hisabey kicho dibey 
  })
  

app.listen(port, () => {
    console.log(`running my node crud server listening on port ${port}`)
  })