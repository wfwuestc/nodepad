require('less/toast.less')
require('less/note.less')
require('less/main.less')


define(['../mod/toast','../mod/note','../mod/waterfall','jquery'],function (toast, Note, Waterfall, $) {
  $('#add-note').on('click', function () {
    new Note()
    Waterfall()
  })

  $('.sort').on('click', function () {
    Waterfall()
  })
})