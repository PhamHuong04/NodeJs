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


app.get('/user-query', async (req, res) => {
    const page = 1
    const limit = 5;
    const skip = (page - 1) * limit;
    const users = await UserModel.find(req.query).skip(skip).limit(limit);

    res.json({
        users
    })
})

app.get("/user-age-and-address", async (req, res) => {
    const page = 1;
    const perPage = 5;
    const skip = (page -1)* perPage;
    const users = await UserModel
        .find(
            {
                age: {
                    $gt: 20,
                },

            },
            {
                address: {
                    $search: ['Ha Dong'],
                },
            },
        )
        .select('name age address')
        .limit(perPage)
        .skip(skip);
    
        res.json({
            data: {
                results: users.length,
                users,
            }
        })
})


app.get('/all-user-and-role-permission', async(req, res)=>{
    const page = 1;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    const users = UserModel.aggregate([
        {
            $lookup:
            {
                from: "permission",
                localField: "role",
                foreignField: "_id",
                as: "role-permisson"
            }
        }
    ])
    res.json({
        data: {
            users,
        }
    })

})




const port = app.get('port') || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
})
