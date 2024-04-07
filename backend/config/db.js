import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URI;
// const uri = "mongodb+srv://jeomarkoo1:mongodb@cluster0.6yurqut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function execute(callback) {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    return await callback(client);
  } catch (error) {
    console.log(error);git 
  } finally {
    await client.close();
  }
}
