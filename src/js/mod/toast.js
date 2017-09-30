define(['jquery'],function ($) {
  function toast(msg, time) {
    this.msg = msg
    this.dismissTime = time||1000
    this.createToast()
    this.showToast()
  }

  toast.prototype.createToast = function () {
    var toast = '<div class="toast">' + this.msg + '</div>'
    this.$toast = $(toast)
    $('body').append(this.$toast)
  }

  toast.prototype.showToast = function () {
    var _this = this
    this.$toast.fadeIn(300,function () {
      setTimeout(function () {
        _this.$toast.fadeOut(300,function () {
          _this.$toast.remove()
        })
      }, _this.dismissTime)
    })
  }

  return toast
})


