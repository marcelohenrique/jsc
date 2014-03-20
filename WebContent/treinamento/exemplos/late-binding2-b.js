/* sanidade da tela */
aguarde.style.display="none";
/* mais do mesmo */
var endereco = document.getElementById("endereco");
endereco.onblur=function(){
	aguarde.style.display="block";
	setTimeout(function(){
		var tag = document.createElement("label");
		tag.innerHTML="Telefone: ";
		modulo.appendChild(tag);
		tag = document.createElement("input");
		tag.id="telefone";
		modulo.appendChild(tag);
		tag = document.createElement("script");
		tag.src='late-binding2-c.js';
		modulo.appendChild(tag);
		endereco.onblur=null;
	},1500);
};
