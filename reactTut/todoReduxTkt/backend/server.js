const express = require('express');
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');
const { protectedMW } = require('./utils/protectedMW');
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173',
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.send('API is running...');
});



app.use('/api/users', userRoutes);

app.use('/api/todos', todoRoutes);
app.listen(PORT, (req, res) => (
    console.log(`Server running on http://localhost:${PORT}`.brightCyan) 
    
))
