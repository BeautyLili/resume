var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/resume';
var async = require('async');

// 图处上传引用包
var multiparty = require('multiparty');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

});



module.exports = router;
