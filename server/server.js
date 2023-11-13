const express = require('express');
const app = express();
const PORT = 5000;
const path = require('path');
var cors = require('cors')

app.use(cors())

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tracker', require('./routes/tracker'));
app.use('/api/users-mysql', require('./routes/users-mysql'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})