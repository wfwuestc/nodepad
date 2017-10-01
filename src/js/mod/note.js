define(['jquery', './event', './toast'], function ($, Event, Toast) {
  var log = console.log.bind(console)

  function Note(opts) {
    console.log(1,opts)
    this.initOpts(opts)
    this.AddNote()
    this.bindEvent()
  }

  Note.prototype = {
    defaultOpts: {
      id: '',   //Note的 id
      $ct: $('ul.note').length > 0 ? $('ul.note') : $('body'),  //默认存放 Note 的容器
      content: 'input here', //Note 的内容
      title: 'input title',
      time: '',
      username: ''
    },
    initOpts: function (opts) {
      this.opts = $.extend({}, this.defaultOpts, opts || {})
      console.log(2,this.opts)
      if (this.opts.id) {
        this.id = this.opts.id
      }
    },
    edit: function (title, content) {
      var self = this
      $.post('/api/notes/edit', {
        id: this.id,
        title: title,
        content: content,
      }).done(function (ret) {
        if (ret.status === 0) {
          self.time = new Date(ret.time).toLocaleString('chinese',{hour12:false})
          self.$note.find('.time').html(self.time)
          Toast('update success')
        } else {
          Toast(ret.errorMsg)
        }
      })
    },

    add: function (title, content) {
      console.log('addd...')
      var self = this
      $.post('/api/notes/add', {title: title, content: content})
          .done(function (ret) {
            if (ret.status === 0) {
              self.id = ret.result.id
              var name = 'By ' + ret.result.username
              self.time = new Date(ret.result.createdAt).toLocaleString('chinese',{hour12:false})
              self.$note.find('.username').html(name)
              self.$note.find('.time').html(self.time)
              Toast('add success')
            } else {
              self.$note.remove()
              Event.fire('waterfall')
              Toast(ret.errorMsg)
            }
          })
      //todo
    },

    delete: function () {
      var self = this
      $.post('/api/notes/delete', {id: this.id})
          .done(function (ret) {
            if (ret.status === 0) {
              Toast('delete success')
              self.$note.remove()
              Event.fire('waterfall')
            } else {
              Toast(ret.errorMsg)
            }
          })
    },
    bindEvent: function () {
      var self = this,
          $note = this.$note,
          $noteHead = $note.find('.before'),
          $noteCt = $note.find('.note-content'),
          $noteTl = $note.find('.note-title'),
          $noteCT = $note.find('.note-title,.note-content')
      $delete = $note.find('.delete-note')
      $delete.on('click', function () {
        self.delete()
      })

      //contenteditable没有 change 事件，所有这里做了模拟通过判断元素内容变动，执行 save
      $noteCT.on('focus', function () {
        if ($(this).html() === self.defaultOpts.content || $(this).html() === self.defaultOpts.title && !($note.hasClass('drag-note'))) {
          $(this).empty()
        }
        $(this).data('before', $(this).html())
      }).on('blur paste', function () {
        if ($(this).data('before') != $(this).html()) {
          $(this).data('before', $(this).html())
          self.setLayout()
          if (self.id) {
            self.edit($noteTl.html(), $noteCt.html())
          } else {
            self.add($noteTl.html(), $noteCt.html())
          }
        }
      })

      //设置笔记的移动
      $noteHead.on('mousedown', function (e) {
        console.log('3')
        var XX = e.pageY - $note.offset().top - 4
        var YY = e.pageX - $note.offset().left + 4
        $note.addClass('drag-note')
            .data('evtPos', {x: XX, y: YY})
        $('body').on('mousemove', function (e) {
          $note.offset({
            "top": e.pageY - $('.drag-note').data('evtPos').y,
            "left": e.pageX - $('.drag-note').data('evtPos').x,
          })
        }).on('mouseup', function () {
          $note.removeClass('drag-note').removeData('evtPos')
          $('body').off('mousemove')
        })
      })
    },
    setLayout: function () {
      var self = this
      if (self.clk) {
        clearTimeout(self.clk)
      }
      self.clk = setTimeout(function () {
        Event.fire('waterfall')
      }, 100)
    },
  }

  Note.prototype.AddNote = function () {
    var temp = '<li class="note-item" style="top: -20px; left: 50px;"><div class="before"></div><p class="iconfont delete-note"></p>' +
        '<div class="note-title" contenteditable="true" edit="no">' + this.opts.title + '</div>' +
        '<div class="note-content" contenteditable="true" edit="no">' + this.opts.content + '</div>' + '<p class="username">' + this.opts.username + '</p>' +
        '<p class="time">' + this.opts.time + '</p></li>'
    this.$note = $(temp)
    this.opts.$ct.append(this.$note)
    if (!this.id) {
      this.$note.siblings().css('zIndex', 0)
      this.$note.css({zIndex: 999, left: '10px', top: '100px'})
    }


    Event.fire('waterfall')
  }

  return Note
})
