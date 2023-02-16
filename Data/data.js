const { MongoClient } = require("mongodb");
const fs = require("fs")
const privateKey = fs.readFileSync("../.secret").toString()

console.log(privateKey)
const uri =
  `mongodb+srv://hcwilkinson:${privateKey}@cluster0.lwmy5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);


async function run() {
  try {

	console.log('hitting here');
    await client.connect();

	await listdatabases(client)

    await client.close();
  }
  catch(error){
	console.log(error)
  }
}
run().catch(console.dir);

async function listdatabases(client){
	const list = await client.db().admin().listDatabases();
	console.log(list)
}