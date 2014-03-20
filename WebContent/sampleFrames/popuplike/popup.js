// elementos de tela
var search = document.getElementById("search");
var clear = document.getElementById("clear");
var tbcontent = document.getElementById("tbcontent");
var ok = document.getElementById("ok");

// dados de modelo
var dadosfake = [ {
	cep : "60000-000",
	rua : "rua tal do canto tal 1"
}, {
	cep : "60000-100",
	rua : "rua nossa senhora das graças"
}, {
	cep : "60000-200",
	rua : "rua do rosario"
}, {
	cep : "60000-300",
	rua : "av. 13 de maio"
}, {
	cep : "60000-400",
	rua : "av presidente castelo branco"
}, ];

var tabp = new TabelaDinamicaLocal({
	dados : dadosfake,
	tabela : tbcontent,
	colModel : [ function(dado) {
		return dado.cep;
	}, function(dado) {
		return dado.rua;
	}, function(dado) {
		var i = indexOf(dado);
		var crique = "top.frames['centro'].setEndeco(dadosfake[" + i + "])";
		crique += ";top.frames['centro'].hidepop()";
		return "<button onclick=" + crique + ">ok</button>";
	} ]
});
tabp.update();

// helper para cobrir deficiências da API de tabela
function indexOf(dado) {
	var i = -1;
	while (++i < dadosfake.length) {
		if (dadosfake[i] == dado)
			return i;
	}
	return 0;
}

// eventos

ok.onclick = function() {
	top.frames["centro"].hidepop();
};
search.onchange = function() {

};