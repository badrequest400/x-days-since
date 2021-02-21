const redis = require("redis");

const client = redis.createClient('CHANGE ME')

const now = Date.now();

client.on("error", function(error) {
  console.error('error >>>', error);
});
client.on("connect", function(error) {
  console.error('connect >>>>', error);
});
client.on("reconnecting", function(error) {
  console.error('reconnecting >>>>', error);
});
client.on("ready", function(error) {
  console.error('ready >>>', error);
});

client.set('prettier', now, redis.print)
client.set('ts', now, redis.print)
client.set('webstorm', now, redis.print)
client.set('vscode', now, redis.print)
client.set('oni', now, redis.print)
client.set('firefox', now, redis.print)

client.get('prettier', redis.print)
client.get('ts', redis.print)
client.get('webstorm', redis.print)
client.get('vscode', redis.print)
client.get('oni', redis.print)
client.get('firefox', redis.print)
