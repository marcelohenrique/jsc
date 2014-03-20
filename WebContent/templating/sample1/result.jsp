<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<style type="text/css">
	table{
		width:100%;
	}
</style>
<a href="index.html">Voltar</a>
<hr />
<h1>Resultado</h1>
<%
	// dados titular
	String nome = request.getParameter("nome");
	String endereco = request.getParameter("endereco");
	String telefone = request.getParameter("telefone");
%>
<fieldset>
	<legend>Titular</legend>
	<table>
		<tr>
			<td>Nome</td>
			<td><%=nome%></td>
		</tr>
		<tr>
			<td>Endereco</td>
			<td><%=endereco%></td>
		</tr>
		<tr>
			<td>Telefone</td>
			<td><%=telefone%></td>
		</tr>
	</table>
</fieldset>
<%
	// quantidade de dependentes
	String count = request.getParameter("count");
	int i = -1, len = Integer.parseInt(count);
	while(++i<len){
		nome = request.getParameter("nome"+i);
		endereco = request.getParameter("endereco"+i);
		telefone = request.getParameter("telefone"+i);
		if(nome != null){
%>
<fieldset>
	<legend>Dependente <%=i%></legend>
	<table>
		<tr>
			<td>Nome</td>
			<td><%=nome%></td>
		</tr>
		<tr>
			<td>Endereco</td>
			<td><%=endereco%></td>
		</tr>
		<tr>
			<td>Telefone</td>
			<td><%=telefone%></td>
		</tr>
	</table>
</fieldset>
<%	
		}
	}
%>