'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
    Task.find()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};




exports.create_a_task = function(req, res) {
    var new_task = new Task(req.body);
    new_task.save()
      .then(task => {
        res.json(task);
      })
      .catch(err => {
        res.send(err);
      });
};
  


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};