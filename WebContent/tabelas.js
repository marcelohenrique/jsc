/**
 * Componente reutilizável de tabelas paginadas com botões ridículos;
 * 
 * Essa é a tabela dinâmica local, onde nos alimentamos de uma lista de objetos 
 * javascript e não nos preocupamos com o que tinha antes na tabela.
 * 
 * 
 * @param oparam
 * 	Objeto contendo os seguintes parâmetros:
 * 
 * @param oparam.tabela (obrigatório)
 * 	referência da tabela que iremos usar como fonte de toda paginação. Esta 
 * 	tabela pode opcionalmente ser vazia, e se for iremos criar estruturas de
 * 	acordo com o que for informado.
 * 
 * @param oparam.dados (obrigatório)
 * 	Array com os dados que iremos apresentar. Pode ser vazio, pode adiconar
 * 	elementos nesse array depois, e daí chamar uma função pública dessa 
 * 	classe.
 * 
 * @param oparam.colModel (obrigatório)
 * 	Array con funções que recebam um e exatamente um argumento. este um 
 * 	argumento é um dos elementos da lista, de modo que cada índice do array é
 * 	uma coluna e a função daquele índice irá retornar o que iremos mostrar na
 * 	respectiva coluna do array;
 * 
 * @param oparam.colTitle (opcional)
 * 	Array com strings contendo os títulos das colunas; caso tenha mais 
 * 	colunas que títulos iremos mostrar os informados e por "" nos outros; de
 * 	forma análoga, em tendo mais títulos que colunas mostraremos unicamente
 * 	o suficiente para cobrir as colunas.
 * 
 * @param oparam.viewPort (opcional)
 * 	Número que irá dizer quantos registros são visíveis de uma vez só. Isto é 
 * 	importante para calcularmos páginas e totais. Caso não informado, o default 
 * 	é 10 registros por página.
 * 
 * @param oparam.classNameEven (opcional)
 * 	Nome da classe css que será colocada nas linhas (tr's) do tbody de ordem par
 * 
 * @author sombriks/Usix technology
 * 
 * @license Public Domain
 */
function TabelaDinamicaLocal(oparam){
	
	/*começemos com as validações*/
	
	if(!oparam.tabela)
		throw new Error("Você deve informar uma tabela!");
	
	if(!oparam.dados)
		throw new Error("Você deve informar uma lista de objetos!");
	
	if(!oparam.colModel)
		throw new Error("Você deve informar uma lista de funções 'function (dado){...}'");
	
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
	
	/*alguns utilitários*/
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
	
	/* Funções públicas e privadas de customização */
	
	function setColTitle(titles){
		if(titles)
			colTitle = titles;
		limparFilhos(cabecalho);
		if(colTitle.length != colModel.length)
			throw new Error("número de cabeçalhos ("+colTitle.length+") difere do número de colunas do model ("+colModel.length+")");
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
	
	//caso informado já no construtor
	if(colTitle)
		setColTitle();
	
	function update(lista,_start,vPort){/* todos os parâmetros opcionais*/
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
				if(zzz.tagName)// TODO não presta no IE
					td.appendChild(zzz);
				else
					td.innerHTML=zzz;
			}
		}
	}
	this.update=update;
	
	/* funções de paginação */
	
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
 * Classe pra paginar tabelas estáticas. 
 * 
 * Não espere mais do que o paginador aqui, não separou o modelo da visão, agora
 * só tem paliativo!
 * 
 * @param oparam.tabela
 * 	ID da tabela estática a paginarmos
 * 
 * @param oparam.viewport (opcional)
 * 	Número pra sabermos quantas linhas são visíveis por vez.
 * 
 */
function TabelaEstatica(oparam){
	
	//começemos com as validações	
	if(!oparam.tabela)
		throw new Error("Você deve informar uma tabela!");	
	var tabela = oparam.tabela;
	
	var start = 0;
	
	var viewPort = 10;
	if(oparam.viewPort)
		viewPort = oparam.viewPort;
	
	//vamos armazenar as linhas da tabela aqui.
	var dadoslista = [];
	
	//é uma tabela dotada de tbody?
	var bdy = tabela.getElementsByTagName("tbody")[0];
	
	if(bdy)//vamos apontar nossos algoritmos pra isso aqui então...
		tabela = bdy;
	
	//limpando a tabela
	while(tabela.childNodes.length>0){
		var child = tabela.childNodes[0];
		if(child.tagName)//peguemos somente os tr's e descartemos o resto
			dadoslista.push(tabela.removeChild(child));
		else
			tabela.removeChild(child);
	}
	
	//algoritmo de reconstrução da tabela.
	function update(strt,vPort){
		//clear na tabela
		while(tabela.childNodes.length>0)
			tabela.removeChild(tabela.childNodes[0]);
		
		//averiguando os parâmetros
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
	
	/* funções de paginação */
	
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
