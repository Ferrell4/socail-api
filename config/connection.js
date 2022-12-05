const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialMediaDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;