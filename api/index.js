const express = require('express');
const router = express.Router();
const app = express();

//transform body content 
router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request);
    Object.setPrototypeOf(res, app.response);
    req.res = res;
    res.req = req;
    next();
}); 


// we want to write our analytics data to our own database 
router.post('/track-data', (req, res) => {
    console.log("Stored data", req.body.data);
    res.status(200).json({message: 'SUCCESS!'});    
});

module.exports = {
    path: '/api',
    handler: router
}

