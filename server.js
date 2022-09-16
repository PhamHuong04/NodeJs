const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./src/routes/user');
const roleRouter = require('./src/routes/role');
const permissionRouter = require('./src/routes/permission');
const UserModel = require('./src/models/User');

const app = express();

mongoose.connect('mongodb://localhost/demoNode', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('sucessfully'))
    .catch(() => console.log('failed'));

app.use(morgan('dev'))

app.use(bodyParser.json())

app.use('/users', userRouter);
app.use('/role', roleRouter);
app.use('/permission', permissionRouter);




const port = app.get('port') || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
})
