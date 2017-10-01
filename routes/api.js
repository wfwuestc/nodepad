var express = require('express')
var router = express.Router()
var Note = require('../model/note.js')


/* GET api listing. */
router.get('/notes', function (req, res, next) {
  var opts = {raw: true}
  Note.findAll(opts).then(function (notes) {
    console.log('-----notes------')
    console.log(notes)
    res.send({status: 0, data: notes})
  }).catch(function () {
    res.send({status: 1, errorMsg: '数据库异常'})
  })
})

router.post('/notes/add', function (req, res, next) {
  if (!req.session.user) {
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  var note = req.body.content
  var title = req.body.title
  var uid = req.session.user.id
  var username = req.session.user.username
  var curTime = new Date().getTime();
  console.log('----add-----')
  console.log(note)
  console.log(title)
  console.log(uid)
  console.log(curTime)
  Note.create({content: note, title: title, uid: uid, username: username, updatedAt: curTime, createdAt: curTime}).then(function (data) {
    console.log('----finish add-----')
    res.send({
      status: 0, result: data,
    })
  }).catch(function () {
    res.send({status: 1, errorMsg: '数据库异常或者你没有权限'})
  })
})

/*修改note*/
router.post('/notes/edit', function (req, res, next) {
  if (!req.session.user) {
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  var noteId = req.body.id
  var note = req.body.content
  var title = req.body.title
  var uid = req.session.user.id
  var curTime = new Date().getTime();
  Note.update({content: note, title: title, uid: uid, updatedAt: curTime}, {where: {id: noteId, uid: uid}}).then(function (list) {
    if(list[0] === 0) {
      return res.send({status: 1, errorMsg: '你没有权限'})
    }
    res.send({status: 0})
  }).catch(function () {
    res.send({status: 1, errorMsg: '数据库异常或者你没有权限'})
  })
})

/*删除note*/
router.post('/notes/delete', function (req, res, next) {
  if (!req.session.user) {
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  var noteId = req.body.id
  var uid = req.session.user.id
  Note.destroy({where: {id: noteId, uid: uid}}).then(function (list) {
    if(list[0] === 0) {
      return res.send({status: 1, errorMsg: '你没有权限'})
    }
    res.send({status: 0})
  }).catch(function () {
    res.send({status: 1, errorMsg: '数据库异常或者你没有权限'})
  })
})

module.exports = router