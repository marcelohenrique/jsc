var country = $("country");
var estado = $("estado");
var cidade = $("cidade");

var base = [ {name:"--selecione--",code:-1} ];

function clear(combo) {
	dwr.util.removeAllOptions(combo);
	dwr.util.addOptions(combo, base,"code","name");
	combo.disabled=true;
}

country.onchange = function() {
	clear(estado);
	clear(cidade);
	var paiis = {
		code : country.value
	};
	Geografia.getEstados(paiis, {
		callback : function(estados) {
			dwr.util.addOptions(estado, estados, "code", "name");
			estado.disabled=false;
		},
		errorHandler : function(e) {
			alert(e);
		}
	});
};
estado.onchange = function() {
	clear(cidade);
	var state = {
		code : estado.value
	};
	Geografia.getCidades(state, {
		callback : function(cities) {
			dwr.util.addOptions(cidade, cities, "code", "name");
			cidade.disabled=false;
		},
		errorHandler : function(e) {
			alert(e);
		}
	});
};

// init

clear(country);
clear(estado);
clear(cidade);

Geografia.getPaises( {
	callback : function(paises) {
		dwr.util.addOptions(country, paises, "code", "name");
		country.disabled=false;
	},
	errorHandler : function(e) {
		alert(e);
	}
});
