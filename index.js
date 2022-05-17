const express = require('express')
const app = express()
const cors=require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId=require('mongodb').ObjectId


const port = process.env.PORT || 5000;

//use middlewares
app.use(cors())
//body parser ar kaj korbey(this is short cut)//re.body ar moddhey data pawar jnno
app.use(express.json())

//mongoDB //password:0123
const uri = "mongodb+srv://amin:0123@cluster0.yz2oh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//backend a get diye jeigula likhbo sheigulai pabo but post diye jegula likhbo sheigula backend url a hit korley pabo na(thats why we use postman for api testing)
async function run() {
  try {
    await client.connect();

    //database name:fool_express and collection name:users
    const userCollection = client.db("food_express").collection("users");

    //GET user from DB and showed into localhost:5000/user URL/api a
    app.get('/user',async(req,res)=>{
      
    // query for movies that have a runtime less than 15 minutes
    const query = {};
    //query ar opor base korey DB thekey data niye ashtesey
    const cursor = userCollection.find(query);
    //data niye ashar por sei data Array tey convert korey nitey hobey
    const users=await cursor.toArray()

    res.send(users)
    })

    //find user using GET operation
    app.get('/user/:id',async(req,res)=>{
      const id=req.params.id //for getting dynamic url id part
      const query = {_id:ObjectId(id)};
      const user = await userCollection.findOne(query);
      res.send(user) //response ta jassey client side a
    })

    //POST USER: add a new user to DB
    app.post('/user',async(req,res)=>{
      const newUser=req.body
      console.log('adding new user',newUser)
      const result=await userCollection.insertOne(newUser)    //insertOne means sama data ekbar e insert hobey collection a
      res.send(result) //client side ajeno error na khay and everydata database a insert ar sathey ekta unique ID o add hoy tar sathey sheita pawar jnno
    })
    // create a document to insert into database
    // const user = { 
    //  name:'shik',
    //  id:05,
    //  email:'shaik@gmail.com'
    // }

    // const result = await userCollection.insertOne(user);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);



    //update user
    app.put('/user/:id',async(req,res)=>{
      const id=req.params.id
      const updateUser=req.body

    // create a filter for a movie to update
    const filter = {_id:ObjectId(id)};
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    
    //particular id wise user ar jei jei field/property update kortey chai 
    const updateDoc = {
      $set: {
        userName:updateUser.userName,
        userEmail:updateUser.userEmail,
      }, 
    };

    const result = await userCollection.updateOne(filter, updateDoc,options);
    res.send(result)

    })
    //delete a user
    app.delete('/user/:id',async(req,res)=>{
      const id=req.params.id;
      //query diye bujha jabey kojn user k delete kortese
      const query={_id:ObjectId(id)}
      const result = await userCollection.deleteOne(query);
      res.send(result)
    })
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