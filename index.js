const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000

//middle wares
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('assignly server is running')
});


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s6hdjpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const assignmentDataCollection =client.db('assignlyDB').collection('assignmentDB')
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
//post assignment data created by user 
app.post('/assignments', async(req,res)=>{
   const newAssignment =req.body;
   console.log(newAssignment)
  const result = await assignmentDataCollection.insertOne(newAssignment);
  res.send(result)
   
})

//get all assignment data
app.get('/assignments',async(req,res)=>{
  const cursor = assignmentDataCollection.find();
  const result =await cursor.toArray();
  res.send(result);
})

//delete assignment data
app.delete('/assignments/:id',async(req,res)=>{
  const id =req.params.id;
  const query ={_id:new ObjectId(id)}
  const result = await assignmentDataCollection.deleteOne(query)
  res.send(result);
})

//get single travel data
app.get('/assignments/:id',async(req,res)=>{
  const id = req.params.id;
  const query ={_id:new ObjectId(id)}
  const result =await assignmentDataCollection.findOne(query);
  res.send(result);
})

//update an assignment data
app.put('/assignments/:id',async(req,res)=>{
  const id = req.params.id;
  const filter = {_id:new ObjectId(id)}
  const currentAssignment = req.body;
  const options = {upsert:true}
  const updatedAssignment ={
    $set:{
      title:currentAssignment.title,
      img:currentAssignment.img,
      marks:currentAssignment.marks,
      description:currentAssignment.description
    }
  } 
  const result = await assignmentDataCollection.updateOne(filter,updatedAssignment,options);
  res.send(result);
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.listen(port,()=>{
    console.log(`assignly server is running on port ${port}`)
})