const express = require('express');
const router = express.Router();

app.use('/patients/', require('./routes/patients.routes'));
app.use('/enroll/', require('./routes/enroll.routes'));
app.use('/records/', require('./records.routes'));

module.exports = router;