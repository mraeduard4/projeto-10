var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//pro laser mexer tem que apertar enter e eu não tava conseguindo colocar um texto pra quando o diamante fosse capturado, então eu coloquei um sprite no cantinho e funcionou.

var ladrao = createSprite(25, 375, 15, 15);
ladrao.shapeColor = (54,54,54);

var laser1 = createSprite(150, 300, 200, 5);
laser1.shapeColor = "red";
var laser2 = createSprite(250, 100, 200, 5);
laser2.shapeColor = "red";

var diamante = createSprite(390, 11, 10, 10);
diamante.shapeColor = "LightSeaGreen";

function draw(){
  background("WhiteSmoke");
  condicoes();
  stroke("Teal");
  fill("LightSeaGreen");
  shape(390, 0, 380, 10, 390, 20, 400, 10);
 
 createEdgeSprites();
 laser1.bounceOff(edges);
 laser2.bounceOff(edges);
 ladrao.bounceOff(edges);
  
  drawSprites();
}

function condicoes(){
  
  if (keyDown("enter")) {
    laser1.velocityX = 2;
    laser1.velocityY = -4;
  }
  if (keyDown("enter")) {
    laser2.velocityX = -2;
    laser2.velocityY = 4;
  }
  if (keyDown("up")) {
    ladrao.velocityX = 0;
    ladrao.velocityY = -2;
  }
  if (keyDown("down")) {
    ladrao.velocityX = 0;
    ladrao.velocityY = 2;
  }
  if (keyDown("left")) {
    ladrao.velocityX = -2;
    ladrao.velocityY = 0;
  }
  if (keyDown("right")) {
    ladrao.velocityX = 2;
    ladrao.velocityY = 0;
  }
  if (laser1.isTouching(ladrao) || laser2.isTouching(ladrao)) {
    stroke(0);
    fill(0);
    textSize(24);
    text("LADRÃO CAPTURADO", 75, 200);
    laser1.setVelocity(0,0);
    laser2.setVelocity(0,0);
    ladrao.setVelocity(0,0);
  }
  if (ladrao.isTouching(diamante)) {
    stroke(0);
    fill(0);
    textSize(24);
    text("DIAMANTE CAPTURADO", 50, 200);
    laser1.setVelocity(0,0);
    laser2.setVelocity(0,0);
    ladrao.setVelocity(0,0);
    
  }


}
 


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
