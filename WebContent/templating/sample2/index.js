//tela exemplo de "mestre-detalhe" fazendo uso pesado de templating
var tbMestre = document.getElementById("tb-mestre");
var tbDetalhe = document.getElementById("tb-detalhe");
// campos por contrato
var edit = document.getElementById("edit");
var nme = edit.getElementsByTagName("input")[0];
var end = edit.getElementsByTagName("input")[1];
var tel = edit.getElementsByTagName("input")[2];
var bCancelar = edit.getElementsByTagName("button")[0];
var bSalvar = edit.getElementsByTagName("button")[1];
// linha que iremos clonar pra criar as tabelas
var linhaTemplate = document.getElementById("linha-template");
// dados de exemplo (perfeitamente passíveis de vir do banco/servidor, etc)
// criados no jsp por questões práticas
var dados = [];
// cache da última lista de detalhes
var lastDetalhes = [];
// cache do último bean selecionado.
var selecionado = null;
// utilitário de ariá tabela
function limpaTabela(tb) {
	while (tb.hasChildNodes())
		tb.removeChild(tb.lastChild);
}
// coiso porque pode ser um mestre ou pode ser um detalhe. só de onda.
function editCoiso() {
	if (selecionado) {
		nme.value = selecionado.nome;
		end.value = selecionado.endereco;
		tel.value = selecionado.telefone;
		edit.style.display = "";
	}
}
//o update genérico acobou maior do que um update normal
function updateCoiso() {
	if (selecionado) {
		selecionado.nome = nme.value;
		selecionado.endereco = end.value;
		selecionado.telefone = tel.value;
		edit.style.display = "none";
		limpaTabela(tbDetalhe);
		// XXX não houve como evitar essa "if" porque a tela de editar e
		// genérica;
		if (selecionado.detalhes)
			populaMestre();
		else
			// apelamos para um cache... hum...
			populaDetalhe(lastDetalhes);
		selecionado = null;
	}
}
//preenchedor da tabela de baixo
function populaDetalhe(listaDets) {
	lastDetalhes = listaDets;
	limpaTabela(tbDetalhe);
	var i = -1;
	while (++i < listaDets.length) {
		var linha = linhaTemplate.cloneNode(true);
		tbDetalhe.appendChild(linha);
		linha.dado = listaDets[i];
		var tds = linha.getElementsByTagName("td");
		tds[0].innerHTML = listaDets[i].nome;
		tds[1].innerHTML = listaDets[i].endereco;
		tds[2].innerHTML = listaDets[i].telefone;
		var bts = linha.getElementsByTagName("button");
		// editar
		bts[0].onclick = function() {// this é o botão nesse contexto
			selecionado = this.parentNode.parentNode.dado;
			editCoiso();
		};
		// excluir
		bts[1].onclick = function(e) {
			var i = -1;
			while (++i < listaDets.length) {
				if (listaDets[i] == this.parentNode.parentNode.dado) {
					if (confirm("Excluir linha " + i + "?")) {
						listaDets.splice(i, 1);
						populaDetalhe(listaDets);
						break;
					}
				}
			}
		};
	}
}
//preenchedor da tabela de cima
function populaMestre() {
	// XXX foreach quebra em vários frameworks javascript invasivos
	// populando a primeira tabela e inicializando o estado da tela
	limpaTabela(tbMestre);// paranoia
	var i = -1;
	while (++i < dados.length) {
		var linha = linhaTemplate.cloneNode(true);
		tbMestre.appendChild(linha);
		linha.dado = dados[i];
		linha.onclick = function() {
			populaDetalhe(this.dado.detalhes);
		};
		var tds = linha.getElementsByTagName("td");
		tds[0].innerHTML = dados[i].nome;
		tds[1].innerHTML = dados[i].endereco;
		tds[2].innerHTML = dados[i].telefone;
		var bts = linha.getElementsByTagName("button");
		// editar
		bts[0].onclick = function() {
			selecionado = this.parentNode.parentNode.dado;
			editCoiso();
		};
		// excluir
		bts[1].onclick = function(e) {
			var i = -1;
			while (++i < dados.length) {
				if (dados[i] == this.parentNode.parentNode.dado) {
					if (confirm("Excluir linha " + i + "?")) {
						dados.splice(i, 1);
						populaMestre();
						limpaTabela(tbDetalhe);
						break;
					}
				}
			}
		};
	}
}
// botão do cancelar do formulário secreto de edição
bCancelar.onclick = function() {
	edit.style.display = "none";
	selecionado = null;
};
// salvando o mestre ou detalhe selecionado.
bSalvar.onclick = function() {
	edit.style.display = "none";
	updateCoiso();
};
// estouramos em 36 linhas o limite da elegância, :~