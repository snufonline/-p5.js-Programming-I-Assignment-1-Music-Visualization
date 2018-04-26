// Audio Visualizer - WALDJD1801
// Click the canvas to pause/play ~!
// Computer generated art + data visualization combo

// Media Sources
var deadmau5;
var crash;
var pro1;
var bg01;
var arms;

// UI
var slider;

// Audio data sources
var amp;
var fft;

// Values
var bandW;
var rotation = 2;
var angle = 0;
var e = 5;

// Elements
var square = new Array(1);

function setup() {
  cnv = createCanvas(800, 800);
  frameRate(60);
  slider = createSlider(0, 1, 0.5, 0.01);
  cnv.mousePressed(togglePlaying);
  amp = new p5.Amplitude();
  fft = new p5.FFT(0.8, 1024);
  bandW = width / 64;
  vol = amp.getLevel();
  song.loop();
  song.setVolume(slider.value());
  
//Square array setup
  for (var i = 0; i < square.length; i++) {
    square[1] = (0);
    square[2] = (0);
    square[3] = (0);
    square[4] = (0);
  }
}

function preload() {
  song = loadSound("crash.mp3");
  pro1 = loadImage("p1.png");
 	bg01 = loadImage("bg01.png");
  bg02 = loadImage("bg02.png");
  arms = loadImage("arms.png");
  akuaku = loadImage("aku.png");
}

// Volume Slider
function volumeSlider() {
  song.setVolume(slider.value());
}

// Toggles play / pause 
function togglePlaying() {
  if (!song.isPlaying()) {
  	song.play();
  } else {
		song.pause();
	}
}
  
// Programming 1 Image Pulse
function programming1() {
  var vol = amp.getLevel();
  var diam = map(vol, 0, 1, 50, 250);
  imageMode(CENTER);
	image(pro1, 400, 400, diam * 6, diam * 6);
}

// Waveform behind Programming 1 Image
function waveform() {
 	push();
   stroke(random(100),random(20),random(100));
  	strokeWeight(3);
  	translate(width/2, height/2);
  	beginShape();
  		var spectrum = fft.analyze();
 			
  for (var i = 0; i < spectrum.length; i++) {
  	var angle = map(i, 0, spectrum.length * rotation, 200, 500);
   	var amp = spectrum[i];
    var r = map(amp, 0, 256, 75, 300);
    var x = r * cos(angle);
    var y = r * sin(angle);
    
    if (angle < 349.5 + random(5)) {
      fill(random(0),random(0),random(0));
  	} else {
    	fill(random(50),random(10),random(50));
    }
    
    vertex(x,y);
    rotate(rotation);
    rotation = 2;
    ro = rotation + 2;
  	}
	endShape();
  pop();
}

// Rotating Squares
function ampShape01() {
  var vol = amp.getLevel();
 	var diameter = map(vol, 0, 0.3, 10, 200);
  
  if (vol > 0.25) {
    fill(random(50), random(0), random(50), 240);
  } else {
    fill(0, 0,0);
  }
  
  
  angle = angle + 1 / 30;
  rectMode(CENTER);
  stroke(random(100),random(20),random(100));
  strokeWeight(3);
  
  // TOP LEFT
  push();
  	translate(100, 100);
  		if (vol > 0.15) {
    		rotate(random(angle));
        e = e + 1;
        //square[1] = square[1] + 1
        //square[1] = width - 100;
  		} else {
   		 	rotate(angle)
        e = 5;
      }

  rect(square[1], square[2], diameter, diameter, e, e);
		
  pop();
  
  // BOTTOM RIGHT
  push();
  	translate(700, 700);
  		if (vol > 0.15) {
    		rotate(random(angle));
        e = e + 1;
  		} else {
    		rotate(-angle)
        e = 5;
  		}
		rect(square[3], square[4], diameter, diameter, e, e);
  pop();
  
  // TOP RIGHT
  push();
  	translate(700, 100);
  		if (vol > 0.15) {
    		rotate(random(angle));
        e = e + 1;
  		} else {
    		rotate(-angle)
        e = 5;
  		}
		rect(square[3], square[2], diameter, diameter, e, e);
  pop();
  
  // BOTTOM LEFT
  push();
  	translate(100, 700);
  		if (vol > 0.15) {
    		rotate(random(angle));
        e = e + 1;
  		} else {
    		rotate(angle)
        e = 5;
  		}
		rect(square[1], square[4], diameter, diameter, e, e);
  	pop();
			}

// Sound graph waveform 
function fftShape01() {
  stroke(random(100),random(20),random(100));
  fill(0,0,0);
  var spectrum = fft.analyze();
 
  for (var i = 0; i < spectrum.length; i++) {
  	var amp = spectrum[i];
    var y = map(amp, 0, 512, height, 0);
    rect(i * bandW, y + 600, bandW - 5, height);
  }
}

// Randomly load a background image
function backgroundImages() {
  imageMode(CENTER);
  if (random(1000) > 20) {
  	image(bg01, 0, 0, 1600, 1600);
  } else {
  	image(bg02, 400, 400, 800, 800);
  }
}

function armsImage() {
	imageMode(CENTER);
  image(arms, 400, 400);
}

function aku(){
 	imageMode(CENTER);
  image(akuaku, 400, 400);
}

function draw() {
  backgroundImages();
  fftShape01();
  armsImage();
  aku();
  waveform();
  programming1();
  ampShape01();
  volumeSlider();
  
  
}