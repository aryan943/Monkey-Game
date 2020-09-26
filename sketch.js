var monkey , monkey_running , monkey_rest;
var banana ,bananaImage; 
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var invisibleground;
var ground,groundImage;
var END=0;
var PLAY=1;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  groundImage = loadImage("forest.jpg");
  monkey_rest = loadImage("sprite_2.png");
 
 
}



function setup() {
createCanvas(400,350);  
  
monkey = createSprite(100,250);
monkey.addAnimation("running",monkey_running); 
monkey.addAnimation("rest",monkey_rest);  
monkey.scale=0.15;

invisibleground = createSprite(300,310,600,10);
  
ground = createSprite(300,170,30,30);
ground.addImage(groundImage);  
 
obstacleGroup = createGroup();   
  
ground.velocityX=-4  
score=0;  
}


function draw() {
background(220);
 if(gameState===PLAY){ 
  
score = score + Math.round(getFrameRate()/60);
   
invisibleground.visible=false;  

monkey.velocityY=monkey.velocityY+0.5;  
   
if(keyDown("space")&& monkey.y>180){
   
monkey.velocityY=-10;
}
if (ground.x < 80){
  ground.x = ground.width/2;
}

spawnobstacles();  
spawnBanana();      
   
monkey.depth=ground.depth;
monkey.depth=monkey.depth+1;
   

if(obstacleGroup.isTouching(monkey)){

gameState = END;  
 
}   
if (monkey.isTouching(banana)){
banana.destroy();
}   
 }
else if(gameState===END){
  
obstacleGroup.destroyEach();
banana.destroy();  
ground.velocityX = 0;  
monkey.changeAnimation("rest",monkey_rest); 
monkey.velocityY=0;  
  
if(keyDown("r")){

reset();
}  
        
}
  monkey.collide(invisibleground);
  
  monkey.setCollider("circle",0,0,300);
  monkey.debug = true
  
  drawSprites();    
  
  if(gameState===END){
  text("Press r To Restart",270,300)
  }
  fill("white");
  text("survival time:"+score,170,50);
  
}

function spawnobstacles(){
if(frameCount%80===0){
   
  
obstacle = createSprite(400,270,50,50);
obstacle.addImage(obstacleImage);
  
obstacle.scale = 0.15; 
obstacle.velocityX=-5; 
obstacle.lifetime=87; 
 
  obstacleGroup.add(obstacle);
}
}
function reset(){

gameState=PLAY;  
monkey.changeAnimation("running",monkey_running);
ground.velocityX=-4; 
score=0;  
}
function spawnBanana(){

if(frameCount%80===0){

var rando = Math.round(random(100,200));  
banana = createSprite(410,rando,20,20);
banana.addImage(bananaImage);
banana.scale=0.1;  
banana.velocityX=-5; 

}       

}