require('dotenv').config()

const express = require("express")
const fileUpload = require('express-fileupload');
const cors = require('cors')
const crypto = require("crypto");
const dbAccess = require("./dbFiles/db_access.js")

//endpoints
const imageEndpoints = require("./endpoints/imageEndpoints.js")
const projectEndpoints = require("./endpoints/projectEndpoints.js")


const PORT = process.env.PORT
const corsOptions = {
    origin: process.env.ALLOWEDORIGIN || 'http://localhost:5173', // Allow your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow the HTTP methods you need
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express()
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests
app.options('*', cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());
app.use('/image',imageEndpoints)
app.use('/project',projectEndpoints)

// Use the CORS middleware



app.get("/login", async (req, res) => {
    if (await dbAccess.checkLogin(req.query.username, req.query.password)){
        const id = crypto.randomBytes(16).toString("hex");
        await dbAccess.updateLoginKey(id, req.query.username, req.query.password)
        res.status(200).send({key: id})
    }
    else{
        res.status(401).send()
    }
})


app.get("/checkLoginKey", async (req, res) => {
    if (await dbAccess.checkLoginKey(req.query.key)){
        res.status(200).send()
    }
    else{
        res.status(401).send()
    }
})

app.listen(PORT, () => {
    console.log("Running on port: " + PORT)
})

