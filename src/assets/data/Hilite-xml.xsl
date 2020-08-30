<?xml version="1.0" encoding="utf-8"?>
<!-- Generic stylesheet for viewing XML -->
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:msxsl="urn:schemas-microsoft-com:xslt">

    <xsl:template match="/">
        <DIV STYLE="font-family:Tahoma; font-size:0.8 em; margin-bottom:2em">
            <xsl:apply-templates/>
        </DIV>
    </xsl:template>

    <xsl:template match="*">
        <DIV STYLE="margin-left:1em; color:red">
            <xsl:attribute name="id">
                <xsl:value-of select="generate-id()"/>
            </xsl:attribute>
            &lt;<xsl:value-of select="name()"/><xsl:apply-templates select="@*"/>/&gt;
        </DIV>
    </xsl:template>

    <xsl:template match="*[node()]">
        <DIV STYLE="margin-left:1em">
            <SPAN STYLE="color:olive">
                <xsl:attribute name="id">
                    <xsl:value-of select="generate-id()"/>
                </xsl:attribute>&lt;<xsl:value-of select="name()"/><xsl:apply-templates select="@*"/>&gt;</SPAN>
            <xsl:apply-templates select="node()"/>
            <SPAN STYLE="color:olive">&lt;/<xsl:value-of select="name()"/>&gt;</SPAN>
        </DIV>
    </xsl:template>

    <xsl:template match="@*" xml:space="preserve">
    <SPAN STYLE="color:navy"><xsl:attribute name="ID"><xsl:value-of select="generate-id()"/></xsl:attribute>
        <xsl:value-of select="name()"/>="<SPAN STYLE="color:black"><xsl:value-of select="."/></SPAN>"
    </SPAN>
  </xsl:template>


    <xsl:template match="processing-instruction()">
        <DIV STYLE="margin-left:1em; color:maroon">
            <xsl:attribute name="id">
                <xsl:value-of select="generate-id()"/>
            </xsl:attribute>
            &lt;?<xsl:value-of select="name()"/><xsl:apply-templates select="@*"/>?&gt;
        </DIV>
    </xsl:template>

    <xsl:template match="node()[nodeTypeString=cdatasection]">
        <pre>
            <xsl:attribute name="id">
                <xsl:value-of select="generate-id()"/>
            </xsl:attribute>cdata
            &lt;![CDATA[<xsl:value-of select="."/>]]&gt;
        </pre>
    </xsl:template>

    <xsl:template match="text()">
        <SPAN>
            <xsl:attribute name="id">
                <xsl:value-of select="generate-id()"/>
            </xsl:attribute><xsl:value-of select="."/>
        </SPAN>
    </xsl:template>

</xsl:stylesheet>
