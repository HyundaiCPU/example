const canvas = document.querySelector("#jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange");
const modebtn = document.querySelector("#jsMode");
const savebtn = document.querySelector("#jsSave");
const clearbtn = document.querySelector("#jsClear");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;
function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
  if (filling) {
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}
function handleModeClick() {
  if (filling) {
    filling = false;
    modebtn.innerText = "Fill";
  } else {
    filling = true;
    modebtn.innerText = "Paint";
  }
}
function handleSaveClick() {
  const img = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = img;
  link.download = "paint.png";
  link.click();
}
function handleClearClick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = ctx.strokeStyle;
}
function handleContext(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleContext);
  handleClearClick();
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (modebtn) {
  modebtn.addEventListener("click", handleModeClick);
}
if (savebtn) {
  savebtn.addEventListener("click", handleSaveClick);
}
if (clearbtn) {
  clearbtn.addEventListener("click", handleClearClick);
}
