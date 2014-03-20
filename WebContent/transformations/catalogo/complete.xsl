<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="catalog">
		<table style="background-color:silver;width:800px;">
			<thead>
				<tr style="background-color:cyan">
					<th>Title</th>
					<th>Artist</th>
					<th>Country</th>
					<th>Company</th>
					<th style="width:80px">Price</th>
					<th>Year</th>
				</tr>
			</thead>
			<tbody>
				<xsl:for-each select="cd">
					<xsl:sort select="year"/>
					<tr>
						<xsl:if test="position() mod 2 = 0">
							<xsl:attribute name="style">
								background-color:green;
							</xsl:attribute>
						</xsl:if> 
						<td>
							<xsl:value-of select="title" />
						</td>
						<td>
							<xsl:value-of select="artist" />
						</td>
						<td>
							<xsl:value-of select="country" />
						</td>
						<td>
							<xsl:value-of select="company" />
						</td>
						<td>
							$ <xsl:value-of select="price" />
						</td>
						<td>
							<xsl:value-of select="year" />
						</td>
					</tr>
				</xsl:for-each>
			</tbody>
		</table>
	</xsl:template>
</xsl:stylesheet>