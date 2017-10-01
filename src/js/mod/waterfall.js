
define(['jquery'],function ($) {
  function waterFall() {
    var winWidth = $('.note').width()
    var eleWidth = $('.note-item').outerWidth(true)
    var colSumHeight = []
    var colNum = parseInt(winWidth / eleWidth)

    offsetWidth = ($(window).width() - eleWidth*colNum) / 2; //使note居中显示的偏移量
    for (var i = 0; i < colNum; i++) {
      colSumHeight[i] = 0
    }
    
    $('.note-item').each(function () {
      var cur = $(this)
      var idx = 0
      var minSumHeight = Math.min.apply(null, colSumHeight)
      idx = colSumHeight.indexOf(minSumHeight)

      cur.css({
        top: minSumHeight,
        left: eleWidth * idx + offsetWidth,
      })
      colSumHeight[idx] = cur.outerHeight(true) + colSumHeight[idx]
    })
  }

  $(window).on('resize', function () {
    waterFall()
  })

  return waterFall
})