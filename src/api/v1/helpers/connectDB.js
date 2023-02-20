const mongoose = require('mongoose');
const config = require('../../../config/index');

const option = {
    keepAlive: true,
    socketTimeoutMS: 172800000,
    connectTimeoutMS: 172800000
};

mongoose.connect(config.database_url, {}).then(
    () => console.log("Connect mongodb success"),
    err => console.log("Connect mongodb fail: ", err)
);

// mongoose.connection.on('open', function () {
//     console.log('Connected to mongodb database');
// });

mongoose.connection.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});

mongoose.connection.on('timeout', function (e) {
    console.log('DEV-Connection timeout :' + e);
    mongoose.connect(config.database_url, { server: { auto_reconnect: true } });
  
    throw new Error(`DEV-Connection timeout : ${e}`);
  });
  

module.exports = mongoose;