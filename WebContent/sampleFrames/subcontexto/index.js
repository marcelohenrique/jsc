//campo da tela
var nme = document.getElementById("nme");
var end = document.getElementById("end");
var tel = document.getElementById("tel");

/**
 * esta função será utilizada pelo subcontexto filho para preencher o formulário
 * mestre
 * 
 * @param d
 *            bean com os atributos nome,endereco e telefone
 */
function fillForm(d) {
	nme.value = d.nome;
	end.value = d.endereco;
	tel.value = d.telefone;
}

// sanando estado inicial
top.someAguarde();