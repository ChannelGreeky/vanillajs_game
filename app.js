const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const initBtn = document.getElementById("jsInit");

const INITIAL_COLOR = "#2c2c2c";

canvas.width = 500;
canvas.height = 500;

//초기 배경색 지정
//안 하면 걍 투명색 됨
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

Array.from(color).forEach(color => color.addEventListener("click", handleColorClick));

function handleColorClick(event) {
    const selectColor = event.target.style.backgroundColor;
    ctx.strokeStyle = selectColor;
    ctx.fillStyle = selectColor;
}

range.addEventListener("input", changeBrushSize);

function changeBrushSize(event) {
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;
    //ctx.lineWidth = range.value; parameter에 event안넣고 이렇게 해도 됨
} 

mode.addEventListener("click", hadleModeChange);

function hadleModeChange(){
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    }
    else {
        filling = true;
        mode.innerText = "Draw";
    }
}

function canvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

//우클릭 방지
function handleRC(event) {
    event.preventDefault();
}

saveBtn.addEventListener("click", handleSave);

function handleSave() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "MyPicture";
    link.click();
}

initBtn.addEventListener("click", initialization)

function initialization() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", canvasClick);

    //우클릭 방지
    canvas.addEventListener("contextmenu", handleRC);
}

