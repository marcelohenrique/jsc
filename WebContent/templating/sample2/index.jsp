<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
		<script type="text/javascript" src="../../firebug-lite/firebug-lite.js#startOpened"></script>
<a href="../index.html">Voltar</a>
<style type="text/css">
	fieldset,hr,input,select,table,td{
		border: black 1px inset;
	}
	input,select,table {
		width: 90%;
	}
	p {
		width: 300px;
		float: left;
	}
	fieldset {
		width: 800px;
	}
	td{
		width:30%;
	}
	#edit{
		width:300px;
		background-color:white;
		position:absolute;
		top:20%;
		left:30%;
	}
	#edit>legend{
		background-color:white;
		border:black 1px groove;
	}
</style>
<h1>Mestre-Detalhe</h1>
<h5>dados meramente ilustrativos</h5>
<fieldset>
	<legend>Mestres</legend>
	<table>
		<tbody id="tb-mestre">
			<!-- dynamic content goes here -->
		</tbody>
	</table>
</fieldset>
<fieldset>
	<legend>Detalhes</legend>
	<table>
		<tbody id="tb-detalhe">
			<!-- dynamic content goes here -->	
		</tbody>
	</table>
</fieldset>
<fieldset id="edit" style="display:none;">
	<legend>Dados detalhe</legend>
	<div>
		<p>
			<label>Nome</label><br/>
			<input/>
		</p>
		<p>
			<label>Endereço</label><br/>
			<input/>
		</p>
		<p>
			<label>Telefone</label><br/>
			<input/>
		</p>
		<p>
			<button>Cancelar</button>
			<button>salvar</button>
		</p>
	</div>
</fieldset>
<table style="display:none;">
	<tr id="linha-template">
		<td></td>
		<td></td>
		<td></td>
		<td><button>Editar</button></td>
		<td><button>Excluir</button></td>
	</tr>
</table>
<script type="text/javascript" src="index.js"></script>
<script type="text/javascript">
	//dados é criado no script principal.
	<%	int i = -1;
		while (++i<10){ %>
			dados.push({
				nome : "fulano mestre <%=i%>",
				endereco : "rua mestre <%=i%>",
				telefone : "telefone mestre <%=i%>",
				detalhes : []
			});
		<%
			int j = -1;
			long k = System.nanoTime() % 9;
			while(++j<k){
		%>
				dados[dados.length-1].detalhes.push({
					nome : "fulano detalhe <%=i%> - <%=j%>",
					endereco : "rua detalhe <%=i%> - <%=j%>",
					telefone : "telefone detalhe <%=i%> - <%=j%>"
				});
		<%	} 
		} %>
	populaMestre();
</script>