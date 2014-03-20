var curPage = document.getElementById("wizard");
var progress = document.getElementById("progress");
var results = document.getElementById("results");

var btFechaResults = results.getElementsByTagName("button")[0];

var campos = results.getElementsByTagName("label");

var lbNome = campos[0];
var lbEnde = campos[1];
var lbTele = campos[2];
var lbMaio = campos[3];
	
//dados inerentes à página da wizard
var idx = 0;
var pages = ["a","b","c","d"];
//modelo
var modelo = {
		nome:"",
		endereco:"",
		telefone:"",
		maior:false
};
//funções visíveis em escopo conhecido para os filhos manipularem
function next(){
	if(idx<pages.length-1)
		curPage.src=pages[++idx]+".html";
	progress.style.width = (20 + 20 * idx)+"px";
	var pct = idx / pages.length;
	pct = Math.round(255 * pct);
	progress.style.backgroundColor = "rgb("+ (255 - pct) +","+ pct +",0)";
}
function prev(){
	if(idx>0)
		curPage.src=pages[--idx]+".html";
	progress.style.width = (20 + 20 * idx)+"px";
	var pct = idx / pages.length;
	pct = Math.round(255 * pct);
	progress.style.backgroundColor = "rgb("+(255 - pct) +","+ pct +",0)";
}
function displayResults(){
	lbNome.innerHTML = modelo.nome;
	lbEnde.innerHTML = modelo.endereco;
	lbTele.innerHTML = modelo.telefone;
	lbMaio.innerHTML = modelo.maior ? "Sim" : "Não"; 
	results.style.visibility="visible";
}
btFechaResults.onclick=function(){
	results.style.visibility="hidden";
};
//sanando estado inicial
top.someAguarde();