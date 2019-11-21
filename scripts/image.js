var imageCounter = 0;
var dragEl = null;
var onDragStart = null;
var onDrag = null;
var onDragEnd = null;
var grabY = null;
var grabX = null;
var createNode = null;
var addNodeBtnEl = null;
var IsImageMoving = false;
var IsBarSelected = false;

var board = document.getElementById("board");

function uploadImage() {
  var image = document.getElementsByClassName("imageInput")[0];
  var img = document.createElement("img");
  var imgDiv = document.createElement("div");
  var imgDivBar = document.createElement("div");

  imgDiv.classList.add("ImageDiv");
  imgDivBar.classList.add("ImgBar");
  img.classList.add("UploadImageClass");
  img.src = window.URL.createObjectURL(image.files[0]);
  img.id = "image" + imageCounter;

  var closeIcon = document.createElement("img");
  closeIcon.classList.add("ImageIcons");
  closeIcon.classList.add("CloseIcons");
  closeIcon.src = "./NewIcons/CloseButton.svg";
  closeIcon.addEventListener("click", deleteImage);

  imgDivBar.appendChild(closeIcon);
  imgDiv.appendChild(imgDivBar);
  imgDiv.appendChild(img);

  // var moveIcon = document.createElement("img");
  // moveIcon.classList.add("ImageIcons");
  // moveIcon.classList.add("MoveIcons");
  // moveIcon.src = "./NewIcons/MoveIcon.svg";
  // imgDiv.appendChild(moveIcon);

  imgDiv.addEventListener("mousedown", ImgDragStart, false);
  imgDiv.addEventListener("mousemove", onImgDrag, false);
  imgDiv.addEventListener("mouseup", onImgDragEnd, false);
  imgDiv.addEventListener("mouseout", onImgDragEnd, false);

  imgDivBar.addEventListener(
    "mousedown",
    () => {
      IsBarSelected = true;
    },
    false
  );

  onStartImg(imgDiv);

  document.body.appendChild(imgDiv);
}

function onStartImg(Ele) {
  if (!Ele) return;
  const posX = board.width / 2;
  const posY = board.height / 2;

  Ele.style.transform = "translateX(" + posX + "px) translateY(" + posY + "px)";
  Ele.style.zIndex = "1";
}

function deleteImage(e) {
  let Parent = this.parentNode.parentNode;
  document.body.removeChild(Parent);
}

function ImgDragStart(ev) {
  var boundingClientRect;

  IsImageMoving = true;
  dragEl = this;

  boundingClientRect = dragEl.getBoundingClientRect();

  grabY = boundingClientRect.top - ev.clientY;
  grabX = boundingClientRect.left - ev.clientX;
}

function onImgDrag(ev) {
  if (dragEl === null || IsImageMoving === false || IsBarSelected === false) {
    onImgDragEnd();
    return;
  }

  let posX = ev.clientX + grabX;
  let posY = ev.clientY + grabY;

  if (posX < 10) posX = 10;

  if (posY < 90) posY = 90;

  dragEl.style.transform =
    "translateX(" + posX + "px) translateY(" + posY + "px)";
  dragEl.style.zIndex = "1";
}

function onImgDragEnd() {
  IsImageMoving = false;
  IsBarSelected = false;
  dragEl = null;
  grabX = null;
  grabY = null;
}
