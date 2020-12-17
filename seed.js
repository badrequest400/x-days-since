const redis = require("redis");

const client = redis.createClient('CHANGE ME')

const now = Date.now();

client.on("error", function(error) {
  console.error(error);
});

client.set('prettier', now, redis.print)
client.set('ts', now, redis.print)
client.set('webstorm', now, redis.print)
client.set('vscode', now, redis.print)
client.set('firefox', now, redis.print)

client.get('prettier', redis.print)
client.get('ts', redis.print)
client.get('webstorm', redis.print)
client.get('vscode', redis.print)
client.get('firefox', redis.print)
