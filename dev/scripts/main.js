let flashcard = {}

flashcard.isDrawing = false
flashcard.lastX = 0
flashcard.lastY = 0
flashcard.whichShape = 'drawPen'

// create the animation canvas, for tracking movement of lines and pen
const animationCanvas = $('<canvas>')
                .attr('id', 'animationCanvas')
                .attr('height', '400px')
                .attr('width', '600px')
$('body').append(animationCanvas)

// create the final canvas, to store all strokes during animation
const finalCanvas = $('<canvas>')
  .attr('id', 'finalCanvas')
  .attr('height', '400px')
  .attr('width', '600px')
$('body').append(finalCanvas)


// create 2d context for animation context
const actx = animationCanvas[0].getContext('2d')
actx.lineJoin = 'round'
actx.lineCap = 'round'
actx.lineWidth = '3'

// create 2d context for final canvas
const fctx = finalCanvas[0].getContext('2d')
fctx.lineJoin = 'round'
fctx.lineCap = 'round'
fctx.lineWidth = '3'


flashcard.drawPen = function (e, context) {
  if(!flashcard.isDrawing) return
  context.beginPath()
  context.moveTo(flashcard.lastX, flashcard.lastY)
  context.lineTo(e.offsetX, e.offsetY)
  context.stroke()
}

flashcard.updateLastPositions = function(e) {
  flashcard.lastX = e.offsetX
  flashcard.lastY = e.offsetY
}

flashcard.drawLine = function (e, context) {
  context.beginPath()
  context.moveTo(flashcard.lastX, flashcard.lastY)
  context.lineTo(e.offsetX, e.offsetY)
  context.stroke()
}

flashcard.drawC = function (e, context) {
  context.font = '18px serif'
  context.strokeText('C', e.offsetX, e.offsetY)
}

flashcard.clearCanvas = function (context) {
  context.clearRect(0, 0, 600, 400)
}

flashcard.addControls = function () {
  const clearButton = $('<button>')
                        .html('Clear')
                        .addClass('clearButton')
  $('body').append(clearButton)

  const penButton = $('<button>')
                      .html('pen')
                      .addClass('penButton')
  $('body').append(penButton)
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
  $('#animationCanvas').on('mousemove', function (e) {
    if (flashcard.whichShape === 'drawPen') {
      flashcard.drawPen(e, actx)
      flashcard.clearCanvas(actx)
      flashcard.drawPen(e, fctx)
      flashcard.updateLastPositions(e)
    }
    if (flashcard.whichShape === 'drawLine' && flashcard.isDrawing) {
      flashcard.drawLine(e, actx)
      flashcard.clearCanvas(actx)
      flashcard.drawLine(e, actx)
    }
  })
  $('#animationCanvas').on('click', function (e) {
    if (flashcard.whichShape === 'drawC') {
      flashcard[flashcard.whichShape](e, fctx)
    }
  })

  $('#animationCanvas').on('mousedown', function (e) {
    flashcard.isDrawing = true
    if (flashcard.which === 'drawLine') {
      actx.beginPath()
    }
    flashcard.updateLastPositions(e)
  })

  $('#animationCanvas').on('mouseup', function (e) {
    flashcard.isDrawing = false
    if (flashcard.whichShape === 'drawLine') {
      flashcard.clearCanvas(actx)
      flashcard.drawLine(e, fctx)
    }
  })

  $('#animationCanvas').on('mouseout', () => flashcard.isDrawing = false)

  $('.clearButton').on('click', function () {
    flashcard.clearCanvas(fctx)
  })

  $('.penButton').on('click', () => flashcard.whichShape = 'drawPen')
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