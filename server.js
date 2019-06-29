'use-strict'

import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import yelp from 'yelp-fusion';



const app = express();
const apiKey = "";
const client  = yelpg.client(apiKey);
//Parse incoming requests using middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


// GET 
app.get('/api/v1/wtd', (req, res) => {
    res.status(200).send({
        success: 'true',
        messsage: 'Activity Loaded Successfully',
        data: db
    })
});



//POST
/*


 */

app.post('/api/v1/wtd', (req, res) => {
    var searchParameters = {};
    var searchResults = {};

    console.log(req.body)
    if (!req.body.activity) {
        return res.status(400).send({
            success: 'false',
            message: 'activity is required'
        });
    } else if (!req.body.location) {
        return res.status(400).send({
            success: 'false',
            message: 'location is required'
        });
    }else if (!req.body.cuisine){
        return res.status(400).send({
            success: 'false',
            message: 'cuisine is missing'
        })
    }




//Query processing
    //USES YELP API TO PROCESS QUERY 
    searchParameters["activity"] = req.body.activity;
    searchParameters["location"] = req.body.location;
    searchParameters["term"] = req.body.cuisine;
    searchParameters['limit'] = 10;

    client.search(searchParameters).then(response => {
        const result = response.jsonBody.businesses[randomizeBusiness(searchParameters["limit"])];
        
        searchResults["place"] = result["name"]
        searchResults["rating"] = result["rating"]

        console.log(searchResults);



    return res.status(201).send({
        success: 'true',
        message: 'Location added successfully',
        searchResults  
        })
    }).catch(e => {
        console.log("error");
          res.render('index', { locationTerm: null, error: "Error, please re-enter your information"});
      
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