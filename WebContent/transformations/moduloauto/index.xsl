<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="modulo">
		<html>
			<head>
				<title>QQ coisa Auto</title>
				<link rel="stylesheet" href="index.css" type="text/css" />
			</head>
			<body>
				<div>
					<!-- TODO: Auto-generated template -->
					<div id="{id}" class="modulo">
						<h1>
							<xsl:value-of select="nome" />
						</h1>
						<xsl:for-each select="children/aba">
							<div id="{id}Head" class="abaHead">
								<label><xsl:value-of select="nome" /></label>
							</div>
						</xsl:for-each>
						<xsl:for-each select="children/aba">
							<div id="{id}" class="aba" style="display:none">
								<xsl:for-each select="children/grupador">
									<fieldset id="{id}">
										<legend>
											<xsl:value-of select="nome" />
										</legend>
										<xsl:for-each select="children/item">
											<div class="item">
												<label>
													<xsl:value-of select="nome" />
												</label>
												<br />
												<xsl:choose>
													<xsl:when test="count(children) > 0">
														<select id="{id}">
															<xsl:for-each select="children/respitem">
																<option id="{id}" value="{valor}">
																	<xsl:value-of select="nome" />
																</option>
															</xsl:for-each>
														</select>
													</xsl:when>
													<xsl:otherwise>
														<input id="{id}" value="{valor}" />
													</xsl:otherwise>
												</xsl:choose>
												<!-- XXX fazer o if e ver o que vamos renderizar -->
											</div>
										</xsl:for-each>
									</fieldset>
								</xsl:for-each>
							</div>
						</xsl:for-each>
					</div>
					<script type="text/javascript">
						/* mimetizador de classe */
						function form_<xsl:value-of select="id"/>(){
							
							var listAbas = [];
							var listAbasHead = [];
							
							/* helper interno */
							function hideAbas(current){
								var i = listAbas.length;
								while(i--)
									listAbas[i].style.display = listAbasHead[i] == current ? "" : "none";
							}				
							<xsl:for-each select="children/aba">
								var <xsl:value-of select="id"/>Head = document.getElementById("<xsl:value-of select="id"/>Head");
								listAbasHead.push(<xsl:value-of select="id"/>Head)
								<xsl:value-of select="id"/>Head.onclick=function(){
									hideAbas(<xsl:value-of select="id"/>Head);
								}					
								<xsl:for-each select="children/grupador">
									var <xsl:value-of select="id"/> = document.getElementById("<xsl:value-of select="id"/>");	 
									<xsl:for-each select="children/item">
										var <xsl:value-of select="id"/> = document.getElementById("<xsl:value-of select="id"/>");
										<xsl:for-each select="children/respitem">
											var <xsl:value-of select="id"/> = document.getElementById("<xsl:value-of select="id"/>");
											<xsl:if test="valor = ../../valor">
												<xsl:value-of select="id"/>.selected=true;
											</xsl:if>						
										</xsl:for-each>
									</xsl:for-each> 
								</xsl:for-each>
							</xsl:for-each>
							<xsl:for-each select="children/aba">
								var <xsl:value-of select="id"/> = document.getElementById("<xsl:value-of select="id"/>");
								listAbas.push(<xsl:value-of select="id"/>);
							</xsl:for-each>				
							//exibindo a primeira aba
							hideAbas(listAbasHead[0]);
						}
						
						/* loader de classe */
						function load_<xsl:value-of select="id"/>(){
							document.form_<xsl:value-of select="id"/>=new form_<xsl:value-of select="id"/>();
						}
						load_<xsl:value-of select="id"/>();
					</script>
				</div>
				<a class="retorno" href="../index.html">Voltar</a>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>