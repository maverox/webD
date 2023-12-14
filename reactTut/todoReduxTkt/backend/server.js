const express = require('express');
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const {protectedMW} = require('./utils/protectedMW');
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());


app.use('/api/users', userRoutes);

app.use('/api/todos', todoRoutes);
app.listen(PORT, () => (
    console.log(`Server running on https://localhost:${PORT}`.brightCyan) 
))
