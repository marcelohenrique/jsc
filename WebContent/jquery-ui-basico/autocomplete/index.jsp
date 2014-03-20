<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%String p = request.getContextPath();%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>jQuery UI, the interface 'beaultificator'</title>
		<link rel="stylesheet" href="<%=p%>/jquery-ui-1.8.9.custom/css/cupertino/jquery-ui-1.8.9.custom.css"/>
		<script type="text/javascript" src="<%=p%>/jquery-ui-1.8.9.custom/js/jquery-1.4.4.min.js"></script>
		<script type="text/javascript" src="<%=p%>/jquery-ui-1.8.9.custom/js/jquery-ui-1.8.9.custom.min.js"></script>
		<link rel="stylesheet" href="index.css"/>
		<script type='text/javascript' src='<%=p%>/dwr/engine.js'></script>
		<script type='text/javascript' src='<%=p%>/dwr/util.js'></script>
		<script type='text/javascript' src='<%=p%>/dwr/interface/Geografia.js'></script>
	</head>
	<body>
		<a href="../index.jsp">Back</a><hr/>
		<h1>The 'grandfather - father - son' case</h1>
		<label>Country </label><input id="avo" class="ui-widget"/>&nbsp;
		<label>Province</label><input id="pai" class="ui-widget"/>&nbsp;
		<label>City    </label><input id="fil" class="ui-widget"/>&nbsp;
		<script type="text/javascript" src="index.js"></script>
	</body>
</html>