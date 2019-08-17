const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Settings
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/patients/', require('./routes/patients.routes'));
app.use('/api/enroll/', require('./routes/enroll.routes'));
app.use('/api/records/', require('./routes/records.routes'));

app.listen(port, () =>  {
    console.log(`Server is running on port ${port}`);
});