
const express = require('express');
const request = require('request');
const pug = require('pug');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

// Create template with form fields to test if it works 


app.get('/', (req, res) => {
  res.render('index')

})

app.get('/index.js', function (req, res) {
  res.sendFile(__dirname + "/index.js");
});

app.post('/add', (req,res) => {
  const options = {
    method: 'POST',
    uri: 'http://localhost:5000/api/v1/add',
    body: {
        //activity: "eat",
        activity:  req.body.activityName,
        error: null

      },
      json: true 

  }
  request(options, function(err, result, body) { 
    if (body.success ==  'true'){
      res.render('index', {addActivity: body.message} )
      }
    }
  
);
})

app.post('/activity', (req, res) =>{

  request('http://localhost:5000/api/v1/activity', function(err , result, body){
    var jsonBody = JSON.parse(body)
   // console.log(body.activity)
    if (jsonBody.success == 'true'){
      res.render('index', {activityName: jsonBody.activity})
      console.log("success")
    }
  })
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


