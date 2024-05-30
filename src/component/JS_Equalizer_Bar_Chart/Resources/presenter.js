$(document).ready(function(){
		$('.samplesnav a').each(function(){
			var a = $(this);
			var d = $("<div class='div_thumb_c'></div>");
			d.css("width", a.find(".container").css("width"));
			d.css("height", a.find(".container").css("height"));		
			$(this).find("div").first().append(d);
		});
		$('.samplesnav a .div_thumb_c,.samplesnav a h6').click(function(e){
			e.stopPropagation();
			OnThumbClick($(this).parent());
			
		});
		$('.togglearrow').click(function(){
			ToggleCodeRegion();
		});
		$('.navpills li').click(function(){
			var opentab = $(this).find('a').attr('class');
			$('.navpills li.active').removeClass('active');
			$(this).addClass('active');
			$('.tabscontent li').removeClass('active');
			$('.tabscontent li.' + opentab).addClass('active');
			if($('.togglearrow').hasClass('arrowup'))
				ToggleCodeRegion();
		});
		$('.tabscontent pre').click( function() {
	        var refNode = $( this )[0];
	        if ( $.browser.msie ) {
	            var range = document.body.createTextRange();
	            range.moveToElementText( refNode );
	            range.select();
	        } else if ( $.browser.mozilla || $.browser.opera ) {
	            var selection = window.getSelection();
	            var range = document.createRange();
	            range.selectNodeContents( refNode );
	            selection.removeAllRanges();
	            selection.addRange( range );
	        } else if ( $.browser.safari ) {
	            var selection = window.getSelection();
	            selection.setBaseAndExtent( refNode, 0, refNode, 1 );
	        }
	    } );
		$('.samplesnav a .div_thumb_c').first().click();
});

function FixCssContent(css,className){
	css = replaceAll(css,"	." + className,"");
	css = replaceAll(css,"." + className,"");
	//"	."	
	return css;
}

function ToggleCodeRegion(){
	$('.tabscontent').slideToggle('fast');
	if($('.togglearrow').hasClass('arrowup')){
		$('.togglearrow').removeClass('arrowup').addClass('arrowdown');
	}
	else
	{
		$('.togglearrow').removeClass('arrowdown').addClass('arrowup');
	}
}

function OnThumbClick(obj){
		var chart_container = $(obj).find(".container");
		var html = chart_container.data("chart");
		var fTitle = "";
		$("#currentChart").html("");
		$("#currentChart").attr("class",chart_container.attr("class"));
		fTitle = chart_container.data("function");
		$("#h6_chart_title").text(chart_container.data("title"));
		var functionCode = fTitle.toString();
		functionCode = functionCode.replace("// END RELEVANT CODE;","// END RELEVANT CODE");
		var fnBody = functionCode.substring(functionCode.indexOf("{") + 1, functionCode.lastIndexOf("}"));
		
		var chart = new cfx.Chart();
		var objName = "chart1";
		var objType = "cfx.Chart";
		if (fnBody.indexOf("radialGauge1") >= 0){
			chart = new cfx.gauge.RadialGauge();
			objName = "radialGauge1";
			objType = "cfx.gauge.RadialGauge";
		}
		else{
			if (fnBody.indexOf("horizontalGauge1") >= 0){
				chart = new cfx.gauge.HorizontalGauge();
				objName = "horizontalGauge1";
				objType = "cfx.gauge.HorizontalGauge";
			}
			else{
				if (fnBody.indexOf("verticalGauge1") >= 0){
					chart = new cfx.gauge.VerticalGauge();
					objName = "verticalGauge1";
					objType = "cfx.gauge.VerticalGauge";
				}
				else{
					if (fnBody.indexOf("trend1") >= 0){
						chart = new cfx.gauge.Trend();
						objName = "trend1";
						objType = "cfx.gauge.Trend";
					}			
				}			
			}		
		}
		
		if (fnBody.indexOf("map1") >= 0){
			if ($("#currentChart").parent().find(".d_info").length <= 0) {
				$("#currentChart").before("<div class='d_info'><p>Is this map not loading? <a href='http://support.softwarefx.com/jChartFX/article/0004' target='_blank'>Find out why and how to fix it.</a></p><span class='getMaps'><a href='http://maps.softwarefx.com' target='_blank'>Can't find the map you're looking for?</a></span></div>");	
			}
		}
		else{
			if ($("#currentChart").parent().find(".d_info").length > 0)
				$("#currentChart").find(".d_info").remove();
		}
		
		fTitle(chart);		
		chart.create("currentChart");
		chart_container.data("chart",$("#currentChart").html());			
		
		var styleSelector = ".jcf_style." +  chart_container.attr("id");
		var cssContent = $(styleSelector).length>0?FixCssContent($(styleSelector).html(),chart_container.attr("id")):"";
		$('.tabscontent .css pre').text(cssContent);
		var js = "var " + objName + " = new " + objType + "();\r\n";
		js += fnBody;
		js = $.trim(js);
		var s = "// RELEVANT CODE";
		if ((js.lastIndexOf(s) === js.length - s.length) <= 0)
			js += "\r\n";
		js += objName + ".create('div_obj');";
		js = htmlEncode(replaceAll(js,"\t",""));
		js = replaceAll(js,s + "\r\n","<div class='relevant_code'>");
		js = replaceAll(js,"\r\n// END RELEVANT CODE","</div>");
		var re ="(\\w+)(?=\\s?\\(" + objName + ")";
		var regexp = new RegExp(re, "gi");

		var matches = fnBody.match(regexp);
		if (matches != null){
			for (i=0; i<matches.length; i++) {
				//alert(matches[i]);
				var internalFunctionName = matches[i];
				var internalFunctionCode = window[internalFunctionName];
				if (!(typeof internalFunctionCode === "undefined"))
					js = js  +"\r\n\r\n<div class='function_code'>" + htmlEncode(internalFunctionCode.toString()) + "</div>";
			}
		}
		$('.tabscontent .js pre').html(js);
		$('.tabscontent .html pre').text(getHtmlCode(objName,objType,fnBody));
}

function getHtmlCode(objName,objType,fnBody)
{
	var html = "";
	
	html += "<!DOCTYPE html>\r\n";
	html += "<html>\r\n";
	html += "<head>\r\n";
    html += "   <script type=\"text/javascript\" src=\"jchartfx.system.js\"></script>\r\n";
    html += "   <script type=\"text/javascript\" src=\"jchartfx.coreVector.js\"></script>\r\n";
	html += "   <script type=\"text/javascript\" src=\"jchartfx.coreVector3d.js\"></script>\r\n";
	html += "   <script type=\"text/javascript\" src=\"jchartfx.advanced.js\"></script>\r\n";
	var additionalScripts = getAdditionalScripts(fnBody);
	if (additionalScripts != "") {
		html += additionalScripts;
	}
	html += "   <!-- Uncomment this section to add extended User Interaction capabilities, including the End-User Menu.\r\n";
    html += "        The UI features require a jChartFX Plus license for deployment.\r\n";
    html += "\t<script type=\"text/javascript\" src=\"jChartFX/jchartfx.userinterface.js\"></script>\r\n";
    html += "\t<link rel=\"stylesheet\" type=\"text/css\" href=\"jchartfx.userinterface.css\" />\r\n";
    html += "   -->\r\n";
	html += "   <link rel=\"stylesheet\" type=\"text/css\" href=\"jchartfx.attributes.css\" />\r\n";
    html += "   <link rel=\"stylesheet\" type=\"text/css\" href=\"jchartfx.palette.css\" />\r\n";
	html += "</head>\r\n";
	html += "<body onload=\"loadChart()\">\r\n";
	html += "   <div id='div_obj' style='width:" + $("#currentChart").css("width") + ";height:" + $("#currentChart").css("height") + ";'></div>\r\n";
	html += "   <script type=\"text/javascript\" language=\"javascript\">\r\n";
    html += "   var " + objName + ";\r\n";
    html += "   function loadChart() {\r\n";
	html += "      // Replace this section with the code in the sample Javascript section\r\n";
    html += "   }\r\n";
	html += "   // If there are additional data population functions in the Javascript section, copy them here\r\n";
	html += "   </script>\r\n";
	html += "</body>\r\n";
	html += "</html>\r\n";
	
	return html;
}

function getAdditionalScripts(fnBody) {
	var additionalScripts = "";
	if (fnBody.indexOf("Gauge1") >= 0 || fnBody.indexOf("trend1") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.gauge.js\"></script>\r\n";
	if (fnBody.indexOf("map1") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.map.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.annotation.Annotations()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.annotation.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.handdrawn.HandDrawn()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.handdrawn.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.overlaybubble.OverlayBubble()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.overlaybubble.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.sparkline.SparkLine()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.sparkline.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.Gallery.Candlestick") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.highlowclose.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.Gallery.HighLowClose") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.highlowclose.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.Gallery.OpenHighLowClose") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.highlowclose.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.density.Density()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.density.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.Gallery.Pyramid") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.pyramid.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.Gallery.Radar") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.radar.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.Gallery.Surface") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.surface.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.Gallery.Contour") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.surface.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.Gallery.Pareto") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.pareto.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.treemap.TreeMap()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.treemap.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.heatmap.HeatMap()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.heatmap.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.equalizer.EqualizerBar()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.equalizer.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.bullet.Bullet()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.bullet.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.rose.Rose()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.rose.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.funnel.Funnel()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.funnel.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.axistrend.AxisTrend()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.axistrend.js\"></script>\r\n";
	if (fnBody.indexOf("cfx.statistical.Statistics()") >= 0)
		additionalScripts += "   <script type=\"text/javascript\" src=\"jchartfx.statistical.js\"></script>\r\n";
		
	return additionalScripts;
}

function htmlEncode(value){
  return $('<div/>').text(value).html();
}
function replaceAll(txt, replace, with_this) {
    return txt.replace(new RegExp(replace, 'g'), with_this);
}

function Positioning(obj,x,y,objDiv,classContainerName) {
        var topPos = 0, leftPos = 0;
        var viewBoxX = parseInt(objDiv.parent().css("width"));
        var viewBoxY = parseInt(objDiv.parent().css("height"));
        
        var maxWidth = parseInt($(".helper_div." + classContainerName).width());
		var maxHeight = parseInt($(".helper_div." + classContainerName).height());
		
        if (parseInt(y) >= 0) {
            topPos = (parseInt(y) - viewBoxY / 2) * -1;
            leftPos = (parseInt(x) - viewBoxX / 2) * -1;
        }
        if (topPos > 0) topPos = 0;
        if (topPos < (maxHeight - viewBoxY) * -1) topPos = (maxHeight - viewBoxY) * -1;
        if (leftPos > 0) leftPos = 0;
        if (leftPos < (maxWidth - viewBoxX) * -1) leftPos = (maxWidth - viewBoxX) * -1;
		
		if (leftPos<0 && classContainerName.indexOf("chart")>=0)
			leftPos = leftPos+ 70 - parseInt(x);
		objDiv.find("svg").first().css("margin-top", topPos + "px");
		objDiv.find("svg").first().css("margin-left", leftPos + "px");
		objDiv.find("svg").first().css("z-index", "1");		
		
		obj.getToolTips().setEnabled(false);		
}

function fix_thumb(obj, objClass){
	obj.getToolTips().setEnabled(false);
    if (objClass =="chart"){
		obj.getAllSeries().setMarkerSize(2);
		obj.getAllSeries().getPointLabels().setVisible(false);
		obj.setBorder(null);
		obj.getPlotAreaMargin().setTop(5);
		obj.getPlotAreaMargin().setBottom(1);
		obj.getPlotAreaMargin().setRight(5);
		obj.getPlotAreaMargin().setLeft(5);
		var axes = obj.getAxesY().getCount();
		for (var i = 0; i < axes; i++)
		    obj.getAxesY().getItem(i).setVisible(false);
		axes = obj.getAxesX().getCount();
		for (var i = 0; i < axes; i++)
		    obj.getAxesX().getItem(i).setVisible(false);
		obj.setAxesStyle(cfx.AxesStyle.None);
		obj.setBackground(null);		
		obj.getLegendBox().setVisible(false);
		obj.setExtraStyle(((obj.getExtraStyle()) | (cfx.ChartStyles.HideZLabels)));
		var titles = obj.getTitles().getCount();
		for (var i = 0; i < titles; i++)
		    obj.getTitles().getItem(i).setText("");				
		var series = obj.getSeries().getCount();
		for (var i = 0; i < series; i++)
		    obj.getSeries().getItem(i).getAxisY().setVisible(false);
	}
	if (objClass =="radial" || objClass =="horizontal" || objClass =="vertical"){
		obj.setResizeableFont(cfx.gauge.ResizeFont.Always);
	}
}