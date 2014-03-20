//cria o mundo
var worldAABB = new b2AABB();
worldAABB.minVertex.Set(0, 0);
worldAABB.maxVertex.Set(640, 380);
var gravity = new b2Vec2(0, 300);
var doSleep = true;
var world = new b2World(worldAABB, gravity, doSleep);

//cria uma caixa sem densidade pra servir de conteiner
var groundBd = new b2BodyDef();
groundBd.friction = 0.6;
groundBd.position.Set(0, 0);

//chão
var groundSd = new b2BoxDef();
groundSd.extents.Set(640, 10);
groundSd.friction = 0.4;
groundSd.localPosition.Set(0, 380);
groundBd.AddShape(groundSd);

//parede esquerda
groundSd = new b2BoxDef();
groundSd.extents.Set(10, 380);
groundSd.friction = 0.4;
groundSd.localPosition.Set(0, 0);
groundBd.AddShape(groundSd);

//parede direita
groundSd = new b2BoxDef();
groundSd.extents.Set(10, 380);
groundSd.friction = 0.4;
groundSd.localPosition.Set(630, 0);
groundBd.AddShape(groundSd);

//teto
groundSd = new b2BoxDef();
groundSd.extents.Set(640, 10);
groundSd.friction = 0.4;
groundSd.localPosition.Set(0, 0);
groundBd.AddShape(groundSd);

//realizando o corpo
var groundBody = world.CreateBody(groundBd);

//cria um círculo
var circleSd = new b2CircleDef();
circleSd.density = 1.0;
circleSd.radius = 50;
circleSd.friction = 0.4;
circleSd.restitution = 0.3;
var circleBd = new b2BodyDef();
circleBd.AddShape(circleSd);
circleBd.position.Set(75,75);
var circleBody1 = world.CreateBody(circleBd);
circleBd.position.Set(275,75);
var circleBody2 = world.CreateBody(circleBd);

var caixaSd = new b2BoxDef();
caixaSd.density= 1.0;
caixaSd.extents.Set(30, 30);
caixaSd.friction = 0.4;
var caixaBd = new b2BodyDef();
caixaBd.position.Set(490,20);
caixaBd.AddShape(caixaSd);
var caixaBody1 = world.CreateBody(caixaBd);

var timeStep = 1.0/30;

var c1 = document.getElementById("c1");
var ctx = c1.getContext("2d");
var dbg = document.getElementById("dbg");

var interv = setInterval(function(){
	//try{
	//limpa canvas
	ctx.clearRect(0,0,c1.width,c1.height);
		
	//desenhando a caixa do mundo
	ctx.strokeRect(0,370,c1.width,10);
	ctx.strokeRect(0,0,10,c1.height);
	ctx.strokeRect(0,0,c1.width,10);
	ctx.strokeRect(630,0,10,c1.height);
	

	//pega as position e rotation todas
	var pos1 = groundBody.GetOriginPosition();
	var pos2 = circleBody1.GetOriginPosition();
	var r2 = circleBody1.GetRotation();
	var pos3 = circleBody2.GetOriginPosition();
	var r3 = circleBody2.GetRotation();
	var pos4 = caixaBody1.GetOriginPosition();
	var r4 = caixaBody1.GetRotation();
	
	//desenhando o circulo 1
	ctx.save();
	ctx.beginPath();
	ctx.translate(pos2.x,pos2.y);
	ctx.rotate(r2);
	ctx.arc(0,0,circleSd.radius,0,Math.PI*2,true);
	ctx.lineTo(0,0);
	ctx.stroke();
	ctx.restore();

	//desenhando o circulo 2
	ctx.save();
	ctx.beginPath();
	ctx.translate(pos3.x,pos3.y);
	ctx.rotate(r3);
	ctx.arc(0,0,circleSd.radius,0,Math.PI*2,true);
	ctx.lineTo(0,0);
	ctx.stroke();
	ctx.restore();

	//desenhando a caixa
	ctx.save();
	ctx.translate(pos4.x,pos4.y);
	ctx.rotate(r4);
	ctx.strokeRect(-30,-30,60,60);
	ctx.restore();
	
	//fazendo o mundo rodar
	world.Step(1/30.0,1);
	//}catch(e){
	//	clearInterval(interv);
	//	throw e;
	//}
}, 30);


c1.onclick=function(evt){
	var x = evt.layerX;
	var y = evt.layerY;
	dbg.innerHTML="x: "+x+" y: "+y;
	circleBody1.SetOriginPosition({"x":x,"y":y},0);
};