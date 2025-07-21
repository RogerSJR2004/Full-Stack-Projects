const express = require("express");
const http = require("http");
const cors = require('cors');
const helmet = require("helmet");
require('dotenv').config();
const PORT = process.env.PORT || 8085;  
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(helmet({crossOriginResourcePolicy: false}));
app.disable('etag');
app.use(cors());
const eventDB = require ('./config/db')
const eventData = require('./middlewares/eventData');
const eventEnrolledData = require('./middlewares/eventEnroll');
const userProfileData = require('./middlewares/profileData');
const adminProfileData = require('./middlewares/adminData');
const router = require('./routes/index'); 

app.use("/ems/v1",router);

const server = http.createServer(app);
server.listen(PORT, () => {
    
})

// testing api for the server

app.get('/ems/1', (req, res) => {
    console.log(`Service is Working...on ${PORT}`)
    return res.send(`Welcome to demo backend ${PORT}`);
})

app.listen(PORT, async() => { 
    console.log(`Server listening on ${PORT}`); 
    try { 
    await eventDB.authenticate(); 
    console.log('Connection has been established successfully.'); 
    } catch (error) { 
    console.error('Unable to connect to the database:', error); 
    } 
    } 
    );
// app.get('/ems/event/list', (req, res) => {
//     return res.json(eventData);
// })

// app.get('/ems/event/list2', (req, res) => {
//     return res.json(eventEnrolledData);
// })

// app.get('/ems/user/list3', (req, res) => {
//     return res.json(userProfileData);
// })

// app.get('/ems/admin/list4', (req, res) => {
//     return res.json(adminProfileData);
// })

// initialized the server 

