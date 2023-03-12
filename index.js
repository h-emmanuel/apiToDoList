const express = require('express');
const app = express();

//Import des taches
const task = require('./models/task.js')
//Permet de gerer les Requetes POST avec express
const bodyParser = require('body-parser');

//Recupère mongoose
const mongoose = require('mongoose');
const cors =require('cors');

// const apiRouter = require('./routes/api');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/To_Do_List_API",{
    useNewUrlParser: true
}).then(() => {
    console.log("Connexion à la base de données réussi");
}).catch( err => {
    console.log('Connexion à la bdd non effectué. Error...', err);
    process.exit();
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



app.use(cors());

//Recuperation des routes
// require('./routes/api.js')(app);
app.listen(5000, () => {
    console.log("Server is listening on port 5000")
})


app.get("/api/tasks", async (req, res) => {
    const allTasks = await task.find();
    res.status(200).json(allTasks);
});

app.get("/api/task/:taskId", async (req, res) => {
    console.log("find task")
    console.log("req")
    console.log(req.params.taskId)
    const taskDetail = await task.findById(req.params.taskId);
    console.log("taskDetail");
    console.log(taskDetail);
    res.status(200).json(taskDetail);
    // res.send(taskDetail);
});

//
app.post("/create", async (req, res) => {
    console.log(req.body);
    const newTask = new task({
        title: req.body.titleTask,
        description: req.body.descriptionTask
    });
    console.log("newTask");
    console.log(newTask);
    newTask.save((err, docs) => {
        if(!err){
            res.status(201).send(docs)
        }else{
            res.status(500).send(err)
        }
    });
});

app.post("/delete/:taskId", async (req, res) => {
    console.log("delete");
    let taskid = Number(req.params.taskId)
    await task.deleteOne({ _id: req.params.taskId });
    res.status(200).json('Product deleted')
});

app.post("/update", function(req, res){
    console.log("req");
    // console.log(req);
    console.log(req.body);
    task.findByIdAndUpdate(req.body.idtask, {title: req.body.title, description: req.body.description}, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log("Data updated!")
        }
    })
});



// app.use('/api', apiRouter);
