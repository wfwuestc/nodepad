
define(['jquery','./event'],function ($, Event) {
  var log = console.log.bind(console)

  function Note() {
    this.AddNote('add title', 'add something')
    this.remove()
    this.clear()
    this.drag()

  }

  Note.prototype.AddNote = function (title, msg) {
    var temp = '<li class="note-item" style="top: -20px; left: 50px;"><div class="before"></div><p class="delete-note">×</p>'+
        '<div class="note-title" contenteditable="true" edit="no">' + title + '</div>' +
        '<div class="note-content" contenteditable="true" edit="no">' + msg + '</div>' +
        '</li>'
    var $node = $(temp)
    $('ul.note').append($node)
  }

  Note.prototype.remove = function () {
    $('.delete-note').on('click', function () {
      $(this).parent().remove()
    })
  }

  Note.prototype.clear = function () {
    $('.note-content, .note-title').on('click', function () {
      var $edit = $(this).attr('edit')
      if ($edit === 'no') {
        $(this).empty()
        $(this).attr('edit', 'yes')
      }
    })
  }

  Note.prototype.drag = function () {
    $('.note-item>.before').on('mousedown', function (e) {
      var _this = $(this).parent()

      var XX = e.pageY - _this.offset().top
      var YY = e.pageX - _this.offset().left + 7

      _this.addClass('drag-note')
          .data('evtPos', {x:XX, y:YY})
      $('body').on('mousemove', function (e) {
          log($('.drag-note').data('evtPos'))
          _this.offset({
            "top": e.pageY - $('.drag-note').data('evtPos').y ,
            "left": e.pageX - $('.drag-note').data('evtPos').x
          })
      }).on('mouseup', function () {
        _this.removeClass('drag-note').removeData('evtPos')
        $('body').off('mousemove')
      })
    })
  }
  return Note
})
