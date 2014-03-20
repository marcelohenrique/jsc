<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%String p = request.getContextPath();%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>jQuery plugin</title>
		<link rel="stylesheet" href="<%=p%>/jquery-ui-1.8.9.custom/css/cupertino/jquery-ui-1.8.9.custom.css"/>
		<script type="text/javascript" src="<%=p%>/jquery-ui-1.8.9.custom/js/jquery-1.4.4.min.js"></script>
		<script type="text/javascript" src="<%=p%>/jquery-ui-1.8.9.custom/js/jquery-ui-1.8.9.custom.min.js"></script>
		<script type="text/javascript" src="<%=p%>/mascaras.js"></script>
	</head>
	<body>
		<a href="index.html">Voltar</a>
		<fieldset>
			<legend>1 - id - cep</legend>
			<input id="c"/>
		</fieldset>
		<fieldset>
			<legend>2 - class - data</legend>
			<label>Início&nbsp;</label><input class="dt"/>
			<label>Fim&nbsp;&nbsp;&nbsp;</label><input class="dt"/>
		</fieldset>
		<fieldset id="terc">
			<legend>3 - subselect - alfanumerico</legend>
			<input/>
		</fieldset>
		<h2>Usage:</h2>
		<pre>
$("#c").mascara("cep");
$(".dt").mascara("data");
$("#terc").find("input").mascara("data");
		</pre>
		<script type="text/javascript">
			$("#c").mascara("cep");
			$(".dt").mascara("data");
			$("#terc").find("input").mascara("alfanumerico");
		</script>
	</body>
</html>