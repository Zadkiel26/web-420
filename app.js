/* 
    Title: app.js
    Date: 01/12/2024
    Author: Zadkiel Rodriguez Alvarado
    Description: Setup server
    Sources:
        https://github.com/Zadkiel26/pets-r-us
*/
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const composersAPI = require('./routes/RodriguezAlvarado-composer-routes')

// Create a new express app
const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// Configure express to use JSON
app.use(express.json());

// Configure express to use URL-encoded data with extended mode
app.use(express.urlencoded({ 'extended': true }));

// Connect to MongoDB
const CONN = 'mongodb+srv://web420_user:Zakio1226@web420db.r59bwva.mongodb.net/web420DB'
mongoose.connect(CONN, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log("MongoDB Error: " + err.message);
});

// Define an object literal named options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'] // files containing annotations for the OpenAPI specs
};

// Create the Swagger/OpenAPI specification
const openapiSpecification = swaggerJSDoc(options);

// Serve the Swagger/OpenAPI specification at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', composersAPI);

// Create a new server on PORT 3000
http.createServer(app).listen(PORT, () => {
    console.log(`Application started and listening on port ${PORT}.`);
});