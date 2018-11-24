//https://codepen.io/hendrysadrak/pen/VYZQYv
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.beginPath();
    this.moveTo(x + radius, y);
    this.arcTo(x + width, y, x + width, y + height, radius);
    this.arcTo(x + width, y + height, x, y + height, radius);
    this.arcTo(x, y + height, x, y, radius);
    this.arcTo(x, y, x + width, y, radius);
    this.closePath();
    return this;
  }

//https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
}

var canvas;
var ctx;
var explosion;
var swirl;
var bidoof;
var substitute;
var girarina;
var yamato;
var yamatobg;
var sansDeltarune;
var deltarun;
var audio;
var timeRewind;
var go;
var spinjump;
var chasers;
var fanfare;
var oof;
var framerate = 30;
function drawOnCanvas() {
    canvas = document.getElementById("mainScreen");
    ctx = canvas.getContext("2d");

    //pixelated effect
    ctx.imageSmoothingEnabled = false;

    //adding click EventListener
    canvas.addEventListener('click', function(e){canvasClick(e);}, false);

    //loading assets
    explosion = new Image();
    explosion.src = "explosion.jpg";
    swirl = new Image();
    swirl.src = "swirl.png";
    bidoof = new Image();
    bidoof.src = "Bidoof.gif";
    substitute = new Image();
    substitute.src = "Substitute.gif";
    yamato = new Image();
    yamato.src = "yamato.png";
    yamatobg = new Image();
    yamatobg.src = "yamatobg.png";
    giratina = new Image();
    giratina.src = "Giratina.gif";
    sansDeltarune = new Array();
    sansDeltarune[0] = new Image();
    sansDeltarune[0].src = "SansDeltarune.png";
    sansDeltarune[1] = new Image();
    sansDeltarune[1].src = "SansDeltarune2.png";
    sansDeltarune[2] = new Image();
    sansDeltarune[2].src = "SansDeltarune3.png";
    sansDeltarune[3] = new Image();
    sansDeltarune[3].src = "susie.png";
    deltarun = new Image();
    deltarun.src = "deltarun.png";

    //https://soundscrate.com/
    audio = new Audio('explosion-sound.mp3');
    audio.loop=false;
    //ghost trick
    timeRewind = new Audio('timerewind.mp3');
    timeRewind.volume = 0.6;
    //https://soundscrate.com/
    go = new Audio('go!.mp3');
    go.volume = 0.6;
    //http://soundbible.com/
    spinjump = new Audio('spinjump.mp3');
    spinjump.loop=false;
    spinjump.volume=0.6;
    //steins;gate 0
    chasers = new Audio('chasers.mp3');
    chasers.volume = 0.6;
    //http://www.freesfx.co.uk
    fanfare = new Audio('fanfare.mp3');
    fanfare.volume=1;
    //roblox
    oof = new Audio('oof.mp3');
    oof.loop=false;
    //Deltarune Lancer
    lancer = new Audio('lancer.ogg');
    lancer.volume=0.6;

    //keep loading the main loop at 30 frames per second
    mainLoop();
    setInterval(mainLoop, 1000/framerate);
    setInterval(checkAudio, 1000/200);
}
var buttonsClickable = [false, false];
var drawMenu = false;
function canvasClick(e) {
    //speeding up the dialog drawing speed when clicked
    textAdvancingSpeed = 6.3;

    //When the text is finished drawing and you click on the screen, load next text
    if (textFinishedRendering==true) {
        currentTextNumber++;
        lettersProcessed = 0;
        textAdvancingSpeed = 0.6;
        textFinishedRendering=false;
        sfxPlaying=false;
    }
    
    //ctx.roundRect(canvas.width/2 - 150, canvas.height-60 + initiateFrames*10, 140, 50, 2);
    if(buttonsClickable[0] && e.offsetX>canvas.width/2 - 150 && e.offsetX<canvas.width/2 - 10 && e.offsetY>canvas.height - 60 && e.offsetY<canvas.height-10) {
        buttonsClickable[0] = false;
        buttonsClickable[1] = false;
        drawMenu = true;
    }
    if(buttonsClickable[1] && e.offsetX>canvas.width/2 + 10 && e.offsetX<canvas.width/2 + 150 && e.offsetY>canvas.height - 60 && e.offsetY<canvas.height-10) {
        buttonsClickable[0] = false;
        buttonsClickable[1] = false;
        eventNumberIncrement();
    }
}

function eventNumberIncrement() {
    eventNumber++;
    currentTextNumber=0;
    lettersProcessed = 0;
    textAdvancingSpeed = 0.6;
    textFinishedRendering=false;
    sfxPlaying=false;
}

function loadMenu() {
    ctx.fillStyle = "rgba(255,255,255,0.90)";
    ctx.roundRect(canvas.width*0.3,canvas.height*0.3,canvas.width*0.4,canvas.height*0.5,15);
    ctx.fill();
    ctx.fillStyle = "rgba(125,125,125,0.90)";
    ctx.roundRect(canvas.width*0.3,canvas.height*0.3,canvas.width*0.4,canvas.height*0.08,15);
    ctx.fill();

    var drawnButtons = 0;
    ctx.fillStyle = "rgba(85,85,85,0.90)";
    for(var i=0; i<unlockedSkills.length; i++) {
        if (unlockedSkills[i]==0) continue;
        else {
            canvas.addEventListener("click", function (e) {
                if(e.offsetX>canvas.width*0.305 && e.offsetX<canvas.width*(0.305+0.39) && e.offsetY>canvas.height*(0.3+0.090+drawnButtons*(0.075)) && e.offsetY<canvas.height*(0.3+0.090+drawnButtons*(0.075)+0.07)) {
                    activeButton=i-1;
                }
            }, false);
            if(activeButton==i) ctx.fillStyle = pulse(55, 185, 55);
            ctx.roundRect(canvas.width*0.305,canvas.height*(0.3+0.090+drawnButtons*(0.075)),canvas.width*0.39,canvas.height*0.07,8);
            ctx.fill();
            if(activeButton==i) ctx.fillStyle = "rgba(85,85,85,0.90)";
            drawnButtons++;
        }
    }

    ctx.roundRect(canvas.width*0.4,canvas.height*0.7,canvas.width*0.2,canvas.height*0.08, 8);
    ctx.fill();
    canvas.addEventListener("click", function (e) {
        if(e.offsetX>canvas.width*0.4 && e.offsetX<canvas.width*0.6 && e.offsetY>canvas.height*0.7 && e.offsetY<canvas.height*(0.7+0.08)) {
            drawMenu = false;
        }
    }, false);

    ctx.fillStyle = "rgba(20,20,20,1)";
    ctx.textAlign = "center";
    ctx.font = '46px Kosugi Maru';
    ctx.fillText("Select a move", canvas.width*0.5, canvas.height*0.36);

    ctx.font = '24px Kosugi Maru';
    drawnButtons=0;
    for(var i=0; i<unlockedSkills.length; i++) {
        if (unlockedSkills[i]==0) continue;
        else {
            ctx.textAlign = "left";
            ctx.fillText(moves[i], canvas.width*0.31, canvas.height*(0.345+0.090+drawnButtons*(0.075)));
            ctx.textAlign = "right";
            ctx.fillText(strengthOfMoves[i] + " MT", canvas.width*0.68, canvas.height*(0.345+0.090+drawnButtons*(0.075)));
        }
    }
    ctx.font = '35px Kosugi Maru';
    ctx.textAlign = "center";

    ctx.fillText("Okay!",canvas.width*0.5,canvas.height*0.755);
    
    
}

var textFinishedRendering = false;
var lettersProcessed = 0;
var textAdvancingSpeed = 0.6;
var currentTextNumber = 0;
var eventNumber = 0;
var sfxPlaying = false;
function printText(color, text, orientation) {
    
    if (currentTextNumber>=text.length) {
        eventNumberIncrement();
        currentTextNumber = 0;
        lettersProcessed = 0;
        return;
    };

    var currentText = text[currentTextNumber];
    //Sound effect 
    if (!sfxPlaying && color!="rgba(20,20,200,1)") {
        sfxPlaying=true;
        spinjump.play();
    }
    //textbox
    ctx.textAlign="left";

    if (orientation==0) {
        ctx.fillStyle = "rgba(20,20,20,1)";
        ctx.roundRect(3,canvas.height*0.8-2,canvas.width-6,canvas.height*0.2+1,18);
        ctx.fill();
    
        ctx.fillStyle = "rgba(255,255,255,0.90)";
        ctx.roundRect(5,canvas.height*0.8,canvas.width-10,canvas.height*0.2-3,20);
        ctx.fill();
    } else {
        ctx.fillStyle = "rgba(20,20,20,1)";
        ctx.roundRect(3,1,canvas.width-6,canvas.height*0.2+1,18);
        ctx.fill();
    
        ctx.fillStyle = "rgba(255,255,255,0.90)";
        ctx.roundRect(5,5,canvas.width-10,canvas.height*0.2-3,20);
        ctx.fill();
    }
    

    //default font
    ctx.font = '26px Kosugi Maru';
    ctx.fillStyle = color;

    //print letter by letter
    if (textFinishedRendering == false) {
        lettersProcessed += textAdvancingSpeed;
        if (orientation==0) {
            wrapText(ctx, currentText.substring(0,Math.floor(lettersProcessed)), 25, canvas.height*0.85, canvas.width-25, canvas.height*0.05);
        } else {
            wrapText(ctx, currentText.substring(0,Math.floor(lettersProcessed)), 25, canvas.height*0.05, canvas.width-25, canvas.height*0.05);
        }
        
        if (lettersProcessed > currentText.length) {
            textFinishedRendering = true;
        }

    //if finished printing, just print it all
    } else {
        if (orientation==0) {
            wrapText(ctx, currentText.substring(0,Math.floor(lettersProcessed)), 25, canvas.height*0.85, canvas.width-25, canvas.height*0.05);
        } else {
            wrapText(ctx, currentText.substring(0,Math.floor(lettersProcessed)), 25, canvas.height*0.05, canvas.width-25, canvas.height*0.05);
        }
    }
}

var fadeTimer = 0;
function fadeToColor(color, delay, speed) {
    fadeTimer++;
    if (fadeTimer>delay) {
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.min((fadeTimer-delay)*speed, 1);
        ctx.fillRect(0, 0, canvas.width, canvas.height); 
        if (ctx.globalAlpha >= 1) {
            fadeTimer=0;
            eventNumberIncrement();
        }
    }
}

var actorFadeTimer = 0;
function drawActor(id, image, fadeFlag) {
    if (fadeFlag==1) {
        if (actorFadeTimer>30) {
            ctx.globalAlpha = Math.min((actorFadeTimer-30)*0.01, 1);
            if (id==0) {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(image,canvas.width-450,canvas.height*0.3,image.width*9, image.height*9);
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
            } else {
                ctx.drawImage(image,canvas.width-350,canvas.height*0.44,image.width*9, image.height*9);
            }
            if (ctx.globalAlpha >= 1) {
                actorFadeTimer=0;
                eventNumberIncrement();
            }
            ctx.globalAlpha=1;
        }
    } else {
        if (id==0) {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(image,canvas.width-450,canvas.height*0.3,image.width*9, image.height*9);
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        } else {
            if (image==sansDeltarune[0] || image==sansDeltarune[1] || image==sansDeltarune[2]) ctx.drawImage(image,canvas.width-400,canvas.height*0.34,image.width*6, image.height*6);
            else if (image==sansDeltarune[3]) ctx.drawImage(image,canvas.width-300,canvas.height*0.34,image.width*6, image.height*6);
            else ctx.drawImage(image,canvas.width-350,canvas.height*0.44,image.width*9, image.height*9);
        }
    }
}

function checkAudio() {
    if(timeRewind.currentTime>=79.429) timeRewind.currentTime=1.220
}

var textBoardTimer = 0;
function textBoard(color, text, text2) {
    ctx.fillStyle = color;
    ctx.save();
    ctx.textAlign = "center"; 
    ctx.font = '46px Kosugi Maru';
    ctx.fillText(text, canvas.width/2, canvas.height/2); 
    ctx.fillText(text2, canvas.width/2, canvas.height/2+canvas.height*0.25); 
    textBoardTimer++;
    if(textBoardTimer>60) {
        textBoardTimer=0;
        eventNumberIncrement();
        ctx.textAlign = "left";
    }

}

function textBlob(name, flag, orientation) {
    
    if (flag==0)
    {
        ctx.fillStyle ="rgba(20,20,20,1)";
        if (orientation==0) ctx.roundRect(5,canvas.height*0.73-2,140+4,canvas.height*0.06+4,3);
        else ctx.roundRect(5,canvas.height*0.21-2,140+4,canvas.height*0.06+4,3);
        ctx.fill();

        ctx.fillStyle = "rgba(175,175,205,0.90)";
        if (orientation==0) ctx.roundRect(5,canvas.height*0.73,140,canvas.height*0.06,7);
        else ctx.roundRect(5,canvas.height*0.21,140,canvas.height*0.06,7);
        ctx.fill();

        ctx.fillStyle ="rgba(20,20,20,0.90)";
        ctx.font = '30px Kosugi Maru';
        ctx.textAlign="left";
        if(orientation==0) ctx.fillText(name,25,canvas.height*0.775);
        else ctx.fillText(name,25,canvas.height*0.254);
        
    }
    else {
        ctx.fillStyle = "rgba(20,20,20,1)";
        if (orientation==0) ctx.roundRect(canvas.width-152, canvas.height*0.73-2, 140+4, canvas.height*0.06+4, 3);
        else ctx.roundRect(canvas.width-152, canvas.height*0.21-2, 140+4, canvas.height*0.06+4, 3);
        ctx.fill();

        
        ctx.fillStyle = "rgba(175,175,205,0.90)";
        if (orientation==0) ctx.roundRect(canvas.width-150, canvas.height*0.73, 140, canvas.height*0.06, 7);
        else ctx.roundRect(canvas.width-150, canvas.height*0.21, 140, canvas.height*0.06, 7);
        ctx.fill();
        
        ctx.fillStyle ="rgba(20,20,20,0.90)";
        ctx.font = '30px Kosugi Maru';
        ctx.textAlign="right";
        if(orientation==0) ctx.fillText(name,canvas.width-25,canvas.height*0.775);
        else ctx.fillText(name,canvas.width-25,canvas.height*0.254);
    }
}

function drawOverworld(image, width, height, inversed) {
            if (inversed==1) {
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                ctx.drawImage(image,canvas.width-width,height,image.width*4, image.height*4);
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
            } else {
                ctx.drawImage(image,width,height,image.width*4, image.height*4);
            }
}

var currentTime = 0;
var overtime=false;
function moveOverworld(image, width, height, inversed, width2, time) {
    currentTime += 1000/framerate;
    if (currentTime>=time) {
        overtime=true;
    }
    if (inversed==1) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(image,canvas.width-(width + (width2-width)*Math.round((currentTime/time)*10)/10), height,image.width*4, image.height*4);
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
    } else {
        if (!overtime) {
            ctx.drawImage(image,width + (width2-width)*Math.round((currentTime/time)*10)/10, height,image.width*4, image.height*4);
        }
        else {
            ctx.drawImage(image,width2, height, image.width*4, image.height*4);
        }
    }
}

function checkAudio() {
    if(timeRewind.currentTime>=79.429) timeRewind.currentTime=1.220;
    if(chasers.currentTime>=148.850) chasers.currentTime=0.053;
}

/*function textBlob(name, flag) {

    if (flag==0)
    {
        ctx.fillStyle ="rgba(20,20,20,0.90)";
        ctx.roundRect(5,canvas.height*0.73,150,canvas.height*0.06,10);
        ctx.fillStyle = "rgba(125,125,125,0.90)";
        ctx.roundRect(5,canvas.height*0.73,150,canvas.height*0.06,10);
        ctx.fill();
        ctx.fillStyle ="rgba(20,20,20,0.90)";
        ctx.font = '30px Kosugi Maru';
        ctx.textAlign="left";
        ctx.fillText(name,25,canvas.height*0.775);
    }
    else {
        ctx.fillStyle = "rgba(20,20,20,1)";
        ctx.roundRect(canvas.width-152, canvas.height*0.73-2, 140+4, canvas.height*0.06+4, 3, true);
        ctx.fill();
        ctx.fillStyle = "rgba(175,175,205,0.90)";
        ctx.roundRect(canvas.width-150, canvas.height*0.73, 140, canvas.height*0.06, 7, true);
        ctx.fill();
        ctx.fillStyle ="rgba(20,20,20,0.90)";
        ctx.font = '30px Kosugi Maru';
        ctx.textAlign="right";
        ctx.fillText(name,canvas.width-25,canvas.height*0.775);
    }
}*/

var timeoutActive=false;
function timeout(time) {
    timeoutActive=true;
    setTimeout(function(){ 
        eventNumberIncrement(); 
        timeoutActive = false;
        overtime = false;
        currentTime = 0;
    }, time);
}

var HUDactive = false;
var initiateFrames = 6;
function drawHUD(number) {
    initiateFrames--;
    if (initiateFrames<0) initiateFrames=0;
    if (number!=1) ctx.fillStyle = "rgba(40, 120, 40, 1)";
    else if (number==1){
        ctx.fillStyle = pulse(60, 150, 60);
    }
    ctx.roundRect(canvas.width/2 - 150, canvas.height-60 + initiateFrames*10, 140, 50, 2);
    ctx.fill();

    if (number!=1) ctx.fillStyle = "rgba(60, 150, 60, 1)";
    else if (number==1){
        ctx.fillStyle = pulse(80, 200, 80);
    }
    ctx.roundRect(canvas.width/2 - 145, canvas.height-55 + initiateFrames*10, 130, 40, 3);
    ctx.fill();

    if (number!=2) ctx.fillStyle = "rgba(120, 40, 40, 1)";
    else if (number==2){
        ctx.fillStyle = pulse(120, 51, 51);
    }
    ctx.roundRect(canvas.width/2 + 10, canvas.height-60 + initiateFrames*10, 140, 50, 2);
    ctx.fill();

    if (number!=2) ctx.fillStyle = "rgba(150, 60, 60, 1)";
    else if (number==2){
        ctx.fillStyle = pulse(150, 60, 60);
    }
    ctx.roundRect(canvas.width/2 + 15, canvas.height-55 + initiateFrames*10, 130, 40, 3);
    ctx.fill();
    
    ctx.fillStyle = "rgba(20, 20, 20, 1)";
    ctx.font = '26px Kosugi Maru';
    ctx.textAlign = "left";
    ctx.fillText("Move", canvas.width/2 - 105, canvas.height - 25 + initiateFrames*10); 
    ctx.fillText("Strike!", canvas.width/2 + 35, canvas.height - 25 + initiateFrames*10); 
}

var pulseIntensity = 0;
var reversePulseing = false;
function pulse(baseColorR, baseColorG, baseColorB) {
    if (pulseIntensity>50) reversePulseing = true;
    if (pulseIntensity<-50) reversePulseing = false;
    if (!reversePulseing) pulseIntensity++;
    else pulseIntensity--;
    return "rgba(" + parseInt(baseColorR+(pulseIntensity)) +"," + parseInt(baseColorG+(pulseIntensity)) +"," + parseInt(baseColorB+(pulseIntensity)) + ")"; 
}

function unlockSkill (id) {
    unlockedSkills[id] = 1;
    var randColor = [Math.random()*100+150, Math.random()*100+150, Math.random()*100+150]
    ctx.fillStyle = "rgba(" + randColor[0] + "," + randColor[1] + "," + randColor[2] + ", 1)";
    ctx.font = '100px Kosugi Maru';
    ctx.strokeStyle= "rgba(20, 20, 20, 1)";
    ctx.lineWidth = 3;
    var rand1 = Math.random()*10-5;
    var rand2 = Math.random()*10-5;
    ctx.fillText("Unlocked " + moves[id] +"!!!!!!!!" , canvas.width/2-560 + rand1, canvas.height/2 + rand2);
    ctx.strokeText("Unlocked " + moves[id] +"!!!!!!!!" , canvas.width/2-560 + rand1, canvas.height/2 + rand2); 
    if (!timeoutActive) timeout(4000);
}
var moveTimeout = 0;
function useMove() {
    moveTimeout++;
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.font = '100px Kosugi Maru';
    var text = "BIDOOF USED...";
    var rand1=0;
    var rand2=0;
    if (moveTimeout>50) {
        chasers.pause();
        text = moves[activeButton].toUpperCase() + "!!!!!!!";
        rand1 = Math.random()*20-10;
        rand2 = Math.random()*20-10;
    }
    ctx.textAlign="center";
    ctx.fillText(text, canvas.width/2 + rand1, canvas.height/2 + rand2);

    if (moveTimeout>120) {
        eventNumberIncrement();
    }
}

var moves = ["Splash"];
var unlockedSkills = [0];
var strengthOfMoves = [0];
var activeButton = -1;

function easterEgg() {
    eventNumber=1000;
    window.removeEventListener("keypress", easterEgg, true);   
}

function drawBackgrounds(eventNumber) {
    //white screen transition
    if (eventNumber==36 || eventNumber==1016) ctx.globalAlpha=1;

    if(eventNumber >= 10 && eventNumber <= 36) {
        ctx.drawImage(yamatobg, 0,0, canvas.width, canvas.height);
        ctx.drawImage(yamato,canvas.width/2-417,canvas.height-740,yamato.width*2, yamato.height*2);
    }
    else if (eventNumber >= 1001 && eventNumber <= 1002) {
        ctx.fillStyle = red;
        ctx.fillRect(0, 0, canvas.width, canvas.height); 
        ctx.save();
        ctx.rotate(-((new Date().getTime() / 1000)%360) + Math.PI/2.0);
        ctx.drawImage(swirl,-swirl.width*1.5,-swirl.height*1.5,1280*3,1280*3);
        ctx.restore();
    } 
    else if (eventNumber >= 1003 && eventNumber <= 1016) {
        ctx.fillStyle = black;
        ctx.fillRect(0, 0, canvas.width, canvas.height); 
        ctx.drawImage(deltarun,0,0,deltarun.width*2.4,deltarun.height*2.7);
    }

    //check if it is a Visual Novel sequence, if so, draw Bidoof
    if (eventNumber >= 1002 && eventNumber <= 1016) {
        drawActor(0, bidoof, 0);
    }
}

var blue = "rgba(20,20,200,1)";
var black = "rgba(30,30,30,1)";
var white = "rgba(255,255,255,1)";
var red = "rgba(200,20,20,1)";

var text = [
    //0
    ["NO! YOU CAN'T! STOP, PLEASE!",
        "*pant* *pant* *pant*",
        "YOU HAVE NO IDEA WHAT YOU'RE DOING!",
        "I BEG OF YOU, IT'S NOT ABOUT ME, IT'S ABOU-"],
    //1    
    ["t h e   g r o u n d    t r e m b l e s   . . ."],
    //2
    ["then the whole world turned to white and nothing remained.",
        "...",
        "...",
        "..."
    ],
    //3
    ["You've really done it this time."],
    //4
    ["Though, to be honest, can't say I'm surprised. You're the ultimate moron, after all.",
    "Who am I doesn't matter at this point.",
    "What matters is that I know you, and...",
    "Everyone is dead.",
    "The humanity is EXTINCT!",
    "And it's all because of you.",
    "...",
    "Worry not, however.",
    "There is still something I can do with my amazingly amazing skills~",
    "Using my mystical powers can send you back to one minutes before death!",
    "Well, it used to be something different, but then the monetary cuts took those three extra minutes from us and they did not even pay us to change 'minutes' back into singular, blah blah blah.",
    "But hey, it's legit! I-it's definitely not a hoax, trust me!",
    "Once I will send you one minutes before death... I'll want you to do one thing.",
    "Prevent this gigantic explosion you've caused and never return back to it again...",
    "Can I trust you on this?",
    ".",
    "..",
    "...",
    "....",
    "Wow, you're amazingly talkative, boi!",
    "Aw screw this, there's only one way to fix humanity at this point, I'll trust you then!",
    "Commencing operation... Here... WE... GOOOOOOO~"],
    //5
    ["Yamato Perpetual Reactor, one minutes before death."],
    //6
    ["Who are you...?",
    "How dare you even speak to me, you lowlife creature!",
    "Such a hideous face... Those god-awful fangs... It looks like mighty lord Arceus has forgotten about you.",
    "Or maybe he still remembers you... grinning to himself!",
    "Get out of my sight, I don't even want to see you."],
    //7
    ["Mighty Giratina, the strongest guardian, and yet he failed to protect the facility from a single rampage Bidoof...",
    "But no matter what have you done, you're in control of yourself now and I'm sure this disaster won't repeat!",
    "Please, don't nuke the Yamato Reactor this time. I can cast divine power upon thee to prevent this abnormality.",
    "Just wait for the right opportunity..."],
    //8
    ["NOW! Strike where it hurts!",
    "Look at the bottom of the screen right now..."],
    //9
    ["You've got two buttons, 'Move' and 'Strike!'",
    "Move is like a Menu screen where you can toggle between different attacks to strike your opponent.",
    "'Strike!' on the other hand uses that move on an opponent and depending on the attack you have chosen before, can have various side effects.",
    "For now you don't have any moves yet...",
    "I mean, besides your teeth...",
    "So I'm going to grace you with your first move that you're going to use to annihilate Giratina in a way that will, uh...",
    "...'tire you out'...",
    "...and that will stop the world from being nuked to oblivion thanks to that Yamato Reactor over there...",
    "No need to be scared... I think...",
    "Anyway, there you go!"],
    //10
    ["Good enough, this should do. Now head on to the Move menu..."],
    //11
    ["See, was it that hard? Time to kick some asses, press 'Okay!' and move to 'Strike!'"],
    //12
    ["...what...",
    "...was...",
    "...that..."],
    //13
    ["OUCH!",
    "That looked painful...",
    "Hope he's okay though...",
    "...",
    "Oh well, who cares about Bidoofs anyway. Good thing I've stopped the world exploding, heh!",
    "hehehehe!",
    "HEHEHEHEHHEHEHEHEHEH!",
    "HEEEEEEEEEEEHEHEHEH*cough* *cough*",
    "I shouldn't laugh like a maniac, it's not good for my throat..."],

    //14
    ["Oh boi, you're clicking your keyboard too much.",
    "Yes, there was an Easter Egg, though this one only works with devices that use keyboard...",
    "Anyway...",
    "...",
    "I've been looking at the list of Spirits in Smash Ultimate and... Uhh...",
    "You're not there!",
    "Haha, you're a laughing stock, man, ahahaha!!!",
    "Well, I'm not in Smash Ultimate too, but that's besides the point.",
    "Please ask Sakurai to add us in, man!",
    "I guess since you've went through all the way to get to this screen you'd like to know who I am, huh?",
    "Alright, the wish can be granted!",
    "This is not canon, by the way, so don't feel bad if you find out my true form.",
    "In order for you to see my true form, I need to add you to a..."],

    //15
    ["Lancer Fun Gang!",
    "I'm Sans Deltarune, remember me?"],
    
    //16
    ["It's spelled with a 'L', then an 'a', then 'n', then 's'... Wait, that's hard."],
    //17
    ["Does it even remotely matter though???",
    "Just look it up above the textbox, Szymbar must have written it there!!!",
    "I've been a part of this game ever since 1996 when the Harry Potter series started..."],

    //18
    ["Wait, that was Nagini.",
    "And she wasn't a part of this game.",
    "yikes.",
    "Well does it really matter?"],
    //19
    ["THING IS!!!",
    "Me and you make a fun pair together, you know?",
    "I have a feeling we have a lot in common!"],
    //20
    ["Other than not being in Smash Bros..."],
    //21
    ["I feel you man, our fates are interwined, methinks."],
    //22
    ["Int...wer...tined?",
    "Intertined?"],
    //23
    ["ralsei says it's INTERMINED."],
    //24
    ["Ahahaha! That's definitely this!"],
    //25
    ["Man it feels good to waste your time here.",
    "I mean, you've got nothing else to do anyway.",
    "I think you're dead again...",
    "What kind of hero you are?",
    "A hero that constantly dies?",
    "That's simply depressing..."],
    //26
    ["I wish you were at least a tiny bit as cool as I am.",
    "Then you'd be in every version of Smash Bros, including Project M, Brawlhalla and Pokemon Go too.",
    "And people would mod you to Garry's Mod, Left Cztery Dead... You know, all the cancerous games."],
    //27
    ["So, uh.",
    "...",
    ".....",
    ". . . . .",
    "yeah thats it see you 2028 bye loser"],

    ];

function mainLoop() {
    if (ctx != undefined) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);       
        checkAudio();      
        drawBackgrounds(eventNumber);

        switch(eventNumber) {
            case 0:
                //background color
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                printText(black, text[0], 0);
                break;
            case 1:
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                printText(blue, text[1], 0);
                break;
            case 2: {
                var randomNumber = Math.random()*10-5;
                ctx.drawImage(explosion, randomNumber, randomNumber, canvas.width, canvas.height);  
                if (audio.paused) audio.play();
                fadeToColor(white, 30, 0.005);
                ctx.globalAlpha=1;
                break;
            }
            case 3:
                printText(blue, text[2], 0);
                break;
            case 4:
                ctx.globalAlpha = 0;
                fadeToColor(red, 10, 0.01);
                ctx.save();
                ctx.globalAlpha=fadeTimer/110;
                //ctx.translate(swirl.width,swirl.height);
                ctx.rotate(-((new Date().getTime() / 1000)%360) + Math.PI/2.0);
                //ctx.translate(-swirl.width,-swirl.height);
                ctx.drawImage(swirl,-swirl.width*1.5,-swirl.height*1.5,1280*3,1280*3);
                ctx.restore();
                break;
            case 5:
                ctx.fillStyle = red;
                ctx.fillRect(0, 0, canvas.width, canvas.height); 
                ctx.save();
                ctx.rotate(-((new Date().getTime() / 1000)%360) + Math.PI/2.0);
                ctx.drawImage(swirl,-swirl.width*1.5,-swirl.height*1.5,1280*3,1280*3);
                ctx.restore();
                printText(black, text[3], 0);
                break;
            case 6: 
                ctx.fillStyle = red;
                ctx.fillRect(0, 0, canvas.width, canvas.height); 
                ctx.save();
                ctx.rotate(-((new Date().getTime() / 1000)%360) + Math.PI/2.0);
                ctx.drawImage(swirl,-swirl.width*1.5,-swirl.height*1.5,1280*3,1280*3);
                ctx.restore();
                actorFadeTimer++;
                drawActor(0, bidoof, 1);
                drawActor(1, substitute, 1);
                if (timeRewind.paused) timeRewind.play();
                break;
            case 7:
                ctx.fillStyle = red;
                ctx.fillRect(0, 0, canvas.width, canvas.height); 
                ctx.save();
                ctx.rotate(-((new Date().getTime() / 1000)%360) + Math.PI/2.0);
                ctx.drawImage(swirl,-swirl.width*1.5,-swirl.height*1.5,1280*3,1280*3);
                ctx.restore();
                drawActor(0, bidoof, 0);
                drawActor(1, substitute, 0);
                textBlob("???", 1, 0);
                printText(black, text[4], 0);
                break;
            case 8:
                ctx.globalAlpha=1;
                ctx.fillStyle = red;
                ctx.fillRect(0, 0, canvas.width, canvas.height); 
                ctx.save();
                ctx.rotate(-((new Date().getTime() / 1000)%360) + Math.PI/2.0);
                ctx.drawImage(swirl,-swirl.width*1.5,-swirl.height*1.5,1280*3,1280*3);
                ctx.restore();
                drawActor(0, bidoof, 0);
                drawActor(1, substitute, 0);
                fadeToColor(white, 10, 0.02);
                timeRewind.pause();
                timeRewind.currentTime = 0;
                if (go.paused) go.play();
                break;
            case 9:
                textBoard(black, "one minutes before death", "");
                break;
            case 10:
                if(chasers.paused) chasers.play();
                fadeToColor(black, 0, 0.03);
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*0.7, 380, 0);
                break;
            case 11:
                printText(blue,text[5], 1);
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*0.7, 380, 0);
                break;
            case 12:
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*0.7, 380, 0);
                printText(black,text[6], 1);
                textBlob("Giratina",1,1);
                break;
            case 13:
                if (!timeoutActive) timeout(500);
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*0.7, 380, 0);
                break;
            case 14:
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*0.7, 380, 0);
                printText(black, text[7], 1);
                textBlob("???",0,1);
                break;
            case 14:
                if (!timeoutActive) timeout(1500);
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*0.7, 380, 0);
                break;
            case 15:
                if (!timeoutActive) timeout(3000);
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                moveOverworld(giratina, canvas.width*0.7, 380, 0, canvas.width*0.8, 2200);
                break;
            case 16:
                if (!timeoutActive) timeout(500);
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*1.1, 380, 1);
                break;
            case 17:
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*1.1, 380, 1);
                printText(black, text[8], 1);
                textBlob("???",0,1);
                break;
            case 18:
                if (!timeoutActive) timeout(1000);
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*1.1, 380, 1);
                drawHUD(0);
                break;
            case 19:
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*1.1, 380, 1);
                drawHUD(0);
                printText(black, text[9], 1);
                textBlob("???",0,1);
                break;
            case 20:
                chasers.pause();
                if(fanfare.paused) fanfare.play();
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*1.1, 380, 1);
                drawHUD(0);
                unlockSkill(0);
                break;
            case 21:
                fanfare.pause();
                if(chasers.paused) chasers.play();
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*1.1, 380, 1);
                drawHUD(0);
                printText(black, text[10], 1);
                textBlob("???",0,1);
                break;
            case 22:
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*1.1, 380, 1);
                drawHUD(1);
                buttonsClickable[0]=true;
                if (drawMenu) loadMenu();
                if (activeButton!=-1) {
                    printText(black, text[11], 1);
                    textBlob("???",0,1);
                }
                break;
            case 23:
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*1.1, 380, 1);
                buttonsClickable[0]=false;
                if (drawMenu) {
                    loadMenu();
                    drawHUD(0);
                }
                if (!drawMenu) {
                    buttonsClickable[1]=true;
                    drawHUD(2);
                }
                break;
            case 24:
                drawOverworld(bidoof, canvas.width*0.2, 550, 1);
                drawOverworld(giratina, canvas.width*1.1, 380, 1);
                useMove();
                break;
            case 25:
                if (!timeoutActive) timeout(500);
                moveOverworld(bidoof, canvas.width*0.2, 550, 1, canvas.width*0.205, 500);
                drawOverworld(giratina, canvas.width*1.1, 380, 1);
                break;
            case 26:
                if (!timeoutActive) timeout(1500);
                drawOverworld(bidoof, canvas.width*0.205, 550, 1);
                drawOverworld(giratina, canvas.width*1.1, 380, 1);
                break;
            case 27:
                if(chasers.paused) chasers.play();
                drawOverworld(bidoof, canvas.width*0.205, 550, 1);
                drawOverworld(giratina, canvas.width*0.8, 380, 0);
                printText(black, text[12], 1);
                textBlob("Giratina",1,1);
                break;
            case 28:
                if (!timeoutActive) timeout(1500);
                drawOverworld(bidoof, canvas.width*0.205, 550, 1);
                drawOverworld(giratina, canvas.width*0.8, 380, 0);
                break;
            case 29:
                if (!timeoutActive) timeout(500);
                drawOverworld(bidoof, canvas.width*0.205, 550, 1);
                drawOverworld(giratina, canvas.width*1.1, 380, 1);
                break;
            case 30:
                if (!timeoutActive) timeout(1000);
                drawOverworld(bidoof, canvas.width*0.205, 550, 1);
                moveOverworld(giratina, canvas.width*1.1, 380, 1, canvas.width*1.5, 1000);
                break;
            case 31:
                if (!timeoutActive) timeout(250);
                drawOverworld(bidoof, canvas.width*0.205, 550, 1);
                moveOverworld(giratina, canvas.width*1.5, 380, 0, canvas.width*0.1, 250);
                break;
            case 32:
                if (oof.paused) {
                    oof.currentTime = 0.400;
                    oof.play();
                }
                if (!timeoutActive) timeout(800);
                moveOverworld(bidoof, canvas.width*0.205, 550, 1, canvas.width*(-0.5),500);
                drawOverworld(giratina, canvas.width*0.1, 380, 0);
                break;
            case 33:
                if (!timeoutActive) timeout(500);
                drawOverworld(giratina, canvas.width*0.1, 380, 0);
                break;
            case 34:
                chasers.pause();
                drawOverworld(giratina, canvas.width*0.1, 380, 0);
                printText(black, text[13], 1);
                textBlob("???",0,1);
                break;
            case 35:
                if (!timeoutActive) timeout(500);
                drawOverworld(giratina, canvas.width*0.1, 380, 0);
                break;
            case 36:
                if (go.paused) {
                    go.currentTime=0;
                    go.play();
                }
                ctx.globalAlpha=1;
                drawOverworld(giratina, canvas.width*0.1, 380, 0);
                fadeToColor(white, 10, 0.02);
                break;
            case 37:
                textBoard(black, "bidoof clicker: apocalypse edition","coming eventually");
                window.addEventListener("keypress", easterEgg, false );
                break;
            case 1000:
                ctx.globalAlpha = 0;
                fadeToColor(red, 10, 0.01);
                ctx.save();
                ctx.globalAlpha=fadeTimer/110;
                ctx.rotate(-((new Date().getTime() / 1000)%360) + Math.PI/2.0);
                ctx.drawImage(swirl,-swirl.width*1.5,-swirl.height*1.5,1280*3,1280*3);
                ctx.restore();
                break;
            case 1001: 
                actorFadeTimer++;
                drawActor(0, bidoof, 1);
                drawActor(1, substitute, 1);
                break;
            case 1002:
                drawActor(1, substitute, 0);
                textBlob("???", 1, 0);
                printText(black, text[14], 0);
                break;
            case 1003:
                drawActor(1, sansDeltarune[0], 0);
                textBlob("Lancer", 1, 0);
                if (lancer.paused) lancer.play();
                printText(black, text[15], 0);
                break;
            case 1004:
                drawActor(1, sansDeltarune[1], 0);
                textBlob("Lancer", 1, 0);
                printText(black, text[16], 0);
                break;
            case 1005:
                drawActor(1, sansDeltarune[2], 0);
                textBlob("Lancer", 1, 0);
                printText(black, text[17], 0);
                break;
            case 1006:
                drawActor(1, sansDeltarune[0], 0);
                textBlob("Lancer", 1, 0);
                printText(black, text[18], 0);
                break;
            case 1007:
                drawActor(1, sansDeltarune[2], 0);
                textBlob("Lancer", 1, 0);
                printText(black, text[19], 0);
                break;
            case 1008:
                drawActor(1, sansDeltarune[1], 0);
                textBlob("Lancer", 1, 0);
                printText(black, text[20], 0);
                break;
            case 1009:
                drawActor(1, sansDeltarune[2], 0);
                textBlob("Lancer", 1, 0);
                printText(black, text[21], 0);
                break;
            case 1010:
                drawActor(1, sansDeltarune[1], 0);
                textBlob("Lancer", 1, 0);
                printText(black, text[22], 0);
                break;
            case 1011:
                drawActor(1, sansDeltarune[1], 0);
                drawActor(1, sansDeltarune[3], 0);
                textBlob("Susie", 1, 0);
                printText(black, text[23], 0);
                break;
            case 1012:
                drawActor(1, sansDeltarune[0], 0);
                textBlob("Lancer", 1, 0);
                printText(black, text[24], 0);
                break;
            case 1013:
                drawActor(1, sansDeltarune[1], 0);
                textBlob("Lancer", 1, 0);
                printText(black, text[25], 0);
                break;
            case 1014:
                drawActor(1, sansDeltarune[0], 0);
                textBlob("Lancer", 1, 0);
                printText(black, text[26], 0);
                break;
            case 1015:
                drawActor(1, sansDeltarune[2], 0);
                textBlob("Lancer", 1, 0);
                printText(black, text[27], 0);
                break;
            case 1016:
                lancer.pause();
                if (go.paused) {
                    go.currentTime=0;
                    go.play();
                }
                ctx.globalAlpha=1;
                drawActor(1, sansDeltarune[2], 0); 
                fadeToColor(white, 10, 0.02);
                break;
            case 1017:
                textBoard(black, "bidoof clicker: apocalypse edition 2","coming possibly never let it die plz");
                break;
        }
    }
}