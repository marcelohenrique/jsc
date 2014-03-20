
var primeiro = document.getElementById("primeiro");
var red = 0;
var i = setInterval(function(){
	if(red == 254)
		clearInterval(i);
	primeiro.style.color="rgb("+(red++)+",0,0)";
},30);
//sanando estado inicial
top.someAguarde();
