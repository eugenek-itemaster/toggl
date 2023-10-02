const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tracker', require('./routes/tracker'));
app.use('/api/users-mysql', require('./routes/users-mysql'));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})