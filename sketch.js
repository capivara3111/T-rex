var trex;
var trexCorrendo;
var trexMorto
var imagemchao;
var chaoInvisivel;
var chao;
var imagemNuvem
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6;
var pontos = 0
var estadoDeJogo = 'jogando'
var grupoDeCactos,grupoDeNuvens
var gameOver,gameOverImage
var restart, restartImage
var pulo, morte, checkPoint ;


function reset (){
  estadoDeJogo = 'jogando'
  grupoDeCactos.destroyEach()
  grupoDeNuvens.destroyEach()
  gameOver.visible = false
  restart.visible = false
  trex.changeAnimation('correndo', trexCorrendo)
   pontos = 0
}


function crianuvem () {

  if(frameCount%60 === 0 ){
    var nuvem = createSprite(650,50,60,10);
  nuvem.velocityX = -2
  nuvem.y =  Math.round(random(0,120))
  nuvem.addImage(imagemNuvem)
  nuvem.scale = 0.7
   nuvem.depth = trex.depth
   trex.depth = trex.depth +1
    nuvem.lifetime = 350
    grupoDeNuvens.add(nuvem)
     }
}

function cactos(){
  if(frameCount%40 === 0 ){
    var cacto = createSprite (650,180,10,30)
    cacto.velocityX = -(7+pontos/100)
    var tipo = Math.round(random(1,6))
    cacto.scale = 0.6
    cacto.lifetime = 600
    switch(tipo){ 
        case 1: cacto.addImage(cacto1)
        break
        case 2: cacto.addImage(cacto2)
        break
        case 3: cacto.addImage(cacto3)
        break
        case 4: cacto.addImage(cacto4)
        break
        case 5: cacto.addImage(cacto5)
        break
        case 6: cacto.addImage(cacto6)
        break
        
        default:break
    }
    grupoDeCactos.add(cacto)
}
    
  }
    

// funcao que precarrega
function preload() {
  trexCorrendo = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexMorto = loadAnimation('trex_collided.png')
  
  imagemchao = loadImage('ground2.png')
  imagemNuvem = loadImage('cloud.png')
  
  
  cacto1 = loadImage('obstacle1.png')
  cacto2 = loadImage('obstacle2.png')
  cacto3 = loadImage('obstacle3.png')
  cacto4 = loadImage('obstacle4.png')
  cacto5 = loadImage('obstacle5.png')
  cacto6 = loadImage('obstacle6.png')
  
  gameOverImage = loadImage('gameOver.png')
  restartImage = loadImage('restart.png')
  
  pulo = loadSound('jump.mp3')
  morte = loadSound('die.mp3')
  checkPoint = loadSound ('checkPoint.mp3')
}

// funcao que configura
function setup() {
  createCanvas(600,200);
  
  trex = createSprite(50, 160, 20, 40);
  trex.addAnimation("correndo", trexCorrendo);
    trex.addAnimation("Morto", trexMorto);
  trex.debug = false
  trex.setCollider('circle',0,0,40)
  
  chaoInvisivel = createSprite (300,203,600,20)
  chaoInvisivel.visible = false
   
  
  
  chao = createSprite (300,190,600,20)
  chao.addImage(imagemchao)
  chao.x = chao.width/2
  
  grupoDeCactos = new Group()
  
  grupoDeNuvens = new Group()
  
  gameOver = createSprite(300, 50, 50, 50)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.5
  gameOver.visible = false
  restart = createSprite(300, 100, 50, 50)
  restart.addImage(restartImage)
  restart.scale = 0.5
  restart.visible = false
}

// funcao que desenha
function draw(){
  background("white");
  text ('pontuação: '+ pontos, 20,20 )
  

  
  trex.velocityY = trex.velocityY + 0.7;
  trex.collide(chaoInvisivel)
  trex.scale = 0.5

  
  
  drawSprites();
 
  if(estadoDeJogo === 'jogando') {
     pontos = pontos + Math.round(frameRate()/60)
  crianuvem()
  cactos()
    chao.velocityX = -(7+pontos/100)
    
   if (pontos>0 && pontos % 100 === 0 ){
      checkPoint.play()
      }
    
     if(chao.x <0){
     chao.x = chao.width/2
     }
    if(grupoDeCactos.isTouching(trex)){ 
       estadoDeJogo = 'final'
      morte.play()
       }
  
  if (keyDown("space") && trex.y >160 )  {
    trex.velocityY = -10;
    pulo.play()
  }
     }else if(estadoDeJogo === 'final'){
              chao.velocityX = 0 ;
       grupoDeNuvens.setVelocityXEach(0)
       grupoDeCactos.setVelocityXEach(0)
       
       grupoDeNuvens.setLifetimeEach(-1)
       grupoDeCactos.setLifetimeEach(-1)
       trex.changeAnimation('Morto', trexMorto)
         gameOver.visible = true
         restart.visible = true
         if(mousePressedOver(restart)){
           reset()
            }
              }

}
//Ctrl s pra salvar clicar no codigo primeiro