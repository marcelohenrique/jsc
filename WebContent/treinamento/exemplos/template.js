/* ### */
/* classe de template. Poderia ser biblioteca, ficar em outro js, etc. */
/* ### */
function CoberturaModel(tr) {

	tr.modelo = this;/* registrando em lugar conhecido */

	/* ajuste no id do clone */
	tr.id += new Date().getTime();

	/* probing no conteiner/subarvore */
	var inputs = tr.getElementsByTagName("input");
	var selects = tr.getElementsByTagName("select");
	var buttons = tr.getElementsByTagName("button");

	var dsc = inputs[0];
	var check = inputs[1];
	var combo = selects[0];
	var valor = inputs[2];
	var remove = buttons[0];

	/* dado de modelo */
	this.cobertura = {
		dsc : "",
		val : 0,
		chk : false,
		cmb : ""
	};

	/* funções utilitárias */
	this.update = function() {
		/* TODO validações foram suprimidas */
		this.cobertura.dsc = dsc.value;
		this.cobertura.val = valor.value;
		this.cobertura.chk = check.checked;
		this.cobertura.cmb = combo.value;
	};
	
	this.reset = function() {
		dsc.value = this.cobertura.dsc;
		valor.value = this.cobertura.val;
		check.checked = this.cobertura.chk;
		combo.value = this.cobertura.cmb;
	};

	/* eventos */
	remove.onclick=function(){
		tr.parentNode.removeChild(tr);
		if(this.onremoveModelo)/* permitindo um observador ser notificado */
			this.onremoveModelo();
	};
}
/*
 *###
 * script da página. realmente uma coisa a parte, pois a classe acima pode 
 * funcionar muito bem como biblioteca se essa tela se repetir em outro lugar.
 *###
 */

/* referencias ao documento */
var tgt = document.getElementById("target");
var tpl = document.getElementById("template");
var nww = document.getElementById("nova");

/* eventos */
nww.onclick=function(){
	var linha = tpl.cloneNode(true);
	tgt.appendChild(linha);
	new CoberturaModel(linha);
	/* não guardamos referencia, mas ele está sob tr.model */
};