<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<!--
		template com o select em XPath no valor de match. irá casar com o
		elemento 'catalog'
	-->
	<xsl:template match="catalog">
		<ol>
			<!--
				select para pegar todos os elementos 'cd' filhos de 'catalog', sem
				restrições adicionais
			-->
			<xsl:for-each select="cd">
				<li>
					<!--
						select que pega o elemento 'artist' filho do elemento 'cd'
					-->
					<xsl:value-of select="artist" />
				</li>
			</xsl:for-each>
		</ol>
	</xsl:template>
</xsl:stylesheet>
