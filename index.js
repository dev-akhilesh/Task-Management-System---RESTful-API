require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { swaggerSpecs, swaggerUi } = require('./configSwagger');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to Task Management System API' });
});

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    await connectDB();
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${process.env.PORT || 3000}`)
});

module.exports = app;
