/*
 * exemplo nº1 de templating. Adicionar campos dinâmicos num form para submeter. Peba.
 * 
 */
//formulário
var formulario = document.getElementsByTagName("form")[0];
// campos do titular.
var nome = document.getElementById("nome");
var endereco = document.getElementById("endereco");
var telefone = document.getElementById("telefone");
// botão adicionar dependente
var add = document.getElementById("add");
// div dos dependentes
var divDeps = document.getElementById("dependentes");
// botão salvar
var save = document.getElementById("save");
// div contendo o template do que irá se repetir
var template = document.getElementById("template");
// campo hidden com o sequencial dos elementos a realizar
var count = document.getElementById("count");
// modelo de dados
var titular = {
	nome : "",
	endereco : "",
	telefone : "",
	dependentes : []
};
// colando o view no model
nome.onchange = function() {
	titular.nome = nome.value;
};
endereco.onchange = function() {
	titular.endereco = endereco.value;
};
telefone.onchange = function() {
	titular.telefone = telefone.value;
};
// evento de criar tela complicada dinamicamente
add.onclick = function() {
	var novo = template.cloneNode(true);
	divDeps.appendChild(novo);// adicionar logo senão não funciona no IE
	novo.id = "dependente" + count.value;
	var noente = novo.getElementsByTagName("input");// nome, endereço, telefone
	noente[0].id = "nome" + count.value;
	noente[0].name = "nome" + count.value;
	noente[1].id = "endereco" + count.value;
	noente[1].name = "endereco" + count.value;
	noente[2].id = "telefone" + count.value;
	noente[2].name = "telefone" + count.value;
	count.value = 1 + parseInt(count.value, 10);
	novo.style.visibility = "visible";
	// modelo
	var dependente = {
		nome : "",
		endereco : "",
		telefone : ""
	};
	// colando os campos no modelo
	titular.dependentes.push(dependente);

	noente[0].onchange = function() {
		dependente.nome = noente[0].value;
	};
	noente[1].onchange = function() {
		dependente.endereco = noente[1].value;
	};
	noente[2].onchange = function() {
		dependente.telefone = noente[2].value;
	};

	// adicionando comportamentos de remoção no template
	var remover = novo.getElementsByTagName("button")[0];
	remover.onclick = function() {
		divDeps.removeChild(novo);// remove da tela
		// remove do modelo
		var x = -1;
		while (++x < titular.dependentes.length) {
			if (titular.dependentes[x] == dependente) {
				// lista.remove(x);
				titular.dependentes.splice(x, 1);
				break;
			}
		}
	};
};
// exibindo, mandando pro banco, o que for.
save.onclick = function() {
	formulario.submit();
};