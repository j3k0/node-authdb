var redis = require("redis");

// The AuthDB client.
//
// Requires a link to a Redis database.
//
var Client = function(options) {
    this.host = options.host || "127.0.0.1";
    this.port = options.port || 6379;

    this.redisClient = redis.createClient(this.port, this.host);

    return this;
};

// Retrieve an user account from authentication token
//
// cb(err, account) will be called.
//
// account will be null if no account is found, i.e.
// user has to login again.
//
Client.prototype.getAccount = function(token, cb) {
    this.redisClient.get(token, function(err, reply) {
        if (err) {
            return cb(err, null);
        }
        if (reply) {
            try {
                reply = JSON.parse(reply);
            }
            catch (e) {
                return cb(e, null);
            }
            cb(null, reply);
        }
        else {
            cb("account not found", null);
        }
    });
};

// Adds an account into the authentication database
//
// cb(err, reply) will be called with result.
Client.prototype.addAccount = function(token, account, cb) {
    this.redisClient.set(token, JSON.stringify(account), cb);
};

// Module object
var authdb = {
    createClient: function(options) {
        return new Client(options);
    }
};

// Export the module object.
module.exports = authdb;
