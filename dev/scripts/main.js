let flashcard = {}

flashcard.isDrawing = false
flashcard.lastX = 0
flashcard.lastY = 0
flashcard.whichShape = 'drawLine'

// create the drawing canvas and context
const canvas = $('<canvas>')
                .attr('id', 'canvas')
                .attr('height', '400px')
                .attr('width', '600px')
$('body').append(canvas)

// create 2d context
const ctx = canvas[0].getContext('2d')
ctx.lineJoin = 'round'
ctx.lineCap = 'round'
ctx.lineWidth = '3'

flashcard.drawLine = function (e) {
  if(!flashcard.isDrawing) return
  ctx.beginPath()
  ctx.moveTo(flashcard.lastX, flashcard.lastY)
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()
  flashcard.lastX = e.offsetX
  flashcard.lastY = e.offsetY
}

flashcard.drawC = function (e) {
  ctx.font = '18px serif'
  ctx.strokeText('C', e.offsetX, e.offsetY)
}

flashcard.addControls = function () {
  const clearButton = $('<button>')
                        .html('Clear')
                        .addClass('clearButton')
  $('body').append(clearButton)

  const lineButton = $('<button>')
                      .html('line')
                      .addClass('lineButton')
  $('body').append(lineButton)

  const cButton = $('<button>')
                    .html('C')
                    .addClass('cButton')
  $('body').append(cButton)
}




flashcard.addEventListeners = function () {
  $('#canvas').on('mousemove', function (e) {
    if (flashcard.whichShape === 'drawLine') {
      flashcard.drawLine(e)
    }
  })
  $('#canvas').on('click', function (e) {
    if (flashcard.whichShape !== 'drawLine') {
      flashcard[flashcard.whichShape](e)
    }
  })

  $('#canvas').on('mousedown', function (e) {
    flashcard.isDrawing = true
    flashcard.lastX = e.offsetX
    flashcard.lastY = e.offsetY
  })
  $('#canvas').on('mouseup', () => flashcard.isDrawing = false)
  $('#canvas').on('mouseout', () => flashcard.isDrawing = false)

  $('.clearButton').on('click', function () {
    ctx.clearRect(0, 0, 600, 400)
  })

  $('.lineButton').on('click', () => flashcard.whichShape = 'drawLine')
  $('.cButton').on('click', () => flashcard.whichShape = 'drawC')
}



flashcard.init = function () {
  const title = $('<h2>').text('I did it!! Yaaayy');
  $('body').append(title)
  flashcard.addControls()
  flashcard.addEventListeners()
}

$(document).ready(function () {
  flashcard.init()
});