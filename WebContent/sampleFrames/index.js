
// elementos de tela
var divTopo = document.getElementById("topo");
var divLado = document.getElementById("lado");
var divCaminho = document.getElementById("caminho");
var aguarde = document.getElementById("aguarde");

// refer�ncia ao frame
var frameCentro = window.frames["centro"];

// conteiner de links
var linksNav = divTopo.getElementsByTagName("a");

// nomes locais
var inicio = linksNav[0];
var wizard = linksNav[1];
var popuplike = linksNav[2];
var subcontexto = linksNav[3];
var navegacao = linksNav[4];

//snippets comentando o exemplo apresentado
var topics = divCaminho.getElementsByTagName("p");

//helper
function someAguarde(){
	aguarde.style.visibility="hidden";
}


// eventos
inicio.onclick=function(){
	aguarde.style.visibility="visible";
	divCaminho.innerHTML+="In�cio > ";
};
wizard.onclick=function(){
	aguarde.style.visibility="visible";
	divCaminho.innerHTML+="Wizard > ";
};
popuplike.onclick=function(){
	aguarde.style.visibility="visible";
	divCaminho.innerHTML+="Pop-Up-Like > ";
};
subcontexto.onclick=function(){
	aguarde.style.visibility="visible";
	setTimeout(function(){
		aguarde.style.visibility="hidden";	
	},5000);
	divCaminho.innerHTML+="Subcontexto > ";
};
navegacao.onclick=function(){
	aguarde.style.visibility="visible";
	divCaminho.innerHTML+="Navega��o > ";
};

//centro.onload=function(){
//	aguarde.style.visibility="hidden";
//};