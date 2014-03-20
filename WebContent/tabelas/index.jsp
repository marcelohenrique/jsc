<%@page language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<script type="text/javascript" src="../firebug-lite/firebug-lite.js#startOpened"></script>
		<title>Teste do componente de tabela "din�mica"</title>
		<!-- estilo da pagina -->
		<link rel="stylesheet" href="index.css"></link>		
		<script type="text/javascript" src="../tabelas.js"></script>
	</head>
	<body>
		<a href="../index.html">Voltar</a>
		<fieldset>
			<legend>Tabela de dados din�micos locais</legend>
			<button id="popuDim">Popular tabela din�mica</button>
			<button id="primDim">Primeira p�gina</button>
			<button id="prevDim">P�gina anterior</button>
			<button id="nextDim">Pr�xima p�gina</button>
			<button id="lastDim">�ltima p�gina</button>	
			<button id="ordeDim">Ordenar reverso</button>	
			<!-- Os dados v�o todos pro saco... -->
			<table id="teste1" class="tabela">
				<thead>
					<tr>
						<th>AAA</th>
						<th>BBB</th>						
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>aaa</td>
						<td>bbb</td>
					</tr>
				</tbody>
			</table>		
		</fieldset>
		<fieldset>
			<legend>Tabela de dados est�ticos</legend>
			<button id="primStat">Primeira p�gina</button>
			<button id="prevStat">P�gina anterior</button>
			<button id="nextStat">Pr�xima p�gina</button>
			<button id="lastStat">�ltima p�gina</button>	
			<table id="teste2" class="tabela">
				<thead>
					<tr>
						<th>Nome</th>
						<th>Endere�o</th>
						<th>Telefone</th>					
					</tr>
				</thead>
				<tbody>
					<%int i = -1;//preservamos o css est�tico tamb�m.
					while(++i<38){%>
					<tr <%= i== 14 ? "class='cinza'" : "" %>>
						<td>Fulano <%=i%></td>
						<td>Rua <%=i%></td>
						<td>12345678</td>
					</tr>
					<%}%>
				</tbody>
			</table>
		</fieldset>
		<script type="text/javascript" src="index.js"></script>
	</body>
</html>