AuthDB
------

## Quick start

### Install

    npm install authdb

### Example


```js
var authdb = require("authdb");

var client = authdb.createClient({
    host: "127.0.0.1",
    port: 6379
});

client.getAccount(token, function(err, account) {
    if (err)
        console.dir(err);
    else
        console.dir(account);
});

client.addAccount(token, account, function(err, result) {
    if (err)
        console.dir(err);
    else
        console.dir(result);
});
```
