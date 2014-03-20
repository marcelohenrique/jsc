//helper casual
function $(i) {
	return document.getElementById(i);
}

// elementos de tela
var tabDinamica = $("teste1");
var tabEstatica = $("teste2");
var popular = $("popuDim");
var primeira1 = $("primDim");
var anterior1 = $("prevDim");
var proxima1 = $("nextDim");
var ultima1 = $("lastDim");
var ordenar = $("ordeDim");
var primeira2 = $("primStat");
var anterior2 = $("prevStat");
var proxima2 = $("nextStat");
var ultima2 = $("lastStat");

console.debug("objetos refrenciados: tabDinamica, tabEstatica, popular, primeira1, anterior1, proxima1, ultima1, ordenar, primeira2, anterior2, proxima2, ultima2");

// os dados de modelo
var dadosDin = [ {
	nome : "Fulano de tal 17",
	endereco : " rua 17",
	telefone : "telefone 17"
}, {
	nome : "Fulano de tal 21",
	endereco : " rua 21",
	telefone : "telefone 21"
}, {
	nome : "Fulano de tal 3",
	endereco : " rua 3",
	telefone : "telefone 3"
}, {
	nome : "Fulano de tal 18",
	endereco : " rua 18",
	telefone : "telefone 18"
}, {
	nome : "Fulano de tal 5",
	endereco : " rua 5",
	telefone : "telefone 5"
}, {
	nome : "Fulano de tal 13",
	endereco : " rua 13",
	telefone : "telefone 13"
}, {
	nome : "Fulano de tal 6",
	endereco : " rua 6",
	telefone : "telefone 6"
}, {
	nome : "Fulano de tal 9",
	endereco : " rua 9",
	telefone : "telefone 9"
}, {
	nome : "Fulano de tal 10",
	endereco : " rua 10",
	telefone : "telefone 10"
}, {
	nome : "Fulano de tal 11",
	endereco : " rua 11",
	telefone : "telefone 11"
}, {
	nome : "Fulano de tal 12",
	endereco : " rua 12",
	telefone : "telefone 12"
}, {
	nome : "Fulano de tal 1",
	endereco : " rua 1",
	telefone : "telefone 1"
}, {
	nome : "Fulano de tal 20",
	endereco : " rua 20",
	telefone : "telefone 20"
}, {
	nome : "Fulano de tal 8",
	endereco : " rua 8",
	telefone : "telefone 8"
}, {
	nome : "Fulano de tal 22",
	endereco : " rua 22",
	telefone : "telefone 22"
}, {
	nome : "Fulano de tal 15",
	endereco : " rua 15",
	telefone : "telefone 15"
}, {
	nome : "Fulano de tal 14",
	endereco : " rua 14",
	telefone : "telefone 14"
}, {
	nome : "Fulano de tal 7",
	endereco : " rua 7",
	telefone : "telefone 7"
}, {
	nome : "Fulano de tal 2",
	endereco : " rua 2",
	telefone : "telefone 2"
}, {
	nome : "Fulano de tal 16",
	endereco : " rua 16",
	telefone : "telefone 16"
}, {
	nome : "Fulano de tal 19",
	endereco : " rua 19",
	telefone : "telefone 19"
}, {
	nome : "Fulano de tal 4",
	endereco : " rua 4",
	telefone : "telefone 4"
} ];

console.debug("dados dinamicos (dadosDin):");
console.debug(dadosDin);

// objetos de modelo
var colmodel = [ function(dado) {
	return dado.nome;
}, function(dado) {
	return dado.endereco;
}, function(dado) {
	return dado.telefone;
} ];

console.debug("column model para a tabela (colmodel):");
console.debug(colmodel);

// teste #1
var tabelaDimL = new TabelaDinamicaLocal({
	tabela : tabDinamica,
	dados : dadosDin,
	classNameEven : "cinza",
	colTitle : [ "Nome", "Endereço", "Telefone" ],
	colModel : colmodel
});

console.debug("criando a tabela dinâmica (tabelaDimL):");
console.debug(tabelaDimL);

// teste #2
var tabEst = new TabelaEstatica({
	tabela : tabEstatica
});

console.debug("criando a tabela estática (tabEst):");
console.debug(tabEst);

// eventos

popular.onclick = function() {
	tabelaDimL.update();
};
primeira1.onclick = function() {
	tabelaDimL.first();
};
anterior1.onclick = function() {
	tabelaDimL.prev();
};
proxima1.onclick = function() {
	tabelaDimL.next();
};
ultima1.onclick = function() {
	tabelaDimL.last();
};

ordenar.onclick = function() {
	tabelaDimL.sort(function(a, b) {
		var x1 = a.nome.replace(/Fulano de tal /, "");
		x1 = parseInt(x1, 10);
		var x2 = b.nome.replace(/Fulano de tal /, "");
		x2 = parseInt(x2, 10);
		return x2 - x1;
	});
};

primeira2.onclick = function() {
	tabEst.first();
};
anterior2.onclick = function() {
	tabEst.prev();
};
proxima2.onclick = function() {
	tabEst.next();
};
ultima2.onclick = function() {
	tabEst.last();
};

// inicializando o estado da tela
// tabelaDimL.update();
tabEst.first();
console.debug("você pode tentar usar alguns dos objetos aqui na linha de comando. tente algo como tabEst.next()");
//
