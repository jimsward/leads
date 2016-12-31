var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
/* GET home page. */

MongoClient.connect('mongodb://localhost:27017/donors', function (err, db) {
  if (err) throw err
  var entries = db.collection("entries")


  router.get('/', function (req, res, next) {
    var link = req.query.link
    return res.redirect(307,  '/app/index.html#/view1' + '?link=' + link)



    /*entries.find(query, function (err, item) {
      console.log(typeof item)
      var str = item;
      var jsonObj = JSON.parse(str);
      return res.redirect(307, req.hostname + '/app/index.html#/view1' + item)
    })*/
  })


  router.get('/user', function(req, res, next){

    console.dir(req.query)

    var query = {}
    query.key = req.query.link

    console.log('query: ' + query.key)

    entries.find(query).toArray( function(err, result){
      if (err) { console.dir(err); return  next(err)}
      console.log(result)
      return res.send(result[0])
    })

  })

  router.post('/newEntry', function (req, res, next) {
    console.dir(req.body)

    var data = req.body
    console.dir(data)
    console.log('NOW')
    entries.insert(data, function (err, result) {
      if (err) return next(err)
      return res.end()
    })
  })
  router.get('/getEntries', function (req, res, next) {
    entries.find().toArray(function (err, items) {
      return res.send({'entries': items})
    })
  })
  router.post('/update', function (req, res, next) {
//mongo returned a serialized ObjectID on original GET
    //need to turn it back into a BSON object for the query object
    console.dir(req.body)
    var obj = req.body
    var _id = new ObjectID.createFromHexString(obj._id)
    delete obj._id //mongo will not allow a duplicate _id

    entries.update({_id: _id}, obj, function (err, result) {
      if (err)return next(err)
      res.status(200).send()
    })
  })

})


module.exports = router;