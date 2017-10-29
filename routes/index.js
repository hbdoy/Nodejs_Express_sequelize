var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  /* 撈出 DB 所有資料 */
  models.Account.findAll().then(function(accounts){
    console.log(accounts);
    res.render('index', {
      title: '記帳囉',
      accounts: accounts
    });
  });
});

module.exports = router;
