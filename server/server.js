const express = require('express');
const app = express();
const PORT = 5000;
const DatabaseConnection = require('./config/db');

DatabaseConnection();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})