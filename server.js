import express from 'express'
import db from './db/db';
import bodyParser from 'body-parser'

const app = express();

//Parse incoming requests using middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/v1/todos', (req, res) => 
    {
        res.status(200).send({
            success: 'true',
            messsage: 'todos retreived successfully',
            todos: db
        })
    });


app.get('/api/v1/todos/:id', (req,res) => {
    const id = parseInt(req.params.id, 10);

    db.map((todo) => {
        if (todo.id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'todo retrieved successfully',
                todo,
            })
        }
    });
    return res.status(404).send({

        success: 'false',

        message: 'todo does not exist',
    })
})


//POST
app.post('/api/v1/todos', (req, res) => {
    console.log(req.body)
    if (!req.body.title){
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            success: 'false', 
            message: 'description is required'
        });
    }

    const todo = {
        id: db.length + 1, 
        title: req.body.title,
        description: req.body.description
    }

    db.push(todo);
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        todo
    })

});


const PORT = 5000;

app.listen(PORT, () => {
    console.log('server running on port ${PORT}')
});
    



