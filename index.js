const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const users = require('./routes/user')

mongoose.connect('mongodb://localhost/demoNode', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('sucessfully'))
    .catch(() => console.log('failed'));

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/users', users);


app.get('/', (rep, res, next) => {
    return res.status(200).json({
        message: 'Server is OK!'
    });
});

app.use((rep, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
})

app.use(() => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    return res.status(status).json({
        error: {
            message: error.message
        }
    });
});

const port = app.get('port') || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
})

