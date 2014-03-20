<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Insert title here</title>
	</head>
	<body>
		<table>
			<tbody>
				<%int i=100;while(i-->0){ %>
				<tr id="linha<%=i%>">
					<td>Fulano de tal <%=i%></td>
					<td>Rua tal  <%=i%></td>
					<td>12345678</td>
				</tr>
				<%} %>
			</tbody>
		</table>
		<script type="text/javascript">
		<%i=100;while(i-->0){ %>
			var linha<%=i%> = document.getElementById("linha<%=i%>");
			linha<%=i%>.onclick=function(){
				var dados = {
						nome : "Fulano de tal <%=i%>",
						endereco : "Rua tal  <%=i%>",
						telefone : "12345678"
				};
				top.frames["centro"].fillForm(dados);
			};
		<%} %>
		</script>
	</body>
</html>