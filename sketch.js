var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
var backgroundIMG, backgrounds;
var human, humanImg;
var basket, basketImg;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
	backgroundIMG = loadImage("background.jpg");
	humanImg = loadImage("human.png");
	basketImg = loadImage("basket.png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	groundSprite=createSprite(width/2, height-95, width,10);
	groundSprite.shapeColor=color(255)
	groundSprite.visble=false;

	backgrounds=createSprite(400, 450, 800, 700);
	backgrounds.addImage(backgroundIMG);
	backgrounds.scale=4;

	human=createSprite(-630,600,40,40);
	human.addImage(humanImg);
	human.scale=0.4;
	
	basket=createSprite(400,600,30,30);
	basket.addImage(basketImg);
	basket.scale=0.1;

	packageSprite=createSprite(400, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2
	

	helicopterSprite=createSprite(-170, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6;

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.6, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true, visible:false} );
 	World.add(world, ground);


	Engine.run(engine);	
	//Matter.Body.setVelocity(helicopterSprite,{x:3, y:0});
  
}


function draw() {
  Engine.update(engine);
  rectMode(CENTER);
  background(40);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  helicopterSprite.velocityX=4;
  
  if(helicopterSprite.y===200){
	 packageSprite.x=helicopterSprite.x;
	}

  if(basket.isTouching(packageSprite)){
	  packageSprite.y=565;
	  helicopterSprite.velocityX=0;
  } 

  if(human.isTouching(basket)){
	  basket.y=530;
	  packageSprite.y=495;
	  helicopterSprite.velocityX=10;
	  basket.velocityX=10;
  }

  if(packageSprite.y>640){
	  helicopterSprite.y=201;
  }

  drawSprites();
 keyPressed();
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
	Matter.Body.setStatic(packageBody, false);
	human.velocityX=10;
  }
}



