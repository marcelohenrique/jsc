//fields
var nme = document.getElementById("nome");
var end = document.getElementById("endereco");
var tel = document.getElementById("telefone");
// buttons
var salvar = document.getElementById("salvar");
var limpar = document.getElementById("limpar");
var excluir = document.getElementById("excluir");
// view
var tabela = document.getElementById("tcont");
// lista de contatos (model)
var contatos = [];
// contato selecionado (model)
var selecionado = {
	id : -1
};
// dwr TableModel (ligação model com visão)
var model = [//
function(data) {
	return data.nome;
}, function(data) {
	return data.endereco;
}, function(data) {
	return data.telefone;
}, function(data) {
	return data.timestamp;
} ];
var tbOptions = {// dwr util magic
	rowCreator : function(op) {
		var tr = document.createElement("tr");
		if (op.rowIndex % 2)
			tr.className = "par";
		// instance variable
		tr.contato = contatos[op.rowIndex];
		tr.onclick = function() {
			nme.value = tr.contato.nome;
			end.value = tr.contato.endereco;
			tel.value = tr.contato.telefone;
			selecionado = tr.contato;
		};
		return tr;
	}
};
// funções utilitárias
function alertPadrao(e) {
	alert(e);
}
function clear() {
	var l = [ nme, end, tel ];
	for ( var x in l)
		l[x].value = "";
	selecionado = {
		id : -1
	};
}
function update() {
	dwr.util.removeAllRows(tabela);
	Agenda.getContatos( {
		callback : function(lista) {
			contatos = lista;
			dwr.util.addRows(tabela, lista, model, tbOptions);
		},
		errorHandler : alertPadrao
	});
}
function validate() {
	if (nme.value == "")
		throw new Error("Informe nome");
	if (end.value == "")
		throw new Error("Informe endereço");
	if (tel.value == "")
		throw new Error("Informe telefone");
}
// eventos
salvar.onclick = function() {
	try {
		validate();
		selecionado.nome = nme.value;
		selecionado.endereco = end.value;
		selecionado.telefone = tel.value;
		// remoting
		Agenda.salvarContato(selecionado, {
			callback : function() {
				clear();
				update();
			},
			errorHandler : alertPadrao
		});
	} catch (e) {
		alert(e.message);
	}
};
excluir.onclick = function() {
	Agenda.excluiContato(selecionado, {
		callback : function() {
			clear();
			update();
		},
		errorHandler : alertPadrao
	});
};
// referencia direta
limpar.onclick = clear;
// init da tela
update();