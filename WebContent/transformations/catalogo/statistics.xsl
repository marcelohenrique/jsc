<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	<xsl:template match="catalog">
		<label>Artistas: </label>
		<label>
			<xsl:value-of select="count(//artist[not(following::artist/text() = text())])" />
		</label>
		<hr />
		<label>Albuns: </label>
		<label>
			<xsl:value-of select="count(//title)"/>
		</label>
		<hr />
		<label>Gravadoras: </label>
		<label>
			<xsl:value-of select="count(//company[not(following::company/text() = text())])"/>
		</label>
		<hr />
		<label>Países: </label>
		<label>
			<xsl:value-of select="count(//country[not(following::country/text() = text())])"/>
		</label>
		<hr />
	</xsl:template>
</xsl:stylesheet>