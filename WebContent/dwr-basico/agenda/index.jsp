<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%String p = request.getContextPath();%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<!--		<script type="text/javascript" src="../../firebug-lite/firebug-lite.js#startOpened"></script>-->
		<title>Agenda em DWR/javascript</title>
		<link rel="stylesheet" href="index.css"/>
		<script type='text/javascript' src='<%=p%>/dwr/engine.js'></script>
		<script type='text/javascript' src='<%=p%>/dwr/util.js'></script>
		<script type='text/javascript' src='<%=p%>/dwr/interface/Agenda.js'></script>
	</head>
	<body>
		<a id="voltar" href="../index.html">Voltar</a>
		<div id="main">
			<div id="form">
				<label for="nome">Nome</label>
				<br />
				<input type="text" id="nome" />
				<br />				
				<label for="endereco">Endere&ccedil;o</label>
				<br />
				<input type="text" id="endereco" />
				<br />				
				<label for="telefone">Telefone</label>
				<br />
				<input type="text" id="telefone" />
				<br />
				<button id="salvar">Salvar</button>
				&nbsp;
				<button id="limpar">Limpar</button>
				&nbsp;
				<button id="excluir">Excluir</button>
			</div>
			<div id="contatos">
				<table>
					<thead>
						<tr>
							<th style="width:100px">Nome</th>
							<th style="width:150px">Endere&ccedil;o</th>
							<th style="width:100px">Telefone</th>
							<th style="width:250px">Server timestamp</th>
						</tr>
					</thead>
					<tbody id="tcont">
					</tbody>
				</table>
			</div>
		</div>
		<script type='text/javascript' src="index.js"></script>
	</body>
</html>