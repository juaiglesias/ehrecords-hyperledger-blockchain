const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Settings
app.use(cors());
app.use(express.json());

//Enrolling route
app.use('/api/enroll/', require('./routes/enroll.routes'));

//Middleware for Enroll checking
app.use(require('./middlewares/enrolled.middleware'));

//Middleware for Configuration
app.use(require('./middlewares/config.middleware'));

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