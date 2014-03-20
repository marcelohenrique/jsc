/* contexto de referências inicial. Todos os trechos terão direito a elas */
var aguarde = document.getElementById("aguarde");
var modulo = document.getElementById("modulo");
var nome = document.getElementById("nome");
nome.onblur=function(){
	aguarde.style.display="block";
	setTimeout(function(){
		var tag = document.createElement("label");
		tag.innerHTML="Endereço: ";
		modulo.appendChild(tag);
		tag = document.createElement("input");
		tag.id="endereco";
		modulo.appendChild(tag);
		tag = document.createElement("script");
		tag.src='late-binding2-b.js';
		modulo.appendChild(tag);
		nome.onblur=null;/* desconectando o evento */
	},1500);/* para dar tempo de ver o aguarde */
};