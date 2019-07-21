
const express = require('express');
const request = require('request');
const pug = require('pug');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Create template with form fields to test if it works 


app.get('/', (req, res) => {
  res.render('index')

})

app.post('/', (req, res) => {
  const options = {
    method: 'POST',
    uri: 'http://localhost:5000/api/v1/wtd',
    body: {
        //activity: "eat",
        cuisine:  req.body.term,
        location: req.body.location,
        error: null

      },
      json: true 

  }
  request(options, function(err, result, body) { 
    if (body.success ==  'true'){
      var name = body.searchResults.place; 
      res.render('index', {locationName: name} )
      }
    }
  
);
  
})





const PORT = 4000;

app.listen(PORT, () => {
console.log('server running on port ${PORT}')
});