const Task = require("../models/task.js");

exports.create = (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.title
    });
    task
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Des erreurs sont apparus pendant la création du message"
            });
        });
};

