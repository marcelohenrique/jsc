<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%String p = request.getContextPath();%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Combos</title>
		<link rel="stylesheet" href="index.css"/>
		<script type='text/javascript' src='<%=p%>/dwr/engine.js'></script>
		<script type='text/javascript' src='<%=p%>/dwr/util.js'></script>
		<script type='text/javascript' src='<%=p%>/dwr/interface/Geografia.js'></script>
	</head>
	<body>
		<a id="voltar" href="../index.html">Voltar</a>
		<h1>Cl&aacute;ssico pai - filho - av&ocirc;</h1>
		<div id="main">
			<div id="form">
				<label>Pa&iacute;s</label>&nbsp;
				<select id="country"></select>&nbsp;
				<label>Estado</label>&nbsp;
				<select id="estado"></select>&nbsp;
				<label>Cidade</label>&nbsp;
				<select id="cidade"></select>&nbsp;
			</div>
		</div>
		<script type='text/javascript' src="index.js"></script>
<!--		<script type="text/javascript" src="<%=p%>/firebug-lite/firebug-lite.js#startOpened"></script>-->
	</body>
</html>