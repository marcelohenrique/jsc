<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Subcontexto</title>
		<style type="text/css">
			body iframe{
				width:100%;
			}
		</style>
	</head>
	<body>
		<fieldset>
			<legend>Dados</legend>
			<label>Nome&nbsp;    <input id="nme"/></label><br/>
			<label>Endereço&nbsp;<input id="end"/></label><br/>
			<label>Telefone&nbsp;<input id="tel"/></label>
		</fieldset>
		<iframe name="filho" id="filho" src="filho.jsp"></iframe>
		<h2>sempre use o top.frames['nomeframe']!!!</h2>
		<h3>function e var são atributos do frame atual</h3>
		<script type="text/javascript" src="index.js"></script>
	</body>
</html>