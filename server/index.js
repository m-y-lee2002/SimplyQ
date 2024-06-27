const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
console.log("MongoDB URI from .env:", process.env.MONGO_URI); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User = require('./schema/user.js');
const Queue = require('./schema/queue.js');
const Staff = require('./schema/staff.js');

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error("MongoDB URI is not defined.");
    process.exit(1);
}

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

connect();

app.listen(8000, () => {
    console.log("Server connected on port 8000");
});
