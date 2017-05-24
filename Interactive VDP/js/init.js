(function init(){

// $(window).on('load', function(){

	var head = document.head || document.getElementsByTagName("head")[0] || document.getElementsByTagName("svg")[0];
	function createStyle(cssString, id, parent){
		var css = cssString,
	    style = document.createElement('style');

		style.type = 'text/css';
		style.id = id;
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}

		return parent.appendChild(style);
	};
	createStyle(
		'svg { width: 100%;height: 768px; }' +
		'body { background-color: ' + "#FFFFCE" +  '; }' +
		'#blank-pages { transition: all 0.25s; opacity: 1; }' +
		'text[active] tspan { color: #9e005d; }' +
		'text:not([active]) tspan { color: #534741; }' +
		'#BtnReportingObservers:hover,#BtnReportingCounts:hover,#BtnNumberByPartyHours:hover,#BtnSpeciesNumber:hover { cursor: pointer; }' +
		'#ReportingObserversGraph,#ReportingCountsGraph,#NumberByPartyHoursGraph,#SpeciesNumberGraph { transition: opacity 1s; }' +
		'#loader-zone { opacity : 1; transition: opacity 1s; }' +
		// '.reveal-grp { transition: opacity 0.3s }' +
		'#BtnReportingObservers[active] text tspan { color : #9e005d },#BtnReportingCounts[active] text tspan { color : #9e005d },#BtnNumberByPartyHours[active] text tspan { color : #9e005d },#BtnSpeciesNumber[active] text tspan { color : #9e005d } { cursor: pointer; }',
		"init-style",
		head
	);

	createStyle(
		'	@font-face {\n' + 
		'    font-family: \'TwCenMT-Regular\';\n' +
		'    src: url(\'fonts/Tw Cen MT.ttf\') format("truetype");\n' +
		'	}\n' +
		'	@font-face {\n' + 
		'    font-family: \'TwCenMT-Bold\';\n' +
		'    src: url(\'fonts/Tw Cen MT Bold.ttf\') format("truetype");\n' +
		'	}\n' +
		'	@font-face {\n' +
		'    font-family: \'Parisienne-Regular\';\n' +
		'    src: url(\'fonts/Parisienne-Regular.ttf\') format("truetype");\n' +
		'	}\n' +
		'	@font-face {\n' +
		'    font-family: \'CourierNewPSMT\';\n' +
		'    src: url(\'fonts/Courier New.ttf\') format("truetype");\n' +
		'	}',
		"font-style",
		head
	);

	$($("svg").get(0)).attr("id", "root");

	var keyNames = [
		"ReportingObservers",
		"ReportingCounts",
		"NumberByPartyHours",
		"SpeciesNumber"
	];

	$(window).on('load', function(){

		$("#graphName").attr("text-anchor", "middle").attr("transform", "matrix(1 0 0 1 763.22 146.9308)");

		var hiddenElems = $("g[display=none],g[DISPLAY=none]"), thisItem, thisItemId;
		hiddenElems.each(function(index, item){
			thisItem = $(item);
			thisItemId = (thisItem.get(0).id);

			thisItem.addClass("reveal-grp").css({"opacity" : 0});

		});

		var allNodes = $("*[onload]");
		// console.log(allNodes.length);
		allNodes.each(function(index, elem){
			var thisJsElem = $(elem), thisOnloadString = thisJsElem.attr("onload"), strArr = [], firstEqIndex, subStrArr = [], thisSubItem;
			if(thisOnloadString != ""){
				subStrArr = thisOnloadString.split("|||");
				for (var i = 0; i < subStrArr.length; i++) {
					thisSubItem = subStrArr[i];
					firstEqIndex = thisSubItem.indexOf("=");
					if(firstEqIndex == -1){
						continue;
					}
					thisJsElem.attr(thisSubItem.substring(0, firstEqIndex), thisSubItem.substring(firstEqIndex + 1, thisSubItem.length));
				}
				thisJsElem.attr(strArr[0], strArr[1]);
				thisJsElem.removeAttr("onload");
			}
		});

		$("#BtnReportingObservers text tspan,#BtnReportingCounts text tspan,#BtnNumberByPartyHours text tspan,#BtnSpeciesNumber text tspan").each(function(index, item){
			$(item).removeAttr("fill");
		});

	});


})();

// v-bind:fill=styleColor('NumberByPartyHours')|||v-bind:active=chosenItem=='NumberByPartyHours'