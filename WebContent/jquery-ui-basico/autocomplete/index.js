//references
var avo = $("#avo");
var pai = $("#pai");
var fil = $("#fil");
// model
var prevcountry;
var prevprovince;
var prevcity;
// util
function initrefs() {
	return {
		code : 0,
		name : ""
	};
}
function clear(lv) {
	switch (lv) {
	case 1:
		prevprovince = initrefs();
		pai.val("");
	case 2:
		prevcity = initrefs();
		fil.val("");
		break;
	}
}
// events
avo.autocomplete({
	source : function(req, res) {
		Geografia.getCountriesAutoComplete(avo.val(), {
			callback : function(ret) {
				res($.map(ret, function(el) {
					return {
						label : el.code + " - " + el.name,
						value : el.name,
						orign : el
					};
				}));
			}
		});
	},
	select : function(e, ui) {
		prevcountry = ui.item.orign;
		clear(1);
	}
});
pai.autocomplete({
	source : function(req, res) {
		Geografia.getProvinceAutocomplete(pai.val(), prevcountry, {
			callback : function(ret) {
				res($.map(ret, function(el) {
					return {
						label : el.code + " - " + el.name,
						value : el.name,
						orign : el
					};
				}));
			}
		});
	},
	select : function(e, ui) {
		prevprovince = ui.item.orign;
		clear(2);
	}
});
fil.autocomplete({
	source : function(req, res) {
		Geografia.getCitiesAutoComplete(fil.val(), prevprovince, {
			callback : function(ret) {
				res($.map(ret, function(el) {
					return {
						label : el.code + " - " + el.name,
						value : el.name,
						orign : el
					};
				}));
			}
		});
	},
	select : function(e, ui) {
		prevcity = ui.item.orign;
	}
});
// basic setup
prevcountry = initrefs();
prevprovince = initrefs();
prevcity = initrefs();