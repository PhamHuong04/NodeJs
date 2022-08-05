const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const users = require('./routes/user');
const ad = require('./routes/role');
const UserModel = require('./models/User')

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
app.use('/ad', ad);


app.get('/', (rep, res, next) => {
    return res.status(200).json({
        message: 'Server is OK!'
    });
});

app.get("/getUserAgeAndAdress", async (req, res) => {

    const users = await UserModel
        .find(
            {
                age: {
                    $gt: 20,
                },

            },
            {
                address: {
                    $in: ['Ha Dong'],
                },
            },
        )
        .select('name age address')

    res.status(200).json({
        data: {
            results: users.length,
            users,
        }
    });

});

app.get("/getAllUser", async (req, res) => {
    const users = await UserModel.find({});
    res.status(200).json({
        users,
    });
    
});

const port = app.get('port') || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
})

