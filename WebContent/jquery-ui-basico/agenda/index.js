//mesma agenda de antes, usando features do jquery-ui
var nme = $("#nme");
var end = $("#end");
var tel = $("#tel");
// tabela
var tab = $("#tab");
// lista de contatos
var contatos = [];
// contat selecionado
var selecionado = {
	id : -1
};
// dwr TableModel
var cols = [//
function(data) {
	return data.nome;
}, function(data) {
	return data.endereco;
}, function(data) {
	return data.telefone;
}, function(data) {
	return data.timestamp;
} ];
var tboptions = {
	rowCreator : function(op) {
		var x = $("<tr class='" + ((op.rowIndex % 2 == 0) ? //
		"ui-state-highlight" : "") + "'>");
		x[0].contato = contatos[op.rowIndex];
		x.click(function() {// mesma técnica, usando jQuery
			selecionado = x[0].contato;
			nme.val(selecionado.nome);
			end.val(selecionado.endereco);
			tel.val(selecionado.telefone);
		});
		return x[0];
	}
};
// funções utilitárias
function clear() {
	selecionado = {
		id : -1
	};
	$("input").each(function() {
		this.value = "";
	});
	update();
}
function validate() {
	if (nme.val() == "")
		throw new Error("Informe nome");
	if (nme.val() == "")
		throw new Error("Informe endereço");
	if (nme.val() == "")
		throw new Error("Informe telefone");
}
function update() {
	Agenda.getContatos({
		callback : function(ret) {
			contatos = ret;
			dwr.util.removeAllRows(tab[0]);
			dwr.util.addRows(tab[0], contatos, cols, tboptions);
		}
	});
}
// eventos e customizações básicas
$("#dlg").dialog({
	width : "640",
	height : "480",
	buttons : {
		Limpar : clear,
		Excluir : function() {
			Agenda.excluiContato(selecionado, {
				callback : function() {
					contatos = $.grep(contatos, function(x) {
						return x.id != selecionado.id;
					});
					clear();
				}
			});
		},
		Salvar : function() {
			try {
				validate();
				selecionado.nome = nme.val();
				selecionado.endereco = end.val();
				selecionado.telefone = tel.val();
				Agenda.salvarContato(selecionado, {
					callback : function(ret) {
						clear();
					}
				});
			} catch (e) {
				alert(e);
			}
		}
	}
});
// ajuste básico
update();