var stage;
var stageEl;
var circle;
var tweenCircle;
var keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Shift: false
}

var windowHeight;
var windowWidth;

var walkV = 4;
var runV = 8;
var framerate = 60;

function logGlobals() {
    console.log(`Stage Height: ${windowHeight}`);
    console.log(`Stage Width: ${windowWidth}`);
}

function registerkey(e) {
    keys[e.key] = e.type == "keydown";
    //console.log(keys);
}

function animate() {
    var velocity = keys.Shift? runV: walkV;
    circle.x += keys.ArrowRight? velocity: 0;
    circle.x -= keys.ArrowLeft? velocity: 0;
    circle.y -= keys.ArrowUp? velocity: 0;
    circle.y += keys.ArrowDown? velocity: 0;

    if(circle.x >= stage.canvas.width - (windowHeight * 0.025)) circle.x = stage.canvas.width - (windowHeight * 0.025);
    if(circle.x <= 0 + (windowHeight * 0.025)) circle.x = 0 + (windowHeight * 0.025);
    if(circle.y <= 0 + (windowHeight * 0.025)) circle.y = 0 + (windowHeight * 0.025);
    if(circle.y >= stage.canvas.height - (windowHeight * 0.025)) circle.y = stage.canvas.height - (windowHeight * 0.025);
}

function tock() {
    animate();
	stage.update();
}

function init() {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;

    stageEl = document.getElementById("stage");
    
    if(stageEl != null && stageEl != undefined){
        stageEl.setAttribute("width", `${windowWidth}px`);
        stageEl.setAttribute("height", `${windowHeight}px`);
    }
    else {
        console.log("Stage Element Not Found");
        return;
    }

    stage = new createjs.Stage("stage");
    circle = new createjs.Shape();
    circle.graphics.beginFill("blue").drawCircle(0,0, (windowHeight * 0.025));
    circle.x = Math.random() * windowWidth;
    circle.y = Math.random() * windowHeight;
    stage.addChild(circle);
    stage.update();

    tweenCircle = createjs.Tween.get(circle);
    document.addEventListener('keydown', registerkey);
    document.addEventListener('keyup', registerkey);
    createjs.Ticker.framerate = framerate;
    createjs.Ticker.addEventListener("tick", tock);
}

window.addEventListener("DOMContentLoaded", init);
