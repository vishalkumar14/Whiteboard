var board = document.getElementById("board");
var ctx = board.getContext("2d");
var mode = "pen";
var isFirst = true;

function ChangeActive(newMode) {
  var currentElement = document.getElementById(newMode);
  currentElement.className += " active";

  var oldElement = document.getElementById(mode);
  var newClass = oldElement.className.replace(" active", "");
  oldElement.className = newClass;
}

function ClassToggleById(ID_Name) {
  const Target = document.getElementById(ID_Name);
  Target.classList.toggle("show");
}

function ClassReplaceById(ID_Name) {
  const Target = document.getElementById(ID_Name);
  const newClass = Target.className.replace("show", "");
  Target.className = newClass;
}

function handleModeChange(newMode) {
  ChangeActive(newMode);
  if (newMode === "Image") {
    ClassToggleById("imageOptions");
  }

  if (newMode === "zoom") {
    ClassToggleById("zoomOptions");
  }

  if (newMode === mode) {
    if (mode === "pen") {
      ClassToggleById("penOptions");
    } else if (mode === "eraser") {
      ClassToggleById("eraserOptions");
    }
  } else {
    if (mode === "pen" && isFirst === false) {
      ClassReplaceById("penOptions");
    } else if (mode === "eraser" && isFirst === false) {
      ClassReplaceById("eraserOptions");
    } else if (mode === "Image" && isFirst === false) {
      ClassReplaceById("imageOptions");
    } else if (mode === "zoom" && isFirst === false) {
      ClassReplaceById("zoomOptions");
    }
    mode = newMode;
  }
  isFirst = false;
}

function changeZoomSize(Scale) {
  var output = document.getElementById("RangeValueZoom");
  output.innerHTML = Scale + "%";
}

function changeEraserSize(newSize) {
  var output = document.getElementById("RangeValueEraser");
  output.innerHTML = newSize;
  eraserSize = newSize;
}

function changePenSize(newSize) {
  var output = document.getElementById("RangeValuePen");
  output.innerHTML = newSize;
  penSize = newSize;
}

function changePenColor(newColor) {
  let penSpan = document.getElementById("pen");
  switch (newColor) {
    case "black":
      penSpan.children[1].src = "./NewIcons/Black_Pencil.svg";
      penColor = "#000000";
      break;

    case "red":
      penSpan.children[1].src = "./NewIcons/Red_Pencil.svg";
      penColor = "#ff1744";
      break;

    case "blue":
      penSpan.children[1].src = "./NewIcons/Blue_Pencil.svg";
      penColor = "#2962ff";
      break;
  }
}

function DownloadImage(ev) {
  console.log(ev);
  ev.href = board.toDataURL();
  ev.download = "BoardPic.png";
}

function MenuOpen(e) {
  const MenuNav = document.getElementById("tweakTools");
  e.classList.toggle("menu-btn_active");
  MenuNav.classList.toggle("menu-nav_active");
}
