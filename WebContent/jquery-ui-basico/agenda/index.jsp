<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%String p = request.getContextPath();%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>jQuery UI, o bonitificador de interfaces</title>
		<link rel="stylesheet" href="<%=p%>/jquery-ui-1.8.9.custom/css/cupertino/jquery-ui-1.8.9.custom.css"/>
		<script type="text/javascript" src="<%=p%>/jquery-ui-1.8.9.custom/js/jquery-1.4.4.min.js"></script>
		<script type="text/javascript" src="<%=p%>/jquery-ui-1.8.9.custom/js/jquery-ui-1.8.9.custom.min.js"></script>
		<link rel="stylesheet" href="index.css"/>
		<script type='text/javascript' src='<%=p%>/dwr/engine.js'></script>
		<script type='text/javascript' src='<%=p%>/dwr/util.js'></script>
		<script type='text/javascript' src='<%=p%>/dwr/interface/Agenda.js'></script>
	</head>
	<body>
		<a href="../index.jsp">Voltar</a><hr/>
		<div id="dlg" title="Agenda">
			<div class="item"><label>Nome</label>    <input id="nme"/></div>
			<div class="item"><label>Endereço</label><input id="end"/></div>
			<div class="item"><label>Telefone</label><input id="tel"/></div>
			<table>
				<thead>
					<tr class="ui-widget-header">
						<th width="25%">Nome</th>
						<th width="25%">Endereco</th>
						<th width="25%">Telefone</th>
						<th width="25%">Server TimeStamp</th>
					</tr>
				</thead>
				<tbody id="tab">
					<tr>
						<td>X</td>
						<td>X</td>
						<td>X</td>
						<td>X</td>
					</tr>
				</tbody>
			</table>
		</div>
		<script type="text/javascript" src="index.js"></script>
	</body>
</html>