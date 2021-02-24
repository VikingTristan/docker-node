const { MongoClient } = require("mongodb");

const {
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_HOSTNAME,
	MONGO_PORT,
	MONGO_DB
} = process.env;

// const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/test?retryWrites=true&w=majority"
const url = `mongodb://${MONGO_USERNAME && MONGO_PASSWORD ? MONGO_USERNAME + ":" + MONGO_PASSWORD +"@" : ""}${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

async function listDatabases(client){
	const databasesList = await client.db().admin().listDatabases();
	console.log("Databases:");
	databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function connect(){
	// await new Promise(resolve => setTimeout(resolve, 5000));
	console.log("Attepmting to connect to url", url);

	const client = new MongoClient(url, {
		reconnectTries: 20,
		reconnectInterval: 1000,
		connectTimeoutMS: 10000
	});

	try {
		// Connect to the MongoDB cluster
		await client.connect();
		console.log("Database connected!");

		// Make the appropriate DB calls
		await  listDatabases(client);

	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

module.exports = {
	connect
};