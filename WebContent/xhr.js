/**
 * este utilitário permite você carregar url's e injetá-las dentro de um
 * elemento qualquer, presumivelmente uma div.
 * 
 * o processo é inteiramente assíncrono, mas se você precisar suspender todas as
 * execuções paralelas você pode alterar este código livremente.
 * 
 * um bug medonho foi detectado na família IE, de modo que chamadas que retornem
 * com statuscode 204 retornam erroneamente 1223.
 * 
 * @param oparam
 *            Objeto de parâmetros, a saber:
 * @param oparam.url
 *            uri válida para algum recurso html
 * @param oparam.dest
 *            (opcional) se for algo diferente de null/undefined deve ser o
 *            elemento destino. Não apenas o id, mas a referência ao elemento.
 * @param oparam.xml
 *            (opcional) se for algo diferente de undefined, nulll ou 0 iremos
 *            pegar o responseXML no lugar do responseText.
 * @param oparam.hook
 *            (opcional) se existir, deve ser uma função que será executada
 *            imediatamente após o processo de adição do conteúdo dentro do
 *            destino. tal função recebe o responseText como parâmetro ou o
 *            responseXML caso o parâmetro xml seja diferente de undefined.
 * @param oparam.sending
 *            (opcional) se diferente de undefined/null, será enviado com o
 *            send() do xmlhttp.
 * @param oparam.username
 *            (opcional) em caso de conexões de autenticação basic.
 * @param oparam.password
 *            (opcional) em caso de conexões de autenticação basic.
 * @param oparam.method
 *            (opcional) default é GET, mas o http tem POST, PUT, DELETE e
 *            OPTIONS.
 * @param oparam.prehook
 *            (opcional) toda vez que o readystate for open (1) chamaremos o
 *            prehook tambem. prehook não recebe argumentos.
 * @param oparam.posthook
 *            (opcional) toda vez que o readystate for loaded (4) chamaremos o
 *            posthook também. posthook não recebe argumentos.
 * @param oparam.contentType
 *            (opcional) informa qual valor deve ser colocado no header
 *            Content-type.
 * @param oparam.accept
 *            (opcional) informa o valor para setarmos no header Accept.
 * @param oparam.errorHandler
 *            (opcional) caso o retorno do http não seja "bom" (não encontrado,
 *            erro de servidor, etc.) este hook de erro será chamado no lugar do
 *            hook normal.
 * 
 * 
 * @author sombriks/Usix technology
 * 
 * @license Public Domain
 * 
 */
function XHR(oparam) {

	this.oparam = oparam; // || {};// publicando a nossa referência

	// basic validation
	if (!oparam.url)
		throw new Error("informe url");

	if (oparam.hook && typeof oparam.hook != "function")
		throw new Error("hook tem que ser function");

	if (oparam.prehook && typeof oparam.prehook != "function")
		throw new Error("prehook tem que ser function");

	if (oparam.posthook && typeof oparam.posthook != "function")
		throw new Error("posthook tem que ser function");

	// criamos isso pra ver se descobrimos qual é a do ie6
	function initXHR() {

		var xhr;
		// http://en.wikipedia.org/wiki/XMLHttpRequest#Support_in_Internet_Explorer_versions_5.2C_5.5_and_6
		if (typeof XMLHttpRequest != "undefined")
			xhr = new XMLHttpRequest();
		else {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP.6.0");
			} catch (e) {
			}
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP.3.0");
			} catch (e) {
			}
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
			}
			// Microsoft.XMLHTTP points to Msxml2.XMLHTTP.3.0 and is redundant
			if (!xhr)
				throw new Error("This browser does not support XMLHttpRequest.");
		}

		/*
		 * readystates:
		 * 
		 * 0 --------------------------------------------------- (Uninitialized)
		 * 1 ------------------------------------------------------------ (Open)
		 * 2 ------------------------------------------------------------ (Sent)
		 * 3 ------------------------------------------------------- (Receiving)
		 * 4 ---------------------------------------------------------- (Loaded)
		 */
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 1 && oparam.prehook) {
				oparam.prehook();
			} else if (xhr.readyState == 4) {

				// só é retorno bom se for menor que 400
				if (xhr.status < 400 || xhr.status == 1223/* bug do IE */) {
					// testamos cada parâmetro opcional e o usamos de acordo
					var resp;
					if (oparam.xml)
						resp = xhr.responseXML;
					else
						resp = xhr.responseText;

					if (oparam.dest && oparam.xml)
						oparam.dest.appendChild(resp);
					else if (oparam.dest)
						oparam.dest.innerHTML = resp;

					if (oparam.hook)
						oparam.hook(resp);
				} else {
					if (oparam.errorHandler)
						oparam.errorHandler( {
							"statusText" : xhr.statusText,
							"status" : xhr.status
						});
				}
				// posthook após o dest e o hook terem sido avaliados
				if (oparam.posthook)
					oparam.posthook();
			}
		};
		return xhr;
	}
	/**
	 * este método dispara a requisição para o servidor
	 */
	this.carregar = function() {
		var x = initXHR();
		var method = "GET";
		if (oparam.method) {
			switch (oparam.method) {
			case "GET":
			case "POST":
			case "PUT":
			case "DELETE":
				// case "HEAD":
				// case "OPTIONS":
				method = oparam.method;
				break;
			default:
				throw new Error("somente GET e POST suportados por hora");
				break;
			}
		}

		if (method == "GET" && oparam.sending)
			throw new Error("GET perde os dados passados pelo send");

		// TODO vamos adicionar na url um parâmetro desnecessário?
		var marcador = "variable" + (new Date().getTime()) + "="
				+ (new Date().getTime());
		marcador = oparam.url.lastIndexOf("?") > -1 ? "&" + marcador : "?"
				+ marcador;

		var async = true;
		// if (method == "PUT")
		// async = false;

		if (oparam.username && oparam.password)
			x.open(method, oparam.url + marcador, async, username, password);
		else
			x.open(method, oparam.url + marcador, async);

		// http://www.openjs.com/articles/ajax_xmlhttp_using_post.php
		if (oparam.sending) {
			if (!oparam.contentType)
				x.setRequestHeader("Content-type",// defaults to form
						"application/x-www-form-urlencoded");
			else
				x.setRequestHeader("Content-type", oparam.contentType);
		}
		if (oparam.accept)
			x.setRequestHeader("Accept", oparam.accept);
		x.send(oparam.sending);
	};
}
