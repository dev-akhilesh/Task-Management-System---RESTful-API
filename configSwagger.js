const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management System API",
            version: "1.0.0",
            description: "API documentation for the Task Management System, including task management and user authentication endpoints",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local Development Server",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./routes/*.js"], // Path to the API route files
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerSpecs,
};
