const express = require('express');
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const {protectedMW} = require('./utils/protectedMW');
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(PORT, () => (
    console.log(`Server running on https://localhost:${PORT}`.brightCyan)
))
