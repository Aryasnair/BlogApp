const express = require('express');
const app = express();
app.use(express.json());


const cors = require('cors');
app.use(cors());

require('dotenv').config();
require('./api/db/connection')


const blogRoutes = require('./routes/blogRoutes');
const userRoutes=require('./routes/userRoutes');


// Routes
app.use('/blog', blogRoutes);
app.use('/user',userRoutes);






// Start Server
app.listen(process.env.port, () => {
    console.log(`Server running on http://localhost:${process.env.port}`);
});
