const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
}).catch(err => {
    console.log(process.env.MONGOLAB_PURPLE_URI);
        console.log ('ERROR connecting to: ' + err);
});