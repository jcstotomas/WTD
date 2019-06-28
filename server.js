import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';

const app = express();

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


app.get('/api/v1/wtd/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    db.map((locationData) => {
        if (locationData.id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'Data retrieved successfully',
                todo,
            })
        }
    });
    return res.status(404).send({

        success: 'false',
        message: 'data does not exist',
    })
})


//POST
/*


 */

app.post('/api/v1/wtd', (req, res) => {
    // DATA STRUCTURE
    /*
    {
        "activity" : "eat"/"activity"
        "mood" : "1-10"
        "cuisine(s)" : "thai"
        "location" : "Irvine"
        
    }

    */
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
    }

    const inputInfo = {
        id: db.length + 1,
        activity: req.body.activity,
        location: req.body.location
    }

//Query processing
    
    db.push(inputInfo);
    return res.status(201).send({
        success: 'true',
        message: 'Location added successfully',
        inputInfo
    })

});


const PORT = 5000;

app.listen(PORT, () => {
console.log('server running on port ${PORT}')
});