var stage = document.getElementById('canvas').getContext('2d');
stage.canvas.width = window.innerWidth;
stage.canvas.height = window.innerHeight;

var office = new Image();
office.src = 'office/office.jpg';

var flipbtn = new Image();
flipbtn.src = 'ui/flipbtn/left.png';

var mouseX = 0, mouseY = 0;

var flipbtnX = 10;
var flipbtnY = stage.canvas.height/5.5;
var flipbtnW = stage.canvas.width/27.1;
var flipbtnH = stage.canvas.height/1.5;

var lookingside = false;
var robertside = false;

var staticframe = 0;
var static = new Image();
static.src = 'static/1.png';

var monitorX = stage.canvas.width/17;
var monitorY = stage.canvas.height/6.6;
var monitorW = stage.canvas.width/2.132;
var monitorH = stage.canvas.height/2.22;

var mapX = stage.canvas.width/1.8;
var mapY = stage.canvas.height/4.35;
var mapW = stage.canvas.width/2.58;
var mapH = stage.canvas.height/2.63;

var cameraIMG = new Image();
cameraIMG.src = 'cameras/desk/robert.jpg';

var mapIMG = new Image();
mapIMG.src = 'ui/map.jpg';

var robertmoving = false;

var cameras = ['cameras/closet/','cameras/desk/','cameras/board/','cameras/corner/'];

var robertlocation = 1;

var currentcamera = 1;

var cambtn1;
var cambtn2;
var cambtn3;
var cambtn4;

window.onload = function(){


    cambtn1 = document.getElementById('cam1');
    cambtn2 = document.getElementById('cam2');
    cambtn3 = document.getElementById('cam3');
    cambtn4 = document.getElementById('cam4');

    cambtn1.style.left = stage.canvas.width/1.7;
    cambtn1.style.top = stage.canvas.height/3.3;

    cambtn2.style.left = stage.canvas.width/1.54;
    cambtn2.style.top = stage.canvas.height/3.3;
    cambtn2.classList.add('on');

    cambtn3.style.left = stage.canvas.width/1.35;
    cambtn3.style.top = stage.canvas.height/3.3;

    cambtn4.style.left = stage.canvas.width/1.25;
    cambtn4.style.top = stage.canvas.height/3.3;


    setInterval(update, 0);
    setInterval(staticanimation, 100);
    setInterval(robertmove, 4000);

}

function update(){

    stage.clearRect(0,0,stage.canvas.width,stage.canvas.height);
    stage.drawImage(office, 0, 0, stage.canvas.width, stage.canvas.height);

    stage.drawImage(flipbtn, flipbtnX, flipbtnY, flipbtnW, flipbtnH);

    if(currentcamera == robertlocation){

        cameraIMG.src = cameras[currentcamera]+'robert.jpg';

    } else {

        cameraIMG.src = cameras[currentcamera]+'empty.jpg';

    }

    if(robertlocation < 0){

        robertlocation = 0;

    }

    if(robertlocation > 3){

        robertlocation = 4;
        robertside = true;
    }

    stage.save();

    //stage.translate(415, 255);

    stage.rotate(-0.4*Math.PI/180);

    if(!lookingside){
        stage.globalAlpha = 0.5
        stage.drawImage(cameraIMG, monitorX, monitorY, monitorW, monitorH);

        if(!robertmoving){stage.globalAlpha = 0.2;} else if(robertmoving){stage.globalAlpha = 1;}
        stage.drawImage(static, monitorX, monitorY, monitorW, monitorH);
        stage.globalAlpha = 1;
    }

    stage.restore();

    stage.save();

    stage.rotate(0.3*Math.PI/180);

    if(!lookingside){

        stage.drawImage(mapIMG, mapX, mapY, mapW, mapH);

    }

    stage.restore();

    if(mouseX > flipbtnX && mouseX < flipbtnX+flipbtnW && mouseY > flipbtnY && mouseY < flipbtnY+flipbtnH){
        if(!lookingside){
            lookingside = true;
        } else if(lookingside){
            lookingside = false;
        }

    }

    if(lookingside){

        flipbtn.src = 'ui/flipbtn/right.png';
        flipbtnX = stage.canvas.width-flipbtnW-10;
        if(robertside){office.src = 'office/side/robert.jpg';} else {office.src = 'office/side/empty.jpg';}
        for(hidecams=0;hidecams<document.getElementsByClassName('cambtn').length;hidecams++){

            document.getElementsByClassName('cambtn')[hidecams].hidden = true;

        }

    } else if(!lookingside){

        flipbtn.src = 'ui/flipbtn/left.png';
        flipbtnX = 10;
        office.src = 'office/office.jpg';

        for(hidecams=0;hidecams<document.getElementsByClassName('cambtn').length;hidecams++){

            document.getElementsByClassName('cambtn')[hidecams].hidden = false;

        }

    }
    

}

function switchcam(c,b){

    currentcamera = c;
    cambtn1.classList.remove('on');
    cambtn2.classList.remove('on');
    cambtn3.classList.remove('on');
    cambtn4.classList.remove('on');

    b.classList.add('on');

}

document.addEventListener('mousemove', function(event){

    mouseX = event.clientX;
    mouseY = event.clientY;

});

document.addEventListener('click', function(event){

});

function staticanimation(){

    staticframe++;
    static.src = 'static/'+staticframe+'.png';

    if(staticframe == 8){

        staticframe = 0;

    }

}

function robertmove(){

    if(Math.random()*100 < 50){

        if(Math.random()*10 < 5 && robertlocation != 4){

            robertmoving = true;
            robertlocation++;
            setTimeout(function(){ robertmoving = false; }, 1000);

        } else if(robertlocation != 0 && robertlocation != 4){

            robertmoving = true;
            robertlocation--;
            setTimeout(function(){ robertmoving = false; }, 1000);

        }
    }

}