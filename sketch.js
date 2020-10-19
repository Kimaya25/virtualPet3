var GameState;
var dog,happyDog,database,foodS,foodStock;
var foodObj,lastFed;


function preload()
{
  normal_dog = loadImage("images/dogImg.png");
  happy_dog = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  foodObj = new food();
  FedTime = database.ref("FedTime");
  FedTime.on("value",function(data){
    lastFed = data.val();
  
  })
  dog = createSprite(200,200,50,70);
  dog.addImage(normal_dog);
  dog.scale = 0.1;
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  ReadState = database.ref('GameState')
 ReadState.on("value",function(data){
   GameState = data.val();
 })
  

  

  
}


function draw() {  
background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happy_dog);
  }
  
currentTime = hour();
if(currentTime ==(lastFed + 1)){
  update("Playing")
  foodObj.garden()
}else if(currentTime ==(lastFed +2)){
update("Sleeping")
foodObj.bedroom();
}else if (currentTime > (lastFed+2) && currentTime <= (lastFed+4)){
  update("Bathing")
  foodObj.washroom();
}else{
  update("Hungry")
foodObj.display();
}




  drawSprites();

  print(foodStock);
 

}

function readStock(data){

  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
     x = 0;
    
  }
  else{
    x = x-1;

  }
  database.ref("/").update({
    food:x
  })

}

function update(state){
  database.ref('/').update({
   GameState : state
  })
}



