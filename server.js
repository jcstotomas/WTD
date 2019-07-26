'use-strict'

import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import yelp from 'yelp-fusion';



const app = express();
const apiKey = "x4boCEjaccL6otSoUD7vMepPyljMPDyQLY25d-tGqO4niXHY02orCyyHhErrFdJ6daaMXZJJ0PqTCnDlu373YWsXbzWJGTgnp8gqZkS-CJcqpsbQiXV-ZEegvu01W3Yx";
const client  = yelp.client(apiKey);
//Parse incoming requests using middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


// // POST 
//
app.post('/api/v1/wtd', (req, res) => {
    var searchParameters = {};
    var searchResults = {};

    console.log(req.body)

    if (!req.body.cuisine){
        return res.status(400).send({
            success: 'false',
            message: 'cuisine is missing'
        })
    } else if (!req.body.location){
        return res.status(400).send({
            success: 'false',
            message: 'location is missing'
        })
    }



//Query processing
    //USES YELP API TO PROCESS QUERY 
    //searchParameters["activity"] = req.body.activity;
    searchParameters["location"] = req.body.location;
    searchParameters["term"] = req.body.cuisine;
    searchParameters['limit'] = 10;

    client.search(searchParameters).then(response => {
        const result = response.jsonBody.businesses[randomizeBusiness(searchParameters["limit"])];
        
        searchResults["place"] = result["name"]
        searchResults["rating"] = result["rating"]

        //console.log(searchResults);



    return res.status(201).send({
        success: 'true',
        message: 'Restaurant Retrieved',
        searchResults  
        })
    }).catch(e => {
        console.log("error");
      
      });



});


const PORT = 5000;

app.listen(PORT, () => {
console.log('server running on port ${PORT}')
});




//Helper Functions 

function randomizeBusiness (max, min = 0) 
{

	var random =Math.floor(Math.random() * (+max - +min)) + +min;
	return random;
}




