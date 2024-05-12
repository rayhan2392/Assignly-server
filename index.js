const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000

//middle wares
app.use(cors());
app.use(express());

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
    const assignmentDataCollection =client.db('assignlyDB').collection.apply('assignmentDB')
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
//post assignment data created by user 
app.post('/assignments', async(req,res)=>{
   const newAssignment =req.body;
   console.log(newAssignment)
   
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