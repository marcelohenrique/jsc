/**
 * Componente reutiliz�vel de tabelas paginadas com bot�es rid�culos;
 * 
 * Essa � a tabela din�mica local, onde nos alimentamos de uma lista de objetos 
 * javascript e n�o nos preocupamos com o que tinha antes na tabela.
 * 
 * 
 * @param oparam
 * 	Objeto contendo os seguintes par�metros:
 * 
 * @param oparam.tabela (obrigat�rio)
 * 	refer�ncia da tabela que iremos usar como fonte de toda pagina��o. Esta 
 * 	tabela pode opcionalmente ser vazia, e se for iremos criar estruturas de
 * 	acordo com o que for informado.
 * 
 * @param oparam.dados (obrigat�rio)
 * 	Array com os dados que iremos apresentar. Pode ser vazio, pode adiconar
 * 	elementos nesse array depois, e da� chamar uma fun��o p�blica dessa 
 * 	classe.
 * 
 * @param oparam.colModel (obrigat�rio)
 * 	Array con fun��es que recebam um e exatamente um argumento. este um 
 * 	argumento � um dos elementos da lista, de modo que cada �ndice do array �
 * 	uma coluna e a fun��o daquele �ndice ir� retornar o que iremos mostrar na
 * 	respectiva coluna do array;
 * 
 * @param oparam.colTitle (opcional)
 * 	Array com strings contendo os t�tulos das colunas; caso tenha mais 
 * 	colunas que t�tulos iremos mostrar os informados e por "" nos outros; de
 * 	forma an�loga, em tendo mais t�tulos que colunas mostraremos unicamente
 * 	o suficiente para cobrir as colunas.
 * 
 * @param oparam.viewPort (opcional)
 * 	N�mero que ir� dizer quantos registros s�o vis�veis de uma vez s�. Isto � 
 * 	importante para calcularmos p�ginas e totais. Caso n�o informado, o default 
 * 	� 10 registros por p�gina.
 * 
 * @param oparam.classNameEven (opcional)
 * 	Nome da classe css que ser� colocada nas linhas (tr's) do tbody de ordem par
 * 
 * @author sombriks/Usix technology
 * 
 * @license Public Domain
 */
function TabelaDinamicaLocal(oparam){
	
	/*come�emos com as valida��es*/
	
	if(!oparam.tabela)
		throw new Error("Voc� deve informar uma tabela!");
	
	if(!oparam.dados)
		throw new Error("Voc� deve informar uma lista de objetos!");
	
	if(!oparam.colModel)
		throw new Error("Voc� deve informar uma lista de fun��es 'function (dado){...}'");
	
	var tabela = oparam.tabela;
	var dadoslista = oparam.dados;
	var colModel = oparam.colModel;
	
	var colTitle;
	if(oparam.colTitle)
		colTitle=oparam.colTitle;
	
	var start = 0;
	var viewPort = 10;
	if(oparam.viewPort)
		viewPort = oparam.viewPort;
	
	var nomeClasse;
	if(oparam.classNameEven)
		nomeClasse = oparam.classNameEven;
	
	/*alguns utilit�rios*/
	function limparFilhos(elemento){
		var trs = elemento.childNodes;
		while(trs.length>0)
			elemento.removeChild(trs[0]);
	}
	
	limparFilhos(tabela);
	
	/*'probes' iniciais para sabermos o que tem nessa tabela...*/
	
	var cabecalho = tabela.getElementsByTagName("thead")[0];
	if(!cabecalho){
		cabecalho = document.createElement("thead");
		tabela.appendChild(cabecalho);
	}
	limparFilhos(cabecalho);
	
	var corpo = tabela.getElementsByTagName("tbody")[0];
	if(!corpo){
		corpo = document.createElement("tbody");
		tabela.appendChild(corpo);
	}
	limparFilhos(corpo);
	
	/* Fun��es p�blicas e privadas de customiza��o */
	
	function setColTitle(titles){
		if(titles)
			colTitle = titles;
		limparFilhos(cabecalho);
		if(colTitle.length != colModel.length)
			throw new Error("n�mero de cabe�alhos ("+colTitle.length+") difere do n�mero de colunas do model ("+colModel.length+")");
		var tr = document.createElement("tr");
		cabecalho.appendChild(tr);
		for(var x in colTitle){// XXX bibliotecas como Prototype quebram isso
			var th = document.createElement("th");
			var content=colTitle[x];
			if(content.tagName)
				th.appendChild(content);
			else
				th.innerHTML=content;
			tr.appendChild(th);
		}			
	}
	this.setColTitle=setColTitle;
	
	//caso informado j� no construtor
	if(colTitle)
		setColTitle();
	
	function update(lista,_start,vPort){/* todos os par�metros opcionais*/
		limparFilhos(corpo);
		if(lista)
			dadoslista = lista;
		if(_start || _start == 0){
			start = _start;
			if(start < 0){
				start = 0;
			}else if(start > dadoslista.length -1){
				var last = (dadoslista.length / viewPort) - 1;
				if(dadoslista.length % viewPort > 0)
					last += 1;
				start = Math.floor(last)*viewPort;
			}
		}
		if(vPort){
			viewPort = vPort;
			if(viewPort < 1)
				viewPort = 1;
		}
		//adicionando os elementos baseado em viewport
		var x = start -1;
		while(++x < start+viewPort && x < dadoslista.length){
			var tr = document.createElement("tr");
			if(nomeClasse && x % 2 == 0)
				tr.className=nomeClasse;
			corpo.appendChild(tr);
			var dado = dadoslista[x];
			for(var y in colModel){
				var td = document.createElement("td");
				tr.appendChild(td);
				var zzz = colModel[y](dado);
				if(zzz.tagName)// TODO n�o presta no IE
					td.appendChild(zzz);
				else
					td.innerHTML=zzz;
			}
		}
	}
	this.update=update;
	
	/* fun��es de pagina��o */
	
	function first(){
		update(null,0);
	}
	this.first=first;
	
	function prev(){
		update(null,start - viewPort);
	}
	this.prev=prev;
	
	function next(){
		update(null,start + viewPort);
	}
	this.next=next;
	
	function last(){
		var last = (dadoslista.length / viewPort) - 1;
		if(dadoslista.length % viewPort > 0)
			last += 1;
		update(null,Math.floor(last)*viewPort);
	}
	this.last=last;
	
	/* gets para start, viewport e total*/
	
	this.getStart = function(){
		return start;
	};
	
	this.getViewPort = function(){
		return viewPort;
	};
	
	this.getTotal = function(){
		return dadoslista.lenght;
	};
	
	/*
	 * sortador 
	 */
	this.sort=function(comp){
		dadoslista = dadoslista.sort(comp);
		update(null,start);
	};
}

/**
 * Classe pra paginar tabelas est�ticas. 
 * 
 * N�o espere mais do que o paginador aqui, n�o separou o modelo da vis�o, agora
 * s� tem paliativo!
 * 
 * @param oparam.tabela
 * 	ID da tabela est�tica a paginarmos
 * 
 * @param oparam.viewport (opcional)
 * 	N�mero pra sabermos quantas linhas s�o vis�veis por vez.
 * 
 */
function TabelaEstatica(oparam){
	
	//come�emos com as valida��es	
	if(!oparam.tabela)
		throw new Error("Voc� deve informar uma tabela!");	
	var tabela = oparam.tabela;
	
	var start = 0;
	
	var viewPort = 10;
	if(oparam.viewPort)
		viewPort = oparam.viewPort;
	
	//vamos armazenar as linhas da tabela aqui.
	var dadoslista = [];
	
	//� uma tabela dotada de tbody?
	var bdy = tabela.getElementsByTagName("tbody")[0];
	
	if(bdy)//vamos apontar nossos algoritmos pra isso aqui ent�o...
		tabela = bdy;
	
	//limpando a tabela
	while(tabela.childNodes.length>0){
		var child = tabela.childNodes[0];
		if(child.tagName)//peguemos somente os tr's e descartemos o resto
			dadoslista.push(tabela.removeChild(child));
		else
			tabela.removeChild(child);
	}
	
	//algoritmo de reconstru��o da tabela.
	function update(strt,vPort){
		//clear na tabela
		while(tabela.childNodes.length>0)
			tabela.removeChild(tabela.childNodes[0]);
		
		//averiguando os par�metros
		if(strt || strt == 0){
			if(0 > strt){
				start = 0;
			}else if(strt > dadoslista.length -1){
				var last = (dadoslista.length / viewPort ) -1;
				if(dadoslista.length % viewPort != 0)
					last += 1;
				start = Math.floor(last)*viewPort;
			}else
				start = strt;
		}
		if(vPort){
			if(vPort<0)
				vPort = 1;
			viewPort = vPort;
		}
		var x = start -1;
		while(++x<start+viewPort && x < dadoslista.length)
			tabela.appendChild(dadoslista[x]);
	}
	
	/* fun��es de pagina��o */
	
	function first(){
		update(0);
	}
	this.first=first;
	
	function prev(){
		update(start - viewPort);
	}
	this.prev=prev;
	
	function next(){
		update(start + viewPort);
	}
	this.next=next;
	
	function last(){
		var last = (dadoslista.length / viewPort) - 1;
		if(dadoslista.length % viewPort > 0)
			last += 1;
		update(Math.floor(last)*viewPort);
	}
	this.last=last;
	
	/* gets para start, viewport e total*/
	
	this.getStart = function(){
		return start;
	};
	
	this.getViewPort = function(){
		return viewPort;
	};
	
	this.getTotal = function(){
		return dadoslista.lenght;
	};
}
