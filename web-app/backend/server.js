const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const database = require('./databases/mongodb');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Settings
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Database connection
database.connect()
    .then((dburi) => {
        console.log(`Connected to database at ${dburi}`);
    }).catch((err) => {
        console.log(`Error connecting to the database: ${err}`);
    });

//Admin routes only for easy enrolling of the admin and registering users
app.use('/api/admin/', require('./routes/admin.routes'));

//Authentication route
app.use('/api/user/', require('./routes/user.routes'));

//Middleware for auth checking
app.use(require('./middlewares/authenticated.middleware'));

//Middleware for getting the contract
app.use(require('./middlewares/contract.middleware'));

//Patient and record routes
app.use('/api/patients/', require('./routes/patients.routes'));
app.use('/api/records/', require('./routes/records.routes'));

//Middleware for error handling
app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(error.status || 500).json({
        message: error.message
    });
});

app.listen(port, () =>  {
    console.log(`Server is running on port ${port}`);
});