var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/create', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('create_account');
});

/* 接收表單 POST 來的資料 */
router.post('/create', function(req, res, next) {
  console.log(req.body);
  models.Account.create({
    title: req.body.title,
    type: req.body.type,
    cost: req.body.cost
  }).then(function(){
    /* 回首頁 */
    res.redirect('/');
  });
});

/* update頁面 */
router.get('/:account_id/update', function(req, res, next) {
  console.log(req.params);
  models.Account.findOne({
    where: {
      id: req.params.account_id
    }
  }).then(function(account){
    res.render('update_account', {account: account});
  });
});

/* update DB 中的某筆資料 */
router.post('/:account_id/update', function(req, res, next) {
  models.Account.findOne({
    where: {
      id: req.params.account_id
    }
  }).then(function(account){
    account.update({
      title: req.body.title,
      type: req.body.type,
      cost: req.body.cost
    });
  }).then(function(){
    res.redirect('/');
  });
});

/* delete DB 中的某筆資料 */
router.post('/:account_id/delete', function(req, res, next) {
  models.Account.destroy({
    where: {
      id: req.params.account_id
    }
  }).then(function(){
    res.redirect('/');
  });
});

/* 某筆資料單獨頁面 */
router.get('/:account_id/', function(req, res, next) {
  models.Account.findOne({
    where: {
      id: req.params.account_id
    }
  }).then(function(account){
    res.render('single_account', {account: account});
  });
});

module.exports = router;
