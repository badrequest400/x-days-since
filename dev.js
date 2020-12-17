
const redis = require("redis");
const { promisify } = require('util');

const client = redis.createClient('redis://:p899926cdaa8cc091a4be27be1283f8720dd77cd64e95df830828b91ff22e82cc@ec2-54-195-194-169.eu-west-1.compute.amazonaws.com:31309')
const getAsync = promisify(client.get).bind(client);

const now = Date.now();

client.on("error", function(error) {
  console.error(error);
});

(async function() {
  console.log(await getAsync('prettier'));
  console.log(await getAsync('ts'));
  console.log(await getAsync('webstorm'));
})()
