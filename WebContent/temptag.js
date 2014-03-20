/**
 * este helper carrega scripts em tags tempor�rias e as remove em seguida.
 * 
 * @param uri
 *            caminho da url que servir� o script desejado
 * 
 * @license Public Domain
 * @author sombriks/Usix technology
 */
function TempTag(uri, usernd) {

	var tag = document.createElement("script");
	var marcador = "__timestamp__=" + (new Date().getTime());
	if (usernd)
		tag.src = uri.lastIndexOf("?") > -1 ? //
		uri + "&" + marcador : uri + "?" + marcador;
	else
		tag.src = uri;
	tag.onload = function() {
		document.body.removeChild(tag);
	};

	this.carregar = function() {
		document.body.appendChild(tag);
	};
}
// jQuery interface
if (typeof jQuery != "undefined") {
	(function($) {
		$.getScriptWithTag = function(uri, usernd) {
			new TempTag(uri, usernd).carregar();
		};
	})(jQuery);
}