var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Shopping = mongoose.model('Shopping');

router.param('storeproduct', function(req, res, next, id) {
  var query = Shopping.findById(id);
  query.exec(function (err, storeproduct){
    if (err) { return next(err); }
    if (!storeproduct) { return next(new Error("can't find storeproduct")); }
    req.storeproduct = storeproduct;
    return next();
  });
});

router.get('/shopping/:storeproduct',function(req,res) {
  res.json(req.storeproduct);
});

router.put('/shopping/:storeproduct/order', function(req, res, next) {
  console.log("Put Route "+req.storeproduct.name);
  req.storeproduct.order(function(err, storeproduct){
    if (err) { return next(err); }
    res.json(storeproduct);
  });
});

router.delete('/shopping/:storeproduct',function(req,res) {
  req.storeproduct.remove();
  res.sendStatus(200);
});

router.get('/shopping', function(req, res, next) {
  console.log("Get Route");
  Shopping.find(function(err, storeproducts){
    if(err){ console.log("Error"); return next(err); }
    res.json(storeproducts);
  console.log("res.json Get Route");
  });
  console.log("returningGet Route");
});

router.post('/shopping', function(req, res, next) {
  console.log("Post Route");
  var storeproduct = new Shopping(req.body);
  console.log("Post Route");
  console.log(storeproduct);
  storeproduct.save(function(err, storeproduct){
		console.log("Error "+err);
		if(err){  return next(err); }
    console.log("Post Route before json");
		res.json(storeproduct);
	});
});

module.exports = router;