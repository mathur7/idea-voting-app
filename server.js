// express is the node framework
// body parser lets us pull POST content from http request

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Idea     = require('./server/models/idea');


// setting up the port
app.set('port', (process.env.PORT || 8080));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// connect to mongoose
const mongoUrl = process.env.MONGOLAB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);

// // configure app to use bodyparser
// // this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // Routes for API

// // instantiating an instance of express router
const router = express.Router();  

router.use(function(req, res, next) {
    console.log("something is happening");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// // test route to make sure everything is working as expected (accessed at GET http://localhost:8080/api)
router.get('/ideas', function(req, res) {
    Idea.find().sort('-createdAt').exec(function(ideas, err) {
      if (err) {
        return res.send(err);
      }
      res.json(ideas);
    })
});

// // all other API routes will go below
router.post('/ideas', function(req, res) {
    res.set('Content-Type', 'application/json');
    var idea = new Idea();
    idea.id = req.body.id;
    idea.description = req.body.data.description;
    idea.name = req.body.data.name;
    idea.email = req.body.data.email;
    idea.votes = req.body.votes;
    idea.save(function(err) {
      if (err) {
        return res.send(err);
      }
      res.json({idea});
    })
    
})

router.put('/ideas/:id', function(req,res) {
    Idea.findOne({ _id: req.params.id }, function(err, idea) { 
      res.set('Content-Type', 'application/json');
      idea.__v = req.body.__v;
      idea.save(function(err) {
        if (err) {
          return res.send(err);
        }
        res.json({ idea });
      })
    })
})

// // all routes will be prefixed with /api
app.use('/api', router);


// starting the server
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
