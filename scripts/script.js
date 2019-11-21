(function() {
  var board = document.getElementById("board");
  var ctx = board.getContext("2d");
  var isDrawing = false;
  var isErasing = false;

  var location;
  xScale = 1;
  yScale = 1;
  eraserSize = 1;
  penSize = 1;
  penColor = "#000000";
  var redoStack = [];
  var points = [];
  var undo = document.getElementById("undoButton");
  var redo = document.getElementById("redoButton");

  init();
  function init() {
    window.addEventListener("resize", onResize, false);
    onResize();
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = penSize;
  }

  var onMouseDown = function() {
    location = getLocation();
    if (mode == "pen") {
      isDrawing = true;
      ctx.lineWidth = penSize;
      ctx.strokeStyle = penColor;
      ctx.globalCompositeOperation = "source-over";
      points.push({
        x: location.x,
        y: location.y,
        size: penSize,
        color: penColor,
        mode: "begin"
      });
    }
    if (mode == "eraser") {
      isErasing = true;
      ctx.lineWidth = eraserSize;
      ctx.globalCompositeOperation = "destination-out";
    }

    ctx.imageSmoothingQuality = "high";
    ctx.moveTo(location.x, location.y);
  };

  var onMouseMove = function() {
    if (isErasing == false || mode != "eraser") {
      if (isDrawing == false || mode != "pen") {
        return;
      }
    }
    if (isErasing == true && mode == "eraser") {
      ctx.beginPath();
      ctx.moveTo(location.x, location.y);
      ctx.fillStyle = "white";
      ctx.fill();
      location = getLocation();
      ctx.lineTo(location.x, location.y);
      ctx.stroke();
    }
    if (isDrawing == true && mode == "pen") {
      ctx.beginPath();
      ctx.imageSmoothingQuality = "high";
      ctx.moveTo(location.x, location.y);
      location = getLocation();
      ctx.lineTo(location.x, location.y);
      ctx.stroke();
      points.push({
        x: location.x,
        y: location.y,
        size: penSize,
        color: penColor,
        mode: "draw"
      });
      ctx.closePath();
    }
  };

  var onMouseUp = function() {
    isDrawing = false;
    isErasing = false;
    if (location === undefined) {
      return;
    }
    points.push({
      x: location.x,
      y: location.y,
      size: penSize,
      color: penColor,
      mode: "end"
    });
  };

  var getLocation = function() {
    var rect = board.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  board.addEventListener("mousedown", onMouseDown);
  board.addEventListener("mousemove", onMouseMove);
  board.addEventListener("mouseup", onMouseUp);

  function onResize() {
    board.width = window.innerWidth - 5;
    board.height = window.innerHeight - 60;
    if (points.length > 0) {
      redrawAll();
    }
  }

  var undoLast = function() {
    redoStack.push(points.pop());
    redrawAll();
  };

  var redoLast = function() {
    points.push(redoStack.pop());
    redrawAll();
  };

  var redrawAll = function() {
    if (points.length == 0) {
      return;
    }
    ctx.clearRect(0, 0, board.width, board.height);

    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      var begin = false;

      if (ctx.lineWidth != point.size) {
        ctx.lineWidth = point.size;
        begin = true;
      }
      if (ctx.strokeStyle != point.color) {
        ctx.strokeStyle = point.color;
        begin = true;
      }
      if (point.mode == "begin" || begin) {
        ctx.beginPath();
        ctx.imageSmoothingQuality = "high";
        ctx.moveTo(point.x, point.y);
      }
      ctx.lineTo(point.x, point.y);
      if (point.mode == "end" || i == points.length - 1) {
        ctx.stroke();
      }
    }
    ctx.stroke();
  };
  var interval;
  undo.addEventListener("mousedown", function() {
    interval = setInterval(undoLast, 50);
  });
  undo.addEventListener("mouseup", function() {
    clearInterval(interval);
  });

  redo.addEventListener("mousedown", function() {
    interval = setInterval(redoLast, 50);
  });
  redo.addEventListener("mouseup", function() {
    clearInterval(interval);
  });
})();
